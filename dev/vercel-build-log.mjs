#!/usr/bin/env node

/**
 * Attaches a Vercel build's log, with a link to its pull request, to the
 * Vercel Slack app's post for the deployment, since Vercel only shows build
 * logs, and the PR a deployment is for, to members of the Vercel team. A
 * failed build is also reported on its PR. The log only goes to Slack, so
 * anything sensitive a build prints stays inside the workspace instead of a
 * public PR; the PR comment only links to it. When a later revision builds,
 * the same comment is updated to say so.
 *
 * Usage:
 *   node dev/vercel-build-log.mjs [--dry-run]
 *
 * In order:
 *
 * 1. GitHub is asked which PRs the commit belongs to: the open PRs at that
 *    head (a preview deployment), or the merged PR that introduced the commit
 *    (a production deployment). Nothing happens for a commit with neither,
 *    which also keeps the Vercel token from being used for a commit nobody
 *    with push access pushed.
 * 2. The build log is read from Vercel, headed by the deployment's error
 *    message when it recorded one (a build that fails before its first step,
 *    such as on an invalid vercel.json, has an error but no log lines), and
 *    redacted.
 * 3. The log is uploaded into the thread of the Vercel Slack app's post for
 *    the deployment in SLACK_CHANNEL_ID, with a comment linking the PR. The
 *    post is looked for a week back (so a re-run by hand still finds it) and
 *    for up to 5 minutes (the app can post after this runs). Skipped when
 *    SLACK_BOT_TOKEN or SLACK_CHANNEL_ID is unset; a Slack error is a
 *    warning, so the PR still hears about a failed build.
 * 4. When the build failed, each open PR gets a comment linking the Slack
 *    reply, or just saying Slack when the upload did not happen. When it
 *    passed, an earlier failure comment is updated to say so.
 *
 * With --dry-run, steps 1 and 2 run, the Slack post is found, and what would
 * be uploaded and commented is printed instead.
 *
 * Needs DEPLOYMENT_ID, DEPLOYMENT_STATE (failed or success), COMMIT_SHA,
 * GH_TOKEN, GITHUB_REPOSITORY and VERCEL_TOKEN (plus VERCEL_TEAM_ID unless the
 * token is scoped to the project). SLACK_BOT_TOKEN is the bot in
 * dev/vercel-build-log-slack-app-manifest.json.
 */

const DRY_RUN = process.argv.includes('--dry-run');
// A week, so a re-run by hand finds the post; the deployment ID match is
// exact, so the wider window cannot pick a wrong post
const SLACK_HISTORY_DAYS = 7;
const SLACK_WAIT_MINUTES = 5;
const SLACK_POLL_SECONDS = 15;

const API_URL = process.env.GITHUB_API_URL ?? 'https://api.github.com';
const REPOSITORY = process.env.GITHUB_REPOSITORY;
const {DEPLOYMENT_ID, DEPLOYMENT_STATE, COMMIT_SHA, SLACK_CHANNEL_ID} =
	process.env;

// Comments from before the log moved to Slack carry an artifact ID here
const MARKER = '<!-- vercel-build-log -->';
const MARKER_PATTERN = /^<!-- vercel-build-log(?: artifact=\d+)? -->/;

// ---------------------------------------------------------------- GitHub

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

