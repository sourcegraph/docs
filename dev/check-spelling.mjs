#!/usr/bin/env node

/**
 * Reports CSpell findings on lines added by a Git diff, and dictionary entries
 * added out of alphabetical order. Optionally also checks a pull request's
 * title and description. The pull request workflow
 * (.github/workflows/check-spelling.yml) runs this on the lines a PR adds and
 * comments the findings; it never fails the PR.
 *
 * Usage: node dev/check-spelling.mjs --diff <file> [options]
 *   --diff <file>          Unified diff, e.g. from `git diff -U0 origin/main`;
 *                          only added lines are checked
 *   --pull-request <file>  `<title>\n\n<description>` of the pull request, as
 *                          written by the workflow. Its findings carry `field`
 *                          ("title" or "description") instead of a repository
 *                          path, so they are reported in the summary only
 *   --format <name>        Output as text (default), json, or markdown
 *   --link-base <url>      Markdown output links each finding to <url>/<path>,
 *                          e.g. https://github.com/sourcegraph/docs/blob/<branch>
 *   --review <file>        Write a GitHub pull request review (JSON body for
 *                          POST /repos/{owner}/{repo}/pulls/{n}/reviews) with
 *                          one comment per finding in a file, up to 25
 *
 * Exits 1 when spelling issues are found and 2 for operational errors.
 */

import {spawnSync} from 'child_process';
import {readFileSync} from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {
	LINK_BASE,
	fileUrl,
	flagValue,
	groupByFile,
	linkTo,
	parseDiff,
	report
} from './check-shared.mjs';

const DIFF = parseDiff(flagValue('--diff'));
const PULL_REQUEST_FILE = flagValue('--pull-request');

const ALLOW_LIST = 'cspell-allow-list.txt';
const MAX_INLINE_COMMENTS = 25;

// `input` is checked as a document named `stdin://<file>`, so the repository's
// cspell.json still applies to text that is not in the repository
function runCSpell(files, input) {
	if (files.length === 0) {
		return [];
	}

	const result = spawnSync(
		'cspell',
		[
			'--no-progress',
			'--show-suggestions',
			'--reporter',
			'@cspell/cspell-json-reporter',
			'--file',
			...files
		],
		{encoding: 'utf8', input, maxBuffer: 50 * 1024 * 1024}
	);

	if (result.error) {
		throw result.error;
	}

	const report = JSON.parse(result.stdout);
	if (![0, 1].includes(result.status) || report.error.length > 0) {
		throw new Error(result.stderr || JSON.stringify(report.error));
	}

	return report.issues.map(issue => ({
		file: path.relative(
			process.cwd(),
			fileURLToPath(issue.uri.replace(/^stdin:/, 'file:'))
		),
		line: issue.row,
		column: issue.col,
		word: issue.text,
		suggestions: issue.suggestions?.slice(0, 3) ?? [],
		text: issue.line.text.replace(/\r?\n$/, '')
	}));
}

// The title is line 1 and the description starts on line 3, after a blank
// separator. `file` becomes the label the reports group by; `field` marks the
// finding as outside the repository.
function pullRequestFindings(file) {
	const input = readFileSync(file, 'utf8');
	return runCSpell(['stdin://pull-request.md'], input).map(finding =>
		finding.line === 1
			? {...finding, file: 'Pull request title', field: 'title'}
			: {
					...finding,
					file: 'Pull request description',
					field: 'description',
					line: finding.line - 2
				}
	);
}

// Entries in the dictionary files must be sorted, so duplicates stand out and
// merges are clean. Sorted the way CSpell matches: case- and accent-insensitive.
// Blank lines and comments start a new sorted run, so the lists can be sectioned.
const DICTIONARY_FILES = [ALLOW_LIST, 'cspell-block-list.txt'];
const collator = new Intl.Collator('en', {sensitivity: 'base'});

