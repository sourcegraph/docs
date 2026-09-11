#!/usr/bin/env node

/**
 * Reports a failed Vercel build on its pull request, since Vercel only shows
 * build logs to members of the Vercel team. When a later revision builds, the
 * same comment is updated to say so.
 *
 * Usage:
 *   node dev/report-vercel-build.mjs fetch-log <file>
 *   node dev/report-vercel-build.mjs comment <file> [--dry-run]
 *
 * fetch-log writes the build log to <file>, and to GITHUB_OUTPUT `truncated`,
 * so the workflow can upload the full log as an artifact when the comment
 * cannot hold all of it, and `pull_request`, the PR Vercel built the
 * deployment for. It needs VERCEL_TOKEN, and VERCEL_TEAM_ID unless the token
 * is scoped to the project.
 *
 * comment posts the tail of <file> on PR_NUMBER, the PR Vercel built the
 * deployment for. When unset (the success path, or a deployment Vercel
 * recorded no PR for) it falls back to every open PR at COMMIT_SHA. It links
 * the artifact from ARTIFACT_ID and ARTIFACT_URL when set, and deletes the
 * artifact an earlier comment linked. With --dry-run the comment is printed
 * instead, and nothing is deleted.
 *
 * Both need DEPLOYMENT_ID, DEPLOYMENT_STATE (error or success), COMMIT_SHA,
 * GH_TOKEN and GITHUB_REPOSITORY.
 */

import {appendFileSync, readFileSync, writeFileSync} from 'fs';

const [command, logFile] = process.argv
	.slice(2)
	.filter(argument => !argument.startsWith('--'));
const DRY_RUN = process.argv.includes('--dry-run');
const MAX_LOG_LINES = 100;
const MAX_LOG_CHARS = 30_000;
const ARTIFACT_RETENTION_DAYS = 30;

const API_URL = process.env.GITHUB_API_URL ?? 'https://api.github.com';
const REPOSITORY = process.env.GITHUB_REPOSITORY;
const {DEPLOYMENT_ID, DEPLOYMENT_STATE, COMMIT_SHA} = process.env;

// The artifact ID rides along in the marker so a later run can delete it
const MARKER = '<!-- vercel-build-report';
const MARKER_PATTERN = /^<!-- vercel-build-report(?: artifact=(\d+))? -->/;

async function fetchJson(url, headers) {
	const response = await fetch(url, {headers});
	if (!response.ok) {
		throw new Error(
			`GET ${url} failed: ${response.status} ${await response.text()}`
		);
	}
	return response.json();
}

async function github(method, route, body) {
	const response = await fetch(`${API_URL}${route}`, {
		method,
		headers: {
			authorization: `Bearer ${process.env.GH_TOKEN}`,
			accept: 'application/vnd.github+json',
			'x-github-api-version': '2022-11-28',
			...(body && {'content-type': 'application/json'})
		},
		body: body && JSON.stringify(body)
	});
	if (!response.ok) {
		throw new Error(
			`${method} ${route} failed: ${response.status} ${await response.text()}`
		);
	}
	return response.status === 204 ? undefined : response.json();
}

async function githubList(route) {
	const items = [];
	for (let page = 1; ; page++) {
		const batch = await github('GET', `${route}?per_page=100&page=${page}`);
		items.push(...batch);
		if (batch.length < 100) {
			return items;
		}
	}
}

// Vercel records which PR a deployment was built for. Empty when the branch
// was deployed before its PR was opened.
async function fetchDeploymentPullRequestNumber() {
	const url = new URL(
		`https://api.vercel.com/v13/deployments/${DEPLOYMENT_ID}`
	);
	if (process.env.VERCEL_TEAM_ID) {
		url.searchParams.set('teamId', process.env.VERCEL_TEAM_ID);
	}
	const deployment = await fetchJson(url, {
		authorization: `Bearer ${process.env.VERCEL_TOKEN}`
	});
	return deployment.meta?.githubPrId;
}

// The dispatch payload has no PR number. The failure path gets it from the
// deployment; the success path only knows the commit, so it looks up the PRs
// at that head. Either way a stale event for a commit a PR has moved past is
// ignored, and so are fork PRs.
async function findPullRequests(pullRequestNumber) {
	const pulls = pullRequestNumber
		? [
				await github(
					'GET',
					`/repos/${REPOSITORY}/pulls/${pullRequestNumber}`
				)
			]
		: await github(
				'GET',
				`/repos/${REPOSITORY}/commits/${COMMIT_SHA}/pulls`
			);
	const open = pulls.filter(pull => {
		if (pull.state !== 'open' || pull.head.sha !== COMMIT_SHA) {
			return false;
		}
		// head.repo is null when the fork was deleted
		if (pull.head.repo?.full_name !== REPOSITORY) {
			console.log(`PR #${pull.number} is from a fork; not reporting`);
			return false;
		}
		return true;
	});
	if (open.length === 0) {
		console.log(`No open PR with head ${COMMIT_SHA}; nothing to do`);
	}
	return open;
}

// Build log lines, oldest first. Vercel keeps them as events; only the ones
// with text are log lines.
async function fetchBuildLog() {
	const url = new URL(
		`https://api.vercel.com/v3/deployments/${DEPLOYMENT_ID}/events`
	);
	url.searchParams.set('limit', '-1');
	url.searchParams.set('direction', 'forward');
	if (process.env.VERCEL_TEAM_ID) {
		url.searchParams.set('teamId', process.env.VERCEL_TEAM_ID);
	}
	const events = await fetchJson(url, {
		authorization: `Bearer ${process.env.VERCEL_TOKEN}`
	});
	return events
		.map(event => event.payload?.text ?? event.text)
		.filter(text => typeof text === 'string')
		.flatMap(text => text.replace(/\n$/, '').split('\n'));
}