// The PRs GitHub associates with the commit: the open PRs at that head for a
// preview deployment, or the merged PR that introduced the commit to the
// default branch for a production one. A stale event for a commit an open PR
// has moved past is ignored, and so are open fork PRs.
async function findPullRequests() {
	const pulls = await github(
		'GET',
		`/repos/${REPOSITORY}/commits/${COMMIT_SHA}/pulls`
	);
	const linked = pulls.filter(pull => {
		if (pull.merged_at) {
			return true;
		}
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
	if (linked.length === 0) {
		console.log(
			`No open PR with head ${COMMIT_SHA} and no merged PR that introduced it; nothing to do`
		);
	}
	return linked;
}

// ---------------------------------------------------------------- Vercel

async function vercel(path, parameters = {}) {
	const url = new URL(`https://api.vercel.com${path}`);
	for (const [name, value] of Object.entries(parameters)) {
		url.searchParams.set(name, value);
	}
	if (process.env.VERCEL_TEAM_ID) {
		url.searchParams.set('teamId', process.env.VERCEL_TEAM_ID);
	}
	const response = await fetch(url, {
		headers: {authorization: `Bearer ${process.env.VERCEL_TOKEN}`}
	});
	if (!response.ok) {
		throw new Error(
			`GET ${url} failed: ${response.status} ${await response.text()}`
		);
	}
	return response.json();
}

// The deployment record: `meta.githubPrId` is the PR Vercel built it for
// (empty when the branch was deployed before its PR was opened), and
// `errorMessage`, `errorCode`, `errorStep` and `errorLink` say why it failed
async function fetchDeployment() {
	const deployment = await vercel(`/v13/deployments/${DEPLOYMENT_ID}`);
	// The deployment ID and commit arrive as separate inputs; only publish
	// the log of the deployment Vercel built from that commit
	const builtSha =
		deployment.meta?.githubCommitSha ?? deployment.gitSource?.sha;
	if (builtSha !== COMMIT_SHA) {
		throw new Error(
			`Deployment ${DEPLOYMENT_ID} was built from ${builtSha}, not ${COMMIT_SHA}`
		);
	}
	return deployment;
}

// Why Vercel says the deployment failed, as log lines. This is all there is
// when the deployment fails before its first build step, e.g. on an invalid
// vercel.json.
function deploymentErrorLines({errorMessage, errorCode, errorStep, errorLink}) {
	if (!errorMessage) {
		return [];
	}
	const details = [
		errorCode && `code: ${errorCode}`,
		errorStep && `step: ${errorStep}`,
		errorLink && `see: ${errorLink}`
	].filter(Boolean);
	return ['Build Failed', errorMessage, ...details, ''];
}

// Build log lines, oldest first. Vercel keeps them as events; only the ones
// with text are log lines.
async function fetchBuildLogLines() {
	const events = await vercel(`/v3/deployments/${DEPLOYMENT_ID}/events`, {
		limit: '-1',
		direction: 'forward'
	});
	return events
		.map(event => event.payload?.text ?? event.text)
		.filter(text => typeof text === 'string')
		.flatMap(text => text.replace(/\n$/, '').split('\n'));
}

// Credential shapes a build might print. The log only goes to Slack, but the
// build gets VERCEL_OIDC_TOKEN and friends, so a left-in
// `console.log(process.env)` should still not hand them to the whole channel.
// Not a complete list.
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

// The redacted log as text, and the deployment's error message on one line,
// for quoting
async function fetchBuildLog(deployment) {
	const lines = [
		...deploymentErrorLines(deployment),
		...(await fetchBuildLogLines())
	].map(redact);
	console.log(`Read ${lines.length} log lines from Vercel`);
	return {
		log: lines.join('\n') + '\n',
		error: redact(deployment.errorMessage ?? '').replace(/\s*\n\s*/g, ' ')
	};
}

// ----------------------------------------------------------------- Slack

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
// failed deployment and a deployed post for each successful one, with the
// short SHA in a context block and an Inspect button whose URL ends in the
// deployment ID. The ID is matched, since two PRs at one commit get two
// deployments and two posts. The app and this workflow are triggered by the
// same event, so its post can land after this runs; keep looking for a while
// before giving up.
async function findVercelPost() {
	const deploymentId = DEPLOYMENT_ID.replace(/^dpl_/, '');
	const oldest = Date.now() / 1000 - SLACK_HISTORY_DAYS * 24 * 60 * 60;
	const deadline = Date.now() + SLACK_WAIT_MINUTES * 60_000;
	for (;;) {
		// Newest first, a page at a time
		const seen = [];
		for (let cursor; ; ) {
			const {messages, response_metadata: metadata} = await slackApi(
				'conversations.history',
				{
					channel: SLACK_CHANNEL_ID,
					oldest,
					limit: 200,
					...(cursor && {cursor})
				}
			);
			const post = messages.find(message =>
				slackMessageText(message).includes(deploymentId)
			);
			if (post) {
				return post;
			}
			seen.push(...messages);
			cursor = metadata?.next_cursor;
			if (!cursor) {
				break;
			}
		}
		if (Date.now() >= deadline) {
			console.log(
				`No Vercel post for ${DEPLOYMENT_ID} in the last ${SLACK_HISTORY_DAYS} days; giving up. Newest messages seen:`
			);
			for (const message of seen.slice(0, 20)) {
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

// In Slack message text, `<url|label>` is a link, so these three characters
// have to be escaped in a label
function escapeSlackText(text) {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

// `#123 title` linking to each PR. The title is there for readers who cannot
// open Vercel's Inspect link, which is the point of the reply.
function pullRequestLinks(pulls) {
	return pulls
		.map(
			pull =>
				`<${pull.html_url}|#${pull.number} ${escapeSlackText(pull.title)}>`
		)
		.join(', ');
}

// Slack takes files in three steps: ask for an upload URL, POST the bytes to
// it, then say which channel and thread to share the file in. The PR link
// rides on the file's comment, which is the one message the bot can post
// without chat:write. Returns the permalink of the reply carrying the file,
// for the PR comment.
async function uploadLogToThread(post, pulls, {log, error}) {
	const shortSha = COMMIT_SHA.slice(0, 7);
	// .txt, so Slack shows it inline instead of offering a download
	const filename = `vercel-build-${shortSha}.txt`;
	const initialComment = [
		error && `> ${error}`,
		`Build log for PR ${pullRequestLinks(pulls)}`
	]
		.filter(Boolean)
		.join('\n');

	if (DRY_RUN) {
		console.log(
			`[dry-run] would upload ${filename} (${log.length} bytes) to thread ${post.ts} in ${SLACK_CHANNEL_ID}:\n${initialComment}`
		);
		return undefined;
	}
	const {upload_url: uploadUrl, file_id: fileId} = await slackApi(
		'files.getUploadURLExternal',
		{filename, length: Buffer.byteLength(log)}
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

	// The upload response names only the file, so find the reply it made;
	// fall back to the post itself rather than leave the PR without a link
	const {messages} = await slackApi('conversations.replies', {
		channel: SLACK_CHANNEL_ID,
		ts: post.ts
	});
	const reply = messages.find(message =>
		message.files?.some(file => file.id === fileId)
	);
	const {permalink} = await slackApi('chat.getPermalink', {
		channel: SLACK_CHANNEL_ID,
		message_ts: reply?.ts ?? post.ts
	});
	return permalink;
}

// Where the log went, for the PR comment: the reply's permalink, and the
// channel's name when the token can read it
async function attachLogInSlack(pulls, buildLog) {
	if (!process.env.SLACK_BOT_TOKEN || !SLACK_CHANNEL_ID) {
		console.log(
			'SLACK_BOT_TOKEN or SLACK_CHANNEL_ID unset; not posting to Slack'
		);
		return {};
	}
	let channel;
	try {
		const info = await slackApi('conversations.info', {
			channel: SLACK_CHANNEL_ID
		});
		channel = info.channel.name;
	} catch (error) {
		console.log(
			`${error.message}; the PR comment will not name the channel`
		);
	}
	const post = await findVercelPost();
	const permalink = post && (await uploadLogToThread(post, pulls, buildLog));
	return {channel, permalink};
}

// ------------------------------------------------------------ PR comment

// The log stays in Slack, where only the workspace can read it; the public
// comment says where to look
function failureBody({permalink, channel}) {
	const where = permalink
		? `[attached to its Slack post](${permalink})`
		: 'in Slack';
	const inChannel = channel ? ` in #${channel}` : '';
	return [
		MARKER,
		'### ❌ The Vercel build failed for this PR',
		'',
		`Vercel only shows build logs to members of its team, so the build log is ${where}${inChannel}.`,
		''
	].join('\n');
}

// Comment only when the build failed, or an earlier failure is resolved
async function commentOnPullRequest(pull, slack) {
	const comments = await githubList(
		`/repos/${REPOSITORY}/issues/${pull.number}/comments`
	);
	const existing = comments.find(comment =>
		MARKER_PATTERN.test(comment.body)
	);

	let body;
	if (DEPLOYMENT_STATE === 'failed') {
		body = failureBody(slack);
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

// ------------------------------------------------------------------ main

async function main() {
	for (const name of [
		'DEPLOYMENT_ID',
		'DEPLOYMENT_STATE',
		'COMMIT_SHA',
		'GH_TOKEN',
		'GITHUB_REPOSITORY',
		'VERCEL_TOKEN'
	]) {
		if (!process.env[name]) {
			throw new Error(`Missing required environment variable ${name}`);
		}
	}
	if (!['failed', 'success'].includes(DEPLOYMENT_STATE)) {
		throw new Error(`Unexpected DEPLOYMENT_STATE ${DEPLOYMENT_STATE}`);
	}

	// GitHub first, so the Vercel token is only ever used for a commit that
	// an open PR from this repository is at, or that a PR merged into it,
	// i.e. pushed by someone who can already push here
	const linked = await findPullRequests();
	if (linked.length === 0) {
		return;
	}
	const deployment = await fetchDeployment();
	// Two PRs at one commit get a deployment each; Vercel names the PR it
	// built this one for
	const built = linked.filter(
		pull => String(pull.number) === deployment.meta?.githubPrId
	);
	const pulls = built.length > 0 ? built : linked;
	const buildLog = await fetchBuildLog(deployment);

	// A Slack problem is a warning: the PR should still hear about a failure
	let slack = {};
	try {
		slack = await attachLogInSlack(pulls, buildLog);
	} catch (error) {
		console.log(`::warning::${error.message}`);
	}

	// Only open PRs get a comment: a production deployment's merged PR is
	// linked from Slack, not commented on
	for (const pull of pulls.filter(pull => pull.state === 'open')) {
		await commentOnPullRequest(pull, slack);
	}
}

main().catch(error => {
	console.error(error);
	process.exit(2);
});