function unsortedDictionaryEntries(files) {
	const findings = [];
	for (const file of files.filter(file => DICTIONARY_FILES.includes(file))) {
		let run = []; // [{word, line}] of the current sorted run
		readFileSync(file, 'utf8')
			.split('\n')
			.forEach((text, index) => {
				if (/^\s*(#|$)/.test(text)) {
					run = [];
					return;
				}
				const word = text.replace(/\s*#.*/, '').trim();
				const line = index + 1;
				const belongsBefore = run.find(
					entry => collator.compare(word, entry.word) < 0
				);
				if (belongsBefore) {
					findings.push({
						file,
						line,
						column: 1,
						word,
						suggestions: [],
						text,
						message: `\`${word}\` is out of alphabetical order: move it above \`${belongsBefore.word}\``,
						relatedLine: belongsBefore.line // rendered as a link after the message
					});
				} else {
					run.push({word, line});
				}
			});
	}
	return findings;
}

function findingsOnAddedLines(issues) {
	return issues.filter(issue => DIFF.get(issue.file)?.has(issue.line));
}

function formatText(findings) {
	if (findings.length === 0) {
		return 'No issues found.\n';
	}

	const lines = [`Found ${findings.length} issue(s):`];
	for (const {file, line, column, word, message, relatedLine} of findings) {
		const detail = message
			? `${message}${relatedLine ? ` on line ${relatedLine}` : ''}`
			: `Unknown word (${word})`;
		lines.push(`${file}:${line}:${column} - ${detail}`);
	}
	return lines.join('\n') + '\n';
}

// Without ?plain=1, so GitHub's edit button works from it
const ALLOW_LIST_LINK = linkTo(
	`\`${ALLOW_LIST}\``,
	LINK_BASE && `${LINK_BASE}/${ALLOW_LIST}`
);

// Where the finding is, linked to the source view with the word highlighted
// when it is in a file
function locationText({file, line, column, word, field}) {
	if (field === 'title') {
		return `column ${column}`;
	}
	const location = `line ${line}, column ${column}`;
	const url = fileUrl(file);
	return field || !url
		? location
		: `[${location}](${url}#L${line}C${column}-L${line}C${column + word.length})`;
}

// A non-spelling finding's own message, e.g. an unsorted dictionary entry,
// pointing at its `relatedLine` when it has one
function messageText({file, message, relatedLine}) {
	if (!relatedLine) {
		return `${message}.`;
	}
	const url = fileUrl(file);
	return `${message} on ${linkTo(`line ${relatedLine}`, url && `${url}#L${relatedLine}`)}.`;
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

// `word` → `suggestion`, or the finding's own message
function summaryItem(finding) {
	if (finding.message) {
		return messageText(finding);
	}
	const suggestion = bestSuggestion(finding);
	return `\`${finding.word}\`${suggestion ? ` → \`${suggestion}\`` : ''}`;
}

// The words not in the dictionary, each once, as a `/spell` command takes them
function unknownWords(findings) {
	const words = [];
	for (const {word, message} of findings) {
		if (!message && !words.includes(word)) {
			words.push(word);
		}
	}
	return words;
}

// Body for a pull request comment
function formatMarkdown(findings) {
	if (findings.length === 0) {
		return '### ✅ This revision introduces no spelling errors\n';
	}
	const lines = [
		`### ⚠️ Spell check found ${findings.length} issue(s) in this PR`,
		'',
		'Only findings on lines added by this PR, and in its title and description, are shown.',
		...(findings.length > MAX_INLINE_COMMENTS
			? [
					`Up to ${MAX_INLINE_COMMENTS} of them are also commented inline.`
				]
			: []),
		''
	];
	for (const [file, fileFindings] of groupByFile(findings)) {
		lines.push(fileFindings[0].field ? `**${file}**` : `**\`${file}\`**`);
		for (const finding of fileFindings) {
			lines.push(
				`- ${locationText(finding)}`,
				`  - ${summaryItem(finding)}`
			);
		}
		lines.push('');
	}
	lines.push(
		`Please correct the spelling, or add words which are correct to ${ALLOW_LIST_LINK}.`,
		'',
		`Comment on this PR with \`/spell <list of words>\`, and a bot will push a commit to your branch adding your comment's list of words to ${ALLOW_LIST_LINK} for you.`
	);
	const words = unknownWords(findings);
	if (words.length > 0) {
		lines.push(
			'',
			`To accept all of the words above as correct: \`/spell ${words.join(' ')}\``
		);
	}
	return lines.join('\n') + '\n';
}

// First line of a review comment, so the workflow can match the comments it
// posted earlier to the findings still present and delete the rest
const REVIEW_MARKER = '<!-- check-spelling-finding:';

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

function reviewComment(finding) {
	const explanation = finding.message
		? [messageText(finding)]
		: [
				`\`${finding.word}\` is not in the dictionary.`,
				'',
				...suggestionBlock(finding),
				`Please correct the spelling, or add words which are correct to ${ALLOW_LIST_LINK}.`,
				'',
				`Comment on this PR with \`/spell ${finding.word}\`, and a bot will push a commit to your branch adding it to ${ALLOW_LIST_LINK} for you.`
			];
	return {
		path: finding.file,
		line: finding.line,
		side: 'RIGHT',
		body: [`${REVIEW_MARKER} ${finding.word} -->`, ...explanation].join(
			'\n'
		)
	};
}

// Body for POST /repos/{owner}/{repo}/pulls/{n}/reviews: one comment per
// finding in a file; title and description findings have no line to comment
// on. No review body: a submitted review cannot be deleted, so a body would
// outlive the comments once the words are fixed.
function reviewRequest(findings) {
	const comments = findings
		.filter(finding => !finding.field)
		.slice(0, MAX_INLINE_COMMENTS)
		.map(reviewComment);
	return {event: 'COMMENT', body: '', comments};
}

function main() {
	if (!DIFF) {
		throw new Error('Missing required --diff <file>');
	}
	const files = [...DIFF.keys()];
	const findings = [
		...findingsOnAddedLines([
			...runCSpell(files),
			...unsortedDictionaryEntries(files)
		]),
		...(PULL_REQUEST_FILE ? pullRequestFindings(PULL_REQUEST_FILE) : [])
	];
	report(findings, {text: formatText, markdown: formatMarkdown}, () =>
		reviewRequest(findings)
	);
}

try {
	main();
} catch (error) {
	console.error(error);
	process.exit(2);
}
