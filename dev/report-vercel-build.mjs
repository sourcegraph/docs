#!/usr/bin/env node

/**
 * Reports a failed Vercel build on its pull request, since Vercel only shows
 * build logs to members of the Vercel team. When a later revision builds, the
 * same comment is updated to say so.
 *
 * Usage:
 *   node dev/report-vercel-build.mjs fetch-log <file>
 *   node dev/report-vercel-build.mjs comment <file> [--dry-run]
 *   node dev/report-vercel-build.mjs slack <file> [--dry-run]
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
 * slack uploads <file> into the thread of the Vercel Slack app's "failed to
 * deploy" post for the commit in SLACK_CHANNEL_ID, looking back 30 minutes
 * and waiting up to 5 more for the post to appear. It needs SLACK_BOT_TOKEN
 * (see dev/slack-app-vercel-build-report.json) and does nothing when that or
 * SLACK_CHANNEL_ID is unset. With --dry-run the post is found but nothing is
 * uploaded.
 *
 * All need DEPLOYMENT_ID, DEPLOYMENT_STATE (failed or success), COMMIT_SHA,
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
const SLACK_HISTORY_MINUTES = 30;
const SLACK_WAIT_MINUTES = 5;
const SLACK_POLL_SECONDS = 15;

const API_URL = process.env.GITHUB_API_URL ?? 'https://api.github.com';
const REPOSITORY = process.env.GITHUB_REPOSITORY;
const {DEPLOYMENT_ID, DEPLOYMENT_STATE, COMMIT_SHA, SLACK_CHANNEL_ID} =
	process.env;

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
	// The deployment ID and commit arrive as separate inputs; only publish
	// the log of the deployment Vercel built from that commit
	const builtSha =
		deployment.meta?.githubCommitSha ?? deployment.gitSource?.sha;
	if (builtSha !== COMMIT_SHA) {
		throw new Error(
			`Deployment ${DEPLOYMENT_ID} was built from ${builtSha}, not ${COMMIT_SHA}`
		);
	}
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
		.flatMap(text => text.replace(/\n$/, '').split('\n'))
		.map(redact);
}

// Credential shapes a build might print. The comment and artifact are public,
// and the build gets VERCEL_OIDC_TOKEN and friends, so a left-in
// `console.log(process.env)` must not publish them. Not a complete list.
// cspell:disable -- token prefixes, not words
const REDACTION_PATTERNS = [
	[/\beyJ[\w-]{10,}\.[\w-]{10,}\.[\w-]+/g, '[redacted-jwt]'],
	[
		/\b(?:vcp_|gh[pousr]_|github_pat_|sk-|xox[abpr]-)[\w-]{16,}|\bAKIA[0-9A-Z]{16}\b/g,
		'[redacted-token]'
	],
	[/(\bBearer\s+)\S+/gi, '$1[redacted]'],
	[
		/(\w*(?:TOKEN|SECRET|PASSW(?:OR)?D|CREDENTIALS?|API_?KEY|PRIVATE_KEY|ENC_KEY|DEPLOYMENT_KEY)\w*["']?\s*[=:]\s*["']?)\S+/gi,
		'$1[redacted]'
	]
];
// cspell:enable

function redact(line) {
	return REDACTION_PATTERNS.reduce(
		(text, [pattern, replacement]) => text.replace(pattern, replacement),
		line
	);
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

// A fence longer than any run of backticks in the log, so no log line can
// close it and inject Markdown into the comment
function fenceFor(lines) {
	const longestRun = Math.max(
		2,
		...lines.flatMap(line =>
			(line.match(/`+/g) ?? []).map(run => run.length)
		)
	);
	return '`'.repeat(longestRun + 1);
}

function failureBody(logLines, artifact) {
	const tail = tailOf(logLines);
	const fence = fenceFor(tail);
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
		fence,
		...tail,
		fence,
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
	if (DEPLOYMENT_STATE === 'failed') {
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

// Every method used here takes form encoding, including the file one
async function slackApi(method, parameters) {
	const response = await fetch(`https://slack.com/api/${method}`, {
		method: 'POST',
		headers: {
			authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
			'content-type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams(parameters)
	});
	const result = await response.json();
	if (!result.ok) {
		throw new Error(`Slack ${method} failed: ${result.error}`);
	}
	return result;
}

// Every string in a Slack message: the top-level text, plus legacy
// attachments and Block Kit blocks, where apps often put the real content
function slackMessageText(message) {
	const strings = [];
	const collect = value => {
		if (typeof value === 'string') {
			strings.push(value);
		} else if (Array.isArray(value)) {
			value.forEach(collect);
		} else if (value && typeof value === 'object') {
			Object.values(value).forEach(collect);
		}
	};
	collect([message.text, message.attachments, message.blocks]);
	return strings.join('\n');
}

// The Vercel Slack app posts "<commit title> failed to deploy" for each
// failed deployment, with the short SHA in a context block and an Inspect
// button whose URL ends in the deployment ID. The ID is matched, since two
// PRs at one commit get two deployments and two posts. The app and this
// workflow are triggered by the same event, so its post can land after this
// runs; keep looking for a while before giving up.
async function findVercelFailurePost() {
	const deploymentId = DEPLOYMENT_ID.replace(/^dpl_/, '');
	const oldest = Date.now() / 1000 - SLACK_HISTORY_MINUTES * 60;
	const deadline = Date.now() + SLACK_WAIT_MINUTES * 60_000;
	for (;;) {
		const {messages} = await slackApi('conversations.history', {
			channel: SLACK_CHANNEL_ID,
			oldest,
			limit: 200
		});
		const post = messages.find(message => {
			const text = slackMessageText(message);
			return (
				text.includes('failed to deploy') && text.includes(deploymentId)
			);
		});
		if (post) {
			return post;
		}
		if (Date.now() >= deadline) {
			console.log(
				`No Vercel "failed to deploy" post for ${DEPLOYMENT_ID} in the last ${SLACK_HISTORY_MINUTES} minutes; giving up. Messages seen:`
			);
			for (const message of messages) {
				console.log(
					`  ${message.ts} bot_id=${message.bot_id ?? '-'} user=${message.user ?? '-'} subtype=${message.subtype ?? '-'} ${JSON.stringify(slackMessageText(message).slice(0, 120))}`
				);
			}
			return undefined;
		}
		console.log(
			`No Vercel post for ${DEPLOYMENT_ID} yet; checking again in ${SLACK_POLL_SECONDS}s`
		);
		await new Promise(resolve =>
			setTimeout(resolve, SLACK_POLL_SECONDS * 1000)
		);
	}
}

// Slack takes files in three steps: ask for an upload URL, POST the bytes to
// it, then say which channel and thread to share the file in
async function uploadLogToThread(post, pulls) {
	const log = readFileSync(logFile);
	const shortSha = COMMIT_SHA.slice(0, 7);
	const filename = `vercel-build-${shortSha}.log`;
	const links = pulls
		.map(pull => `<${pull.html_url}|#${pull.number}>`)
		.join(', ');
	const initialComment = `Build log attached; its tail is also commented on PR ${links}.`;

	if (DRY_RUN) {
		console.log(
			`[dry-run] would upload ${filename} (${log.length} bytes) to thread ${post.ts} in ${SLACK_CHANNEL_ID}:\n${initialComment}`
		);
		return;
	}
	const {upload_url: uploadUrl, file_id: fileId} = await slackApi(
		'files.getUploadURLExternal',
		{filename, length: log.length}
	);
	const upload = await fetch(uploadUrl, {method: 'POST', body: log});
	if (!upload.ok) {
		throw new Error(
			`Uploading ${filename} to Slack failed: ${upload.status} ${await upload.text()}`
		);
	}
	await slackApi('files.completeUploadExternal', {
		files: JSON.stringify([
			{id: fileId, title: `Vercel build log for ${shortSha}`}
		]),
		channel_id: SLACK_CHANNEL_ID,
		thread_ts: post.ts,
		initial_comment: initialComment
	});
	console.log(
		`Uploaded ${filename} to thread ${post.ts} in ${SLACK_CHANNEL_ID}`
	);
}

async function slack() {
	if (!process.env.SLACK_BOT_TOKEN || !SLACK_CHANNEL_ID) {
		console.log(
			'SLACK_BOT_TOKEN or SLACK_CHANNEL_ID unset; not posting to Slack'
		);
		return;
	}
	if (DEPLOYMENT_STATE !== 'failed') {
		console.log('The build passed; Vercel already posts that to Slack');
		return;
	}
	// The same guard as fetch-log and comment, so Slack only ever gets logs
	// the PR comment also shows
	const pulls = await findPullRequests(process.env.PR_NUMBER);
	if (pulls.length === 0) {
		return;
	}
	const post = await findVercelFailurePost();
	if (post) {
		await uploadLogToThread(post, pulls);
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
	if (!['failed', 'success'].includes(DEPLOYMENT_STATE)) {
		throw new Error(`Unexpected DEPLOYMENT_STATE ${DEPLOYMENT_STATE}`);
	}
	if (!logFile) {
		throw new Error(
			'Usage: node dev/report-vercel-build.mjs fetch-log|comment|slack <file>'
		);
	}

	if (command === 'fetch-log') {
		await fetchLog();
	} else if (command === 'comment') {
		await comment();
	} else if (command === 'slack') {
		await slack();
	} else {
		throw new Error(
			`Unknown command ${command}; use fetch-log, comment or slack`
		);
	}
}

main().catch(error => {
	console.error(error);
	process.exit(2);
});
