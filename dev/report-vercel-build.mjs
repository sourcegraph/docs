#!/usr/bin/env node

/**
 * Reports a failed Vercel build on its pull request, since Vercel only shows
 * build logs to members of the Vercel team. When a later revision builds, the
 * same comment is updated to say so.
 *
 * Usage: node dev/report-vercel-build.mjs [--dry-run]
 *
 * Requires DEPLOYMENT_ID, DEPLOYMENT_STATE (error or success), COMMIT_SHA,
 * GH_TOKEN and GITHUB_REPOSITORY. A failed build also needs VERCEL_TOKEN, and
 * VERCEL_TEAM_ID unless the token is scoped to the project.
 * With --dry-run the comment is printed instead of posted.
 */

const DRY_RUN = process.argv.includes('--dry-run');
const MAX_LOG_LINES = 100;
const MAX_LOG_CHARS = 30_000;

const API_URL = process.env.GITHUB_API_URL ?? 'https://api.github.com';
const REPOSITORY = process.env.GITHUB_REPOSITORY;
const {DEPLOYMENT_ID, DEPLOYMENT_STATE, COMMIT_SHA} = process.env;

const MARKER = '<!-- vercel-build-report -->';

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
	return response.json();
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

// The dispatch payload has no PR number; look it up from the commit. A stale
// event for a commit the PR has moved past is ignored. Fork PRs are ignored
// too, so the Vercel token is only ever used for commits by people who can
// already push to this repository.
async function findPullRequest() {
	const pulls = await github(
		'GET',
		`/repos/${REPOSITORY}/commits/${COMMIT_SHA}/pulls`
	);
	const pull = pulls.find(
		pull => pull.state === 'open' && pull.head.sha === COMMIT_SHA
	);
	if (pull && pull.head.repo.full_name !== REPOSITORY) {
		console.log(`PR #${pull.number} is from a fork; not reporting`);
		return undefined;
	}
	return pull;
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

// The failure is at the end of the log; keep the tail within GitHub's comment
// size limit. A four-backtick fence so lines containing ``` cannot break out.
function failureBody(logLines) {
	let tail = logLines.slice(-MAX_LOG_LINES);
	while (tail.length > 1 && tail.join('\n').length > MAX_LOG_CHARS) {
		tail = tail.slice(1);
	}
	const omitted = logLines.length - tail.length;
	return [
		MARKER,
		'### ❌ The Vercel build failed for this PR',
		'',
		'Vercel only shows build logs to members of its team, so here is the end of the log.',
		'Run `npm run build` locally to reproduce.',
		'',
		'<details>',
		`<summary>Build log${omitted > 0 ? ` (last ${tail.length} of ${logLines.length} lines)` : ''}</summary>`,
		'',
		'````',
		...tail,
		'````',
		'',
		'</details>',
		''
	].join('\n');
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

	const pull = await findPullRequest();
	if (!pull) {
		console.log(`No open PR with head ${COMMIT_SHA}; nothing to do`);
		return;
	}

	const comments = await githubList(
		`/repos/${REPOSITORY}/issues/${pull.number}/comments`
	);
	const existing = comments.find(comment => comment.body.startsWith(MARKER));

	// Comment only when the build failed, or an earlier failure is resolved
	let body;
	if (DEPLOYMENT_STATE === 'error') {
		if (!process.env.VERCEL_TOKEN) {
			throw new Error('VERCEL_TOKEN is required to read the build log');
		}
		body = failureBody(await fetchBuildLog());
	} else if (existing) {
		body = `${MARKER}\n### ✅ The Vercel build that failed on an earlier revision of this PR passes\n`;
	} else {
		console.log(`PR #${pull.number} has no failed build to resolve`);
		return;
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

main().catch(error => {
	console.error(error);
	process.exit(2);
});
