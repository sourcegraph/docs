#!/usr/bin/env node

/**
 * Reports placeholder hostnames in docs/ that are not the recommended ones,
 * e.g. `your-sourcegraph-instance.com` where `sourcegraph.example.com` is the
 * convention, and proposes the replacement. The pull request workflow
 * (.github/workflows/check-hostnames.yml) runs this on the lines a PR adds and
 * comments the findings; it never fails the PR.
 *
 * dev/example-hostnames.json maps each recommended hostname to the
 * placeholders seen in its place. An entry is literal text, a glob where `*`
 * matches any run of hostname characters other than `.`, or a regular
 * expression written `/.../` (escape backslashes for JSON: `\\.`). Matching
 * ignores case, and in literal and glob entries each of `-`, `_`, and `.`
 * matches any of the three, so `your-domain.com` also covers
 * `your_domain.com`. An entry matches as a whole hostname, or as the tail of
 * one: `mycompany.com` under `example.com` turns `prometheus.mycompany.com`
 * into `prometheus.example.com`. The longest entry wins where several match. A
 * recommended value with a scheme, like `https://sourcegraph.example.com`, is
 * for placeholders that stand for a whole URL; the scheme is dropped where the
 * text already has one. Auto-generated SCHEMA_SYNC blocks are skipped: fix
 * those upstream.
 *
 * Usage: node dev/check-hostnames.mjs [options]
 *   --diff <file>        Unified diff, e.g. from `git diff -U0 origin/main`;
 *                        only added lines are checked. Without it, every line
 *                        of every docs/ file is checked
 *   --format <name>      Output as text (default), json, or markdown
 *   --link-base <url>    Markdown output links each file path to <url>/<path>,
 *                        e.g. https://github.com/sourcegraph/docs/blob/<branch>
 *   --review <file>      Write a GitHub pull request review (JSON body for
 *                        POST /repos/{owner}/{repo}/pulls/{n}/reviews) with one
 *                        suggested change per flagged line. Requires --diff
 *
 * Exits 1 when any finding is reported.
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {
	fileUrl,
	flagValue,
	groupByFile,
	linkTo,
	listDocsFiles,
	parseDiff,
	report
} from './check-shared.mjs';

const ROOT_DIR = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const MAPPING_FILE = 'dev/example-hostnames.json';

const DIFF = parseDiff(flagValue('--diff'));

if (flagValue('--review') && !DIFF) {
	throw new Error('--review needs --diff, to know which lines were added');
}

// In a literal or glob entry, each separator matches any separator. Space is
// not one: `YOUR-SOURCEGRAPH-INSTANCE` must not match the prose "your
// Sourcegraph instance"
const SEPARATOR = '[-_.]';

// Regex source for one mapping entry: a `/.../` entry as written, anything
// else as literal text where `*` matches any run of hostname characters
// other than `.`
function entryPattern(entry) {
	const regex = entry.match(/^\/(.+)\/$/);
	if (regex) return regex[1];
	return entry
		.split('*')
		.map(part =>
			part
				.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
				.replace(/\\\.|[-_]/g, SEPARATOR)
		)
		.join('[\\w-]*');
}

// [{recommended, exact}] with `exact` matching a whole placeholder, longest
// entry first, and one regex matching any placeholder as a whole hostname or
// the tail of one. Alternatives are tried in order, so the longest entry wins
// where several match; the tail prefix is lazy, so an entry that includes the
// subdomain wins over one that does not.
function loadMapping() {
	const mapping = JSON.parse(
		fs.readFileSync(path.join(ROOT_DIR, MAPPING_FILE), 'utf-8')
	);
	const entries = Object.entries(mapping)
		.filter(([recommended]) => recommended !== '$comment')
		.flatMap(([recommended, placeholders]) =>
			placeholders.map(placeholder => ({recommended, placeholder}))
		)
		.sort((a, b) => b.placeholder.length - a.placeholder.length)
		.map(({recommended, placeholder}) => {
			const source = entryPattern(placeholder);
			return {
				recommended,
				source,
				exact: new RegExp(`^(?:${source})$`, 'i')
			};
		});
	const alternatives = entries.map(entry => `(?:${entry.source})`).join('|');
	const pattern = new RegExp(
		`(?<![\\w.-])(?<prefix>(?:[\\w*-]+\\.)*?)(?<placeholder>${alternatives})(?![\\w-]|\\.\\w)`,
		'gi'
	);
	return {entries, pattern};
}

const {entries, pattern} = loadMapping();

// The recommended text for a match: the subdomains the text had in front of
// the placeholder are kept, and the scheme is left out where the text has one
function replacement(prefix, placeholder, precededByScheme) {
	const [, scheme = '', host] = entries
		.find(entry => entry.exact.test(placeholder))
		.recommended.match(/^(\w+:\/\/)?(.*)$/);
	return (precededByScheme ? '' : scheme) + prefix + host;
}

// {findings: [{file, line, column, placeholder, recommended, text}], fixed}
// for one line, where `placeholder` is the whole hostname matched, subdomains
// included, and `fixed` is the line with every placeholder replaced
function checkLine(file, line, text) {
	const findings = [];
	let fixed = '';
	let end = 0;
	for (const match of text.matchAll(pattern)) {
		const {prefix, placeholder} = match.groups;
		const recommended = replacement(
			prefix,
			placeholder,
			/:\/\/$/.test(text.slice(0, match.index))
		);
		findings.push({
			file,
			line,
			column: match.index + 1,
			placeholder: match[0],
			recommended,
			text
		});
		fixed += text.slice(end, match.index) + recommended;
		end = match.index + match[0].length;
	}
	return {findings, fixed: fixed + text.slice(end)};
}

// Every finding in the checked files, and the fixed text of each flagged line
// ({file, line} → fixed), for the review
function findPlaceholders() {
	const files = DIFF
		? [...DIFF.keys()].filter(
				file => file.startsWith('docs/') && /\.mdx?$/.test(file)
			)
		: listDocsFiles(ROOT_DIR);
	const findings = [];
	const fixedLines = new Map();
	for (const file of files) {
		const fullPath = path.join(ROOT_DIR, file);
		if (!fs.existsSync(fullPath)) continue;
		let inSchemaSync = false;
		fs.readFileSync(fullPath, 'utf-8')
			.split('\n')
			.forEach((text, index) => {
				if (text.includes('SCHEMA_SYNC_START')) inSchemaSync = true;
				if (text.includes('SCHEMA_SYNC_END')) inSchemaSync = false;
				const line = index + 1;
				if (inSchemaSync || (DIFF && !DIFF.get(file).has(line))) return;
				const result = checkLine(file, line, text);
				if (result.findings.length > 0) {
					findings.push(...result.findings);
					fixedLines.set(`${file}:${line}`, result.fixed);
				}
			});
	}
	return {findings, fixedLines};
}

function formatText(findings) {
	if (findings.length === 0) {
		return 'No issues found.\n';
	}
	const lines = [`Found ${findings.length} placeholder hostname(s):`];
	for (const {file, line, column, placeholder, recommended} of findings) {
		lines.push(
			`${file}:${line}:${column} - ${placeholder} → ${recommended}`
		);
	}
	return lines.join('\n') + '\n';
}

const CONVENTION =
	'Docs use `*.example.com` hostnames as placeholders (`sourcegraph.example.com` ' +
	'for the reader’s Sourcegraph instance, `github.example.com` for a code host, ' +
	'and so on), so pages read the same and no example points at a real domain. ' +
	`The mapping is in \`${MAPPING_FILE}\`; add a placeholder there when this ` +
	'check misses one.';

// Body for a pull request comment
function formatMarkdown(findings) {
	if (findings.length === 0) {
		return '### ✅ This revision uses only recommended example hostnames\n';
	}
	const lines = [
		`### ⚠️ This PR adds ${findings.length} placeholder hostname(s) that are not the recommended ones`,
		'',
		'Only lines added by this PR are checked. Each flagged line also has an inline ' +
			'comment with a suggested change you can apply from the PR.',
		''
	];
	for (const [file, fileFindings] of groupByFile(findings)) {
		const url = fileUrl(file);
		lines.push(linkTo(`**\`${file}\`**`, url));
		for (const {line, placeholder, recommended} of fileFindings) {
			lines.push(
				`- ${linkTo(`line ${line}`, url && `${url}#L${line}`)}: ` +
					`\`${placeholder}\` → \`${recommended}\``
			);
		}
		lines.push('');
	}
	lines.push(
		CONVENTION,
		'',
		'Reproduce locally with `node dev/check-hostnames.mjs --diff <(git diff -U0 origin/main)`.'
	);
	return lines.join('\n') + '\n';
}

// First line of a review comment, so the workflow can match the comments it
// posted earlier to the findings still present and delete the rest
const REVIEW_MARKER = '<!-- check-hostnames-finding:';

// Body for POST /repos/{owner}/{repo}/pulls/{n}/reviews: one suggested change
// per flagged line, with every placeholder on it replaced, so the author can
// apply each from the PR. No review body: a submitted review cannot be deleted,
// so a body would outlive the comments once the hostnames are fixed.
function reviewRequest(findings, fixedLines) {
	const comments = [];
	for (const [key, fixed] of fixedLines) {
		const lineFindings = findings.filter(
			finding => `${finding.file}:${finding.line}` === key
		);
		const {file, line} = lineFindings[0];
		// A placeholder used twice on the line is listed once
		const replacements = new Map(
			lineFindings.map(({placeholder, recommended}) => [
				placeholder,
				recommended
			])
		);
		const body = [
			`${REVIEW_MARKER} ${[...replacements.keys()].join(', ')} -->`,
			...[...replacements].map(
				([placeholder, recommended]) =>
					`Placeholder: \`${placeholder}\`, use \`${recommended}\``
			),
			// A four-backtick fence so lines containing ``` cannot break out
			'````suggestion',
			fixed,
			'````'
		];
		comments.push({path: file, line, side: 'RIGHT', body: body.join('\n')});
	}
	return {event: 'COMMENT', body: '', comments};
}

const {findings, fixedLines} = findPlaceholders();
report(findings, {text: formatText, markdown: formatMarkdown}, () =>
	reviewRequest(findings, fixedLines)
);
