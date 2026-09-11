#!/usr/bin/env node

/**
 * Reports CSpell findings on a pull request: one summary comment in the
 * discussion, plus an inline review comment on each flagged line. Once the
 * findings are fixed, the summary is minimized as resolved and the inline
 * comments are deleted; the review that carried them has no body, so nothing
 * of it remains visible.
 *
 * Usage: node dev/post-spelling-review.mjs --findings <json-file> [--dry-run]
 *
 * Reads the JSON written by `dev/check-spelling.mjs --format json`.
 * Requires GH_TOKEN, GITHUB_REPOSITORY, PR_NUMBER, HEAD_SHA and HEAD_REF.
 */

import {readFileSync} from 'fs';

const args = process.argv.slice(2);
const FINDINGS_FILE = args[args.indexOf('--findings') + 1];
const DRY_RUN = args.includes('--dry-run');
const MAX_INLINE_COMMENTS = 25;

const API_URL = process.env.GITHUB_API_URL ?? 'https://api.github.com';
const REPOSITORY = process.env.GITHUB_REPOSITORY;
const PR_NUMBER = process.env.PR_NUMBER;
const HEAD_SHA = process.env.HEAD_SHA;
const HEAD_REF = process.env.HEAD_REF;

// Link to the PR branch, not the commit, so GitHub's edit button works from it
const ALLOW_LIST_LINK = `[\`cspell-allow-list.txt\`](https://github.com/${REPOSITORY}/blob/${HEAD_REF}/cspell-allow-list.txt)`;

const SUMMARY_MARKER = '<!-- cspell-report -->';
const INLINE_MARKER = '<!-- cspell-finding:';

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

async function githubWrite(method, route, body) {
	console.log(`${DRY_RUN ? '[dry-run] ' : ''}${method} ${route}`);
	if (!DRY_RUN) {
		await github(method, route, body);
	}
}

// Minimizing a comment is GraphQL-only. Both mutations are idempotent.
async function setCommentMinimized(nodeId, minimized) {
	const mutation = minimized
		? 'minimizeComment(input: {subjectId: $id, classifier: RESOLVED}) { clientMutationId }'
		: 'unminimizeComment(input: {subjectId: $id}) { clientMutationId }';
	console.log(
		`${DRY_RUN ? '[dry-run] ' : ''}${minimized ? 'minimize' : 'unminimize'} comment ${nodeId}`
	);
	if (DRY_RUN) {
		return;
	}
	const result = await github('POST', '/graphql', {
		query: `mutation ($id: ID!) { ${mutation} }`,
		variables: {id: nodeId}
	});
	if (result.errors) {
		throw new Error(`GraphQL failed: ${JSON.stringify(result.errors)}`);
	}
}

function groupByFile(findings) {
	const grouped = new Map();
	for (const finding of findings) {
		if (!grouped.has(finding.file)) {
			grouped.set(finding.file, []);
		}
		grouped.get(finding.file).push(finding);
	}
	return grouped;
}

// Source view (?plain=1, so Markdown is not rendered) with the word highlighted
function sourceLink(finding) {
	const {file, line, column, word} = finding;
	const end = column + word.length;
	return `https://github.com/${REPOSITORY}/blob/${HEAD_REF}/${file}?plain=1#L${line}C${column}-L${line}C${end}`;
}

// `word` → `suggestion`, or the finding's own message for non-spelling
// findings such as an unsorted dictionary entry
function summaryItem(finding) {
	if (finding.message) {
		return finding.message;
	}
	const suggestion = bestSuggestion(finding);
	return `\`${finding.word}\`${suggestion ? ` → \`${suggestion}\`` : ''}`;
}

function summaryBody(findings) {
	const lines = [
		SUMMARY_MARKER,
		`### ⚠️ Spell check found ${findings.length} issue(s) in this PR`,
		'',
		'Only findings on lines added by this PR are shown.',
		...(findings.length > MAX_INLINE_COMMENTS
			? [
					`Up to ${MAX_INLINE_COMMENTS} of them are also commented inline.`
				]
			: []),
		''
	];
	for (const [file, fileFindings] of groupByFile(findings)) {
		lines.push(`**\`${file}\`**`);
		for (const finding of fileFindings) {
			const {line, column} = finding;
			lines.push(
				`- [line ${line}, column ${column}](${sourceLink(finding)}): ${summaryItem(finding)}`
			);
		}
		lines.push('');
	}
	lines.push(
		`Please correct the spelling, or add words which are correct to ${ALLOW_LIST_LINK}.`,
		'',
		"Run `npx cspell@10 --no-progress --dot '**/*'` locally to check the full repository."
	);
	return lines.join('\n') + '\n';
}

