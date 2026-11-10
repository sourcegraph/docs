#!/usr/bin/env node
/**
 * Comments on a pull request with a table of the docs pages it changes, so a
 * reviewer can compare them without reading the diff: each page before (on
 * production) and after (on the PR's Vercel preview), and its diff on GitHub.
 * Both page links open at the first section the PR changes. One comment per
 * PR, updated on each run; .github/workflows/preview-links.yml says when it
 * runs.
 *
 * dev/vercel-build-log.mjs copies the table into Slack (changedPageLines);
 * change the two together.
 *
 * With --dry-run, the comment is printed instead of posted:
 *   GH_TOKEN=$(gh auth token) GITHUB_REPOSITORY=sourcegraph/docs \
 *       PR_NUMBER=<number> node dev/preview-links.mjs --dry-run
 *
 * Needs GH_TOKEN, GITHUB_REPOSITORY, and either PR_NUMBER (the preview URL is
 * read from the Vercel bot's comment) or PREVIEW_URL and COMMIT_SHA (a
 * finished deployment; the PR is looked up from the commit).
 */

import crypto from 'crypto';
import {headingIds, routeFor} from './check-links.mjs';

const DRY_RUN = process.argv.includes('--dry-run');
const API_URL = process.env.GITHUB_API_URL ?? 'https://api.github.com';
const {GITHUB_REPOSITORY, PR_NUMBER, PREVIEW_URL, COMMIT_SHA} = process.env;

const MARKER = '<!-- preview-links-for-changed-pages -->';
// Where the pages are before the PR merges (basePath in next.config.js);
// preview deployments have no basePath
const PRODUCTION_SITE = 'https://sourcegraph.com/docs';
const MAX_PAGES = 40;
// Vercel comments a few seconds after the PR opens
const VERCEL_COMMENT_ATTEMPTS = 6;
const VERCEL_COMMENT_POLL_SECONDS = 10;

const sleep = seconds =>
	new Promise(resolve => setTimeout(resolve, seconds * 1000));

async function github(route, {method = 'GET', body, raw = false} = {}) {
	const response = await fetch(
		`${API_URL}/repos/${GITHUB_REPOSITORY}${route}`,
		{
			method,
			headers: {
				authorization: `Bearer ${process.env.GH_TOKEN}`,
				accept: `application/vnd.github${raw ? '.raw' : ''}+json`,
				'x-github-api-version': '2022-11-28',
				...(body && {'content-type': 'application/json'})
			},
			body: body && JSON.stringify(body)
		}
	);
	if (!response.ok) {
		throw new Error(
			`${method} ${route} failed: ${response.status} ${await response.text()}`
		);
	}
	return raw ? response.text() : response.json();
}

async function githubList(route) {
	const items = [];
	for (let page = 1; ; page++) {
		const batch = await github(`${route}?per_page=100&page=${page}`);
		items.push(...batch);
		if (batch.length < 100) {
			return items;
		}
	}
}

// The Vercel bot's comment has a `[Preview](<branch alias>)` link per
// project; this repository deploys one project
async function previewUrlFromVercelComment(pullNumber) {
	for (let attempt = 1; attempt <= VERCEL_COMMENT_ATTEMPTS; attempt++) {
		if (attempt > 1) {
			await sleep(VERCEL_COMMENT_POLL_SECONDS);
		}
		const comments = await githubList(`/issues/${pullNumber}/comments`);
		const preview = comments
			.find(comment => comment.user?.login === 'vercel[bot]')
			?.body?.match(/\[Preview\]\((https:\/\/[^)\s]+)\)/);
		if (preview) {
			return preview[1];
		}
		console.log(
			`Vercel has not commented a preview URL on PR #${pullNumber} yet (attempt ${attempt})`
		);
	}
}

// The PR to comment on and the preview deployment to link, or nothing when
// there is nothing to do
async function findPullRequestAndPreview() {
	if (PR_NUMBER) {
		const previewUrl = await previewUrlFromVercelComment(PR_NUMBER);
		if (!previewUrl) {
			console.log(
				'Giving up; the vercel.deployment.success dispatch will comment when the deployment finishes'
			);
			return {};
		}
		return {pull: await github(`/pulls/${PR_NUMBER}`), previewUrl};
	}
	if (!PREVIEW_URL || !/^[0-9a-f]{40}$/i.test(COMMIT_SHA ?? '')) {
		throw new Error(
			`Need PR_NUMBER, or a preview URL and a full commit SHA; got PREVIEW_URL=${JSON.stringify(PREVIEW_URL)} COMMIT_SHA=${JSON.stringify(COMMIT_SHA)}`
		);
	}
	// The deployment event has no PR number; look it up from the commit
	const pulls = await github(`/commits/${COMMIT_SHA}/pulls`);
	const pull = pulls.find(
		pull => pull.state === 'open' && pull.head.sha === COMMIT_SHA
	);
	if (!pull) {
		console.log(`No open PR with head ${COMMIT_SHA}; nothing to do`);
	}
	return {pull, previewUrl: PREVIEW_URL};
}

