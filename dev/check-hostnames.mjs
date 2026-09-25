#!/usr/bin/env node

/**
 * Reports placeholder hostnames in docs/ that are not the recommended ones,
 * e.g. `your-sourcegraph-instance.com` where `sourcegraph.example.com` is the
 * convention, and proposes the replacement. The pull request workflow
 * (.github/workflows/check-hostnames.yml) runs this on the lines a PR adds and
 * comments the findings; it never fails the PR.
 *
 * dev/example-hostnames.json maps each recommended hostname to the
 * placeholders seen in its place. An entry matches as a whole hostname, or as
 * the tail of one: `mycompany.com` under `example.com` turns
 * `prometheus.mycompany.com` into `prometheus.example.com`. The longest entry
 * wins where several match. A recommended value with a scheme, like
 * `https://sourcegraph.example.com`, is for placeholders that stand for a whole
 * URL; the scheme is dropped where the text already has one. Auto-generated
 * SCHEMA_SYNC blocks are skipped: fix those upstream.
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

const ROOT_DIR = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DOCS_DIR = path.join(ROOT_DIR, 'docs');
const MAPPING_FILE = 'dev/example-hostnames.json';

const args = process.argv.slice(2);
const DIFF = parseDiff(flagValue('--diff'));
const FORMAT = flagValue('--format') ?? 'text';
const LINK_BASE = flagValue('--link-base')?.replace(/\/$/, '');
const REVIEW_FILE = flagValue('--review');

if (REVIEW_FILE && !DIFF) {
	throw new Error('--review needs --diff, to know which lines were added');
}

function flagValue(name) {
	const index = args.indexOf(name);
	return index === -1 ? undefined : args[index + 1];
}

// Added lines of a unified diff, by path relative to the repository:
// Map<'docs/foo.mdx', Set<lineNumber>>
function parseDiff(file) {
	if (!file) return undefined;
	const addedLines = new Map();
	let currentFile;
	let lineNumber;
	for (const line of fs.readFileSync(file, 'utf-8').split('\n')) {
		if (line.startsWith('diff --git ')) {
			currentFile = undefined;
		} else if (line.startsWith('+++ ') && !currentFile) {
			// `+++ /dev/null` is a deleted file, which has no added lines
			currentFile = line.slice(4).replace(/^b\//, '');
			if (currentFile === '/dev/null') continue;
			addedLines.set(currentFile, new Set());
		} else if (line.startsWith('@@ ')) {
			lineNumber = Number(line.match(/^@@ -\S+ \+(\d+)/)[1]);
		} else if (line.startsWith('+') && currentFile) {
			addedLines.get(currentFile).add(lineNumber++);
		} else if (line.startsWith(' ')) {
			lineNumber++;
		}
	}
	return addedLines;
}

// {placeholder → recommended}, and one regex matching any placeholder as a
// whole hostname or the tail of one. Alternatives are tried in order, so the
// longest placeholder wins where several match; the tail prefix is lazy, so a
// placeholder that includes the subdomain wins over one that does not.
function loadMapping() {
	const mapping = JSON.parse(
		fs.readFileSync(path.join(ROOT_DIR, MAPPING_FILE), 'utf-8')
	);
	const recommendedFor = new Map();
	for (const [recommended, placeholders] of Object.entries(mapping)) {
		if (recommended === '$comment') continue;
		for (const placeholder of placeholders) {
			recommendedFor.set(placeholder, recommended);
		}
	}
	const alternatives = [...recommendedFor.keys()]
		.sort((a, b) => b.length - a.length)
		.map(placeholder => placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
		.join('|');
	const pattern = new RegExp(
		`(?<![\\w.-])((?:[\\w*-]+\\.)*?)(${alternatives})(?![\\w-]|\\.\\w)`,
		'g'
	);
	return {recommendedFor, pattern};
}

const {recommendedFor, pattern} = loadMapping();

// The recommended text for a match: the subdomains the text had in front of
// the placeholder are kept, and the scheme is left out where the text has one
function replacement(prefix, placeholder, precededByScheme) {
	const [, scheme = '', host] = recommendedFor
		.get(placeholder)
		.match(/^(\w+:\/\/)?(.*)$/);
	return (precededByScheme ? '' : scheme) + prefix + host;
}

// {findings: [{file, line, column, placeholder, recommended, text}], fixed}
// for one line, where `placeholder` is the whole hostname matched, subdomains
// included, and `fixed` is the line with every placeholder replaced
function checkLine(file, line, text) {
	const findings = [];
	const fixed = text.replace(
		pattern,
		(match, prefix, placeholder, offset, whole) => {
			const recommended = replacement(
				prefix,
				placeholder,
				/:\/\/$/.test(whole.slice(0, offset))
			);
			findings.push({
				file,
				line,
				column: offset + 1,
				placeholder: match,
				recommended,
				text
			});
			return recommended;
		}
	);
	return {findings, fixed};
}

// Sorted relative paths of the .md and .mdx files under docs/
function listDocsFiles(dir = DOCS_DIR) {
	return fs
		.readdirSync(dir, {withFileTypes: true})
		.sort((a, b) => a.name.localeCompare(b.name))
		.flatMap(entry => {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) return listDocsFiles(full);
			return /\.mdx?$/.test(entry.name)
				? [path.relative(ROOT_DIR, full)]
				: [];
		});
}

// Every finding in the checked files, and the fixed text of each flagged line
// ({file, line} → fixed), for the review
function findPlaceholders() {
	const files = DIFF
		? [...DIFF.keys()].filter(
				file => file.startsWith('docs/') && /\.mdx?$/.test(file)
			)
		: listDocsFiles();
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

function groupByFile(findings) {
	const byFile = new Map();
	for (const finding of findings) {
		if (!byFile.has(finding.file)) {
			byFile.set(finding.file, []);
		}
		byFile.get(finding.file).push(finding);
	}
	return byFile;
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

function linkTo(text, url) {
	return url ? `[${text}](${url})` : text;
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
		// ?plain=1 opens GitHub's code view, where #L<n> anchors work; the rendered
		// Markdown preview ignores them
		const fileUrl = LINK_BASE && `${LINK_BASE}/${file}?plain=1`;
		lines.push(linkTo(`**\`${file}\`**`, fileUrl));
		for (const {line, placeholder, recommended} of fileFindings) {
			lines.push(
				`- ${linkTo(`line ${line}`, fileUrl && `${fileUrl}#L${line}`)}: ` +
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

const FORMATTERS = {
	text: formatText,
	json: findings => JSON.stringify(findings, null, '\t') + '\n',
	markdown: formatMarkdown
};

function main() {
	const format = FORMATTERS[FORMAT];
	if (!format) {
		throw new Error(
			`Unknown --format "${FORMAT}"; use text, json, or markdown`
		);
	}
	const {findings, fixedLines} = findPlaceholders();
	if (REVIEW_FILE) {
		fs.writeFileSync(
			REVIEW_FILE,
			JSON.stringify(reviewRequest(findings, fixedLines), null, '\t') +
				'\n'
		);
	}
	process.stdout.write(format(findings));
	process.exit(findings.length === 0 ? 0 : 1);
}

main();