async function upsertSummaryComment(findings) {
	const comments = await githubList(
		`/repos/${REPOSITORY}/issues/${PR_NUMBER}/comments`
	);
	const existing = comments.find(comment =>
		comment.body.startsWith(SUMMARY_MARKER)
	);

	if (!existing) {
		if (findings.length > 0) {
			await githubWrite(
				'POST',
				`/repos/${REPOSITORY}/issues/${PR_NUMBER}/comments`,
				{body: summaryBody(findings)}
			);
		}
		return;
	}

	// Keep the earlier report, collapsed as resolved, so the discussion still
	// shows what was flagged and fixed. Reopen it when new findings appear.
	const resolved = findings.length === 0;
	await githubWrite(
		'PATCH',
		`/repos/${REPOSITORY}/issues/comments/${existing.id}`,
		{
			body: resolved
				? `${SUMMARY_MARKER}\n### ✅ The spelling errors reported on an earlier revision are fixed\n`
				: summaryBody(findings)
		}
	);
	await setCommentMinimized(existing.node_id, resolved);
}

function findingKey({file, line, word}) {
	return `${file}:${line}:${word}`;
}

// Review comments GitHub could not carry to the new revision have line: null,
// so their key never matches a current finding and they are deleted.
function existingCommentKey(comment) {
	const word = comment.body.match(/^<!-- cspell-finding: (.+?) -->/)?.[1];
	return word && findingKey({file: comment.path, line: comment.line, word});
}

// CSpell suggests case-insensitively, so prefer a suggestion whose first
// letter matches the case of the flagged word.
function bestSuggestion({word, suggestions}) {
	const isUpper = letter => letter === letter.toUpperCase();
	return (
		suggestions.find(
			suggestion => isUpper(suggestion[0]) === isUpper(word[0])
		) ?? suggestions[0]
	);
}

// One GitHub suggestion block with an apply button. A four-backtick fence so
// lines containing ``` cannot break out of the block.
function suggestionBlock(finding) {
	const suggestion = bestSuggestion(finding);
	if (!suggestion) {
		return [];
	}
	const {text, column, word} = finding;
	const start = column - 1;
	return [
		`Did you mean \`${suggestion}\`?`,
		'',
		'````suggestion',
		text.slice(0, start) + suggestion + text.slice(start + word.length),
		'````',
		''
	];
}

function inlineBody(finding) {
	const explanation = finding.message
		? [finding.message]
		: [
				`\`${finding.word}\` is not in the dictionary.`,
				'',
				...suggestionBlock(finding),
				`Please correct the spelling, or add the word to ${ALLOW_LIST_LINK} if it is correct.`
			];
	return [`${INLINE_MARKER} ${finding.word} -->`, ...explanation].join('\n');
}

async function syncInlineComments(findings) {
	const wanted = new Map(
		findings.map(finding => [findingKey(finding), finding])
	);
	const comments = await githubList(
		`/repos/${REPOSITORY}/pulls/${PR_NUMBER}/comments`
	);

	for (const comment of comments) {
		const key = existingCommentKey(comment);
		if (!key) {
			continue;
		}
		if (wanted.has(key)) {
			wanted.delete(key);
		} else {
			await githubWrite(
				'DELETE',
				`/repos/${REPOSITORY}/pulls/comments/${comment.id}`
			);
		}
	}

	const fresh = [...wanted.values()];
	if (fresh.length === 0) {
		return;
	}
	// No review body: the inline comments say it all, and a submitted review
	// cannot be deleted, so a body would outlive the comments once fixed.
	await githubWrite(
		'POST',
		`/repos/${REPOSITORY}/pulls/${PR_NUMBER}/reviews`,
		{
			commit_id: HEAD_SHA,
			event: 'COMMENT',
			body: '',
			comments: fresh.slice(0, MAX_INLINE_COMMENTS).map(finding => ({
				path: finding.file,
				line: finding.line,
				side: 'RIGHT',
				body: inlineBody(finding)
			}))
		}
	);
}

async function main() {
	for (const name of [
		'GH_TOKEN',
		'GITHUB_REPOSITORY',
		'PR_NUMBER',
		'HEAD_SHA',
		'HEAD_REF'
	]) {
		if (!process.env[name]) {
			throw new Error(`Missing required environment variable ${name}`);
		}
	}
	if (!FINDINGS_FILE) {
		throw new Error('Missing required --findings <json-file>');
	}

	const findings = JSON.parse(readFileSync(FINDINGS_FILE, 'utf8'));
	console.log(`${findings.length} finding(s) to report`);
	await upsertSummaryComment(findings);
	await syncInlineComments(findings);
}

main().catch(error => {
	console.error(error);
	process.exit(2);
});