// Only .mdx files under docs/ become pages (contentlayer.config.ts)
const isPage = filename =>
	filename?.startsWith('docs/') && filename.endsWith('.mdx');
const route = filename => routeFor(filename.slice('docs/'.length));

// The page a changed file is before and after the PR. A page the PR adds has
// no before, one it removes has no after, and one it moves has both
function pageChange(file) {
	const before =
		file.status === 'added'
			? undefined
			: (file.previous_filename ?? file.filename);
	const after = file.status === 'removed' ? undefined : file.filename;
	return {
		...file,
		before: isPage(before) ? before : undefined,
		after: isPage(after) ? after : undefined
	};
}

function kindOf(page) {
	if (!page.before) return 'added';
	if (!page.after) return 'removed';
	return page.before === page.after ? 'modified' : 'renamed';
}

// The page's sections, in page order: each heading's id, and its lines up to
// the next heading
function sections(content) {
	const lines = content.split('\n');
	const headings = headingIds(content);
	return headings.map(({id, line}, index) => ({
		id,
		text: lines.slice(line, headings[index + 1]?.line).join('\n')
	}));
}

const fileContent = (filename, ref) =>
	github(`/contents/${encodeURI(filename)}?ref=${ref}`, {raw: true});

// The heading each side of a page the PR edits should open at: [before,
// after]. Both sides start with the same sections; each opens at its first
// section after those, which is the one the PR changes, or the one next to a
// section only the other side has. Nothing when the PR changes no section.
//
// The diff's own before is the merge base, which production can be ahead of;
// a heading that has since changed there opens the page at the top
async function firstChangedHeadings(page, mergeBase, head) {
	if (!page.before || !page.after || page.changes === 0) {
		return [];
	}
	const [before, after] = (
		await Promise.all([
			fileContent(page.before, mergeBase),
			fileContent(page.after, head)
		])
	).map(sections);
	let shared = 0;
	while (before[shared] && before[shared].text === after[shared]?.text) {
		shared++;
	}
	if (shared === before.length && shared === after.length) {
		return [];
	}
	return [before, after].map(side => (side[shared] ?? side[shared - 1])?.id);
}

function pageLink(text, site, filename, heading) {
	if (!filename) {
		return '—';
	}
	return `[${text}](${site}${route(filename)}${heading ? `#${heading}` : ''})`;
}

function pageLabel(page) {
	const label = `\`${route(page.after ?? page.before)}\``;
	switch (kindOf(page)) {
		case 'added':
			return `${label} 🆕`;
		case 'removed':
			return `${label} 🗑️`;
		case 'renamed':
			return `${label} ↪ from \`${route(page.before)}\``;
		default:
			return label;
	}
}

// GitHub anchors each file of a PR's diff with the SHA-256 of its path
function diffLink(page, pull) {
	const anchor = crypto
		.createHash('sha256')
		.update(page.filename)
		.digest('hex');
	const size = [
		page.deletions && `−${page.deletions}`,
		page.additions && `+${page.additions}`
	]
		.filter(Boolean)
		.join(' ');
	return `[${size || 'diff'}](${pull.html_url}/files#diff-${anchor})`;
}

async function commentBody(pull, previewUrl, pages) {
	const {merge_base_commit: mergeBase} = await github(
		`/compare/${pull.base.sha}...${pull.head.sha}?per_page=1`
	);
	const rows = await Promise.all(
		pages.slice(0, MAX_PAGES).map(async page => {
			const [beforeHeading, afterHeading] = await firstChangedHeadings(
				page,
				mergeBase.sha,
				pull.head.sha
			);
			const cells = [
				pageLabel(page),
				pageLink('prod', PRODUCTION_SITE, page.before, beforeHeading),
				pageLink('preview', previewUrl, page.after, afterHeading),
				diffLink(page, pull)
			];
			return `| ${cells.join(' | ')} |`;
		})
	);
	if (pages.length > MAX_PAGES) {
		rows.push(`| …and ${pages.length - MAX_PAGES} more | | | |`);
	}
	return [
		MARKER,
		'| Page | Before | After | Diff |',
		'|---|---|---|---|',
		...rows
	].join('\n');
}

async function main() {
	const {pull, previewUrl} = await findPullRequestAndPreview();
	if (!pull) {
		return;
	}
	const files = await githubList(`/pulls/${pull.number}/files`);
	const pages = files
		.map(pageChange)
		.filter(page => page.before || page.after);
	if (pages.length === 0) {
		console.log(`PR #${pull.number} changes no docs pages; not commenting`);
		return;
	}
	const body = await commentBody(pull, previewUrl.replace(/\/$/, ''), pages);
	if (DRY_RUN) {
		console.log(body);
		return;
	}
	// Update our previous comment instead of adding a new one per push
	const comments = await githubList(`/issues/${pull.number}/comments`);
	const existing = comments.find(comment => comment.body?.includes(MARKER));
	if (existing) {
		await github(`/issues/comments/${existing.id}`, {
			method: 'PATCH',
			body: {body}
		});
	} else {
		await github(`/issues/${pull.number}/comments`, {
			method: 'POST',
			body: {body}
		});
	}
}

main().catch(error => {
	console.error(error);
	process.exit(1);
});
