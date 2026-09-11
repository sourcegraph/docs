#!/usr/bin/env node

/**
 * Reports CSpell findings on a pull request: one summary comment in the
 * discussion, plus an inline review comment on each flagged line.
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

function summaryBody(findings) {
	const lines = [
		SUMMARY_MARKER,
		`### ⚠️ CSpell found ${findings.length} spelling error(s) in this PR`,
		'',
		'Only findings on lines added by this PR are shown.',
		''
	];
	for (const [file, fileFindings] of groupByFile(findings)) {
		lines.push(`**\`${file}\`**`);
		for (const {line, column, word, context} of fileFindings) {
			const excerpt = context.replaceAll('`', "'").slice(0, 160);
			lines.push(
				`- line ${line}, column ${column}: \`${word}\` — \`${excerpt}\``
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

	// Comment only when there is something to report, or an earlier report to resolve
	let body;
	if (findings.length > 0) {
		body = summaryBody(findings);
	} else if (existing) {
		body = `${SUMMARY_MARKER}\n### ✅ The spelling errors reported on an earlier revision are fixed\n`;
	} else {
		return;
	}

	if (existing) {
		await githubWrite(
			'PATCH',
			`/repos/${REPOSITORY}/issues/comments/${existing.id}`,
			{body}
		);
	} else {
		await githubWrite(
			'POST',
			`/repos/${REPOSITORY}/issues/${PR_NUMBER}/comments`,
			{body}
		);
	}
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
	return [
		`${INLINE_MARKER} ${finding.word} -->`,
		`\`${finding.word}\` is not in the dictionary.`,
		'',
		...suggestionBlock(finding),
		`Please correct the spelling, or add the word to ${ALLOW_LIST_LINK} if it is correct.`
	].join('\n');
}

function reviewBody(shown, total) {
	const summary = `CSpell found ${total} spelling error(s) on lines added by this PR. Please correct them, or add them to ${ALLOW_LIST_LINK} if they are correct.`;
	return shown < total
		? `${summary} The first ${shown} are commented inline; the summary comment lists them all.`
		: summary;
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
	const shown = fresh.slice(0, MAX_INLINE_COMMENTS);
	await githubWrite(
		'POST',
		`/repos/${REPOSITORY}/pulls/${PR_NUMBER}/reviews`,
		{
			commit_id: HEAD_SHA,
			event: 'COMMENT',
			body: reviewBody(shown.length, fresh.length),
			comments: shown.map(finding => ({
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