// The failure is at the end of the log; keep the tail within GitHub's
// comment size limit
function tailOf(logLines) {
	let tail = logLines.slice(-MAX_LOG_LINES);
	while (tail.length > 1 && tail.join('\n').length > MAX_LOG_CHARS) {
		tail = tail.slice(1);
	}
	return tail;
}

async function fetchLog() {
	if (!process.env.VERCEL_TOKEN) {
		throw new Error('VERCEL_TOKEN is required to read the build log');
	}
	// Ask GitHub before Vercel, so the Vercel token is only ever used for a
	// commit that an open PR from this repository is at, i.e. pushed by
	// someone who can already push here
	if ((await findPullRequests()).length === 0) {
		return;
	}
	const pullRequestNumber = await fetchDeploymentPullRequestNumber();
	const logLines = await fetchBuildLog();
	writeFileSync(logFile, logLines.join('\n') + '\n');
	const truncated = tailOf(logLines).length < logLines.length;
	console.log(
		`Wrote ${logLines.length} log lines to ${logFile}${truncated ? '; the comment will show the tail' : ''}`
	);
	if (process.env.GITHUB_OUTPUT) {
		appendFileSync(
			process.env.GITHUB_OUTPUT,
			`truncated=${truncated}\npull_request=${pullRequestNumber ?? ''}\n`
		);
	}
}

// A four-backtick fence so lines containing ``` cannot break out of the block
function failureBody(logLines, artifact) {
	const tail = tailOf(logLines);
	const intro =
		'Vercel paywalls build logs to authorized users in its web UI, so';
	const message = artifact
		? `${intro} we tailed the last ${tail.length} lines of the build log for you here. The full log is ${logLines.length} lines, attached as a [workflow artifact](${artifact.url}); downloading it needs a GitHub login, and it expires in ${ARTIFACT_RETENTION_DAYS} days.`
		: `${intro} here is the build log.`;
	return [
		`${MARKER}${artifact ? ` artifact=${artifact.id}` : ''} -->`,
		'### ❌ The Vercel build failed for this PR',
		'',
		message,
		'',
		'<details>',
		'<summary>Build log</summary>',
		'',
		'````',
		...tail,
		'````',
		'',
		'</details>',
		''
	].join('\n');
}

async function deleteArtifact(id) {
	console.log(`${DRY_RUN ? '[dry-run] ' : ''}Deleting artifact ${id}`);
	if (DRY_RUN) {
		return;
	}
	try {
		await github('DELETE', `/repos/${REPOSITORY}/actions/artifacts/${id}`);
	} catch (error) {
		// Already expired or deleted
		if (!error.message.includes(' 404 ')) {
			throw error;
		}
	}
}

async function comment() {
	const pulls = await findPullRequests(process.env.PR_NUMBER);
	if (pulls.length === 0) {
		return;
	}
	let logLines;
	if (DEPLOYMENT_STATE === 'error') {
		logLines = readFileSync(logFile, 'utf8').replace(/\n$/, '').split('\n');
	}
	for (const pull of pulls) {
		await report(pull, logLines);
	}
}

// Comment only when the build failed, or an earlier failure is resolved
async function report(pull, logLines) {
	const comments = await githubList(
		`/repos/${REPOSITORY}/issues/${pull.number}/comments`
	);
	const existing = comments.find(comment =>
		MARKER_PATTERN.test(comment.body)
	);
	const previousArtifact = existing?.body.match(MARKER_PATTERN)[1];

	let body;
	if (logLines) {
		const {ARTIFACT_ID, ARTIFACT_URL} = process.env;
		body = failureBody(
			logLines,
			ARTIFACT_ID && {id: ARTIFACT_ID, url: ARTIFACT_URL}
		);
	} else if (existing) {
		body = `${MARKER} -->\n### ✅ The Vercel build that failed on an earlier revision of this PR passes\n`;
	} else {
		console.log(`PR #${pull.number} has no failed build to resolve`);
		return;
	}

	if (previousArtifact) {
		await deleteArtifact(previousArtifact);
	}

	if (DRY_RUN) {
		console.log(
			`[dry-run] would ${existing ? 'update' : 'create'} comment on PR #${pull.number}:\n`
		);
		console.log(body);
	} else if (existing) {
		console.log(`Updating comment ${existing.id} on PR #${pull.number}`);
		await github(
			'PATCH',
			`/repos/${REPOSITORY}/issues/comments/${existing.id}`,
			{body}
		);
	} else {
		console.log(`Commenting on PR #${pull.number}`);
		await github(
			'POST',
			`/repos/${REPOSITORY}/issues/${pull.number}/comments`,
			{body}
		);
	}
}

async function main() {
	for (const name of [
		'DEPLOYMENT_ID',
		'DEPLOYMENT_STATE',
		'COMMIT_SHA',
		'GH_TOKEN',
		'GITHUB_REPOSITORY'
	]) {
		if (!process.env[name]) {
			throw new Error(`Missing required environment variable ${name}`);
		}
	}
	if (!['error', 'success'].includes(DEPLOYMENT_STATE)) {
		throw new Error(`Unexpected DEPLOYMENT_STATE ${DEPLOYMENT_STATE}`);
	}
	if (!logFile) {
		throw new Error(
			'Usage: node dev/report-vercel-build.mjs fetch-log|comment <file>'
		);
	}

	if (command === 'fetch-log') {
		await fetchLog();
	} else if (command === 'comment') {
		await comment();
	} else {
		throw new Error(`Unknown command ${command}; use fetch-log or comment`);
	}
}

main().catch(error => {
	console.error(error);
	process.exit(2);
});
