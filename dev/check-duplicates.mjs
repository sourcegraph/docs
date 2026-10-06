#!/usr/bin/env node

/**
 * Reports passages under docs/ that say the same thing in more than one place.
 *
 * Each fact should have one home, with other pages linking to it: a copy
 * drifts out of date the moment the original changes. This finds the copies.
 * Every paragraph, list, table, and fenced code block is normalized
 * (lowercase; Markdown, JSX, and link targets stripped; words only) and
 * compared with every other by the Jaccard similarity of their word trigrams,
 * so paraphrases are caught, not only verbatim copies. Passages shorter than
 * --min-words are skipped, as are the auto-generated SCHEMA_SYNC blocks: fix
 * those upstream.
 *
 * The pull request workflow (.github/workflows/check-duplicates.yml) runs this
 * with --baseline and --diff, so a PR hears only about duplication it adds; it
 * never fails the PR. main has hundreds of pre-existing findings.
 *
 * Usage: node dev/check-duplicates.mjs [options]
 *   --root <dir>         Repository to check (default: this repository)
 *   --threshold <0-1>    Report pairs at least this similar (default: 0.5)
 *   --min-words <n>      Skip passages with fewer words (default: 20)
 *   --format <name>      Output as text (default), json, or markdown
 *   --baseline <file>    Only report pairs absent from this JSON file (produced
 *                        by --format json on another revision). Pairs are
 *                        matched by the file and heading of each passage, so
 *                        editing a pre-existing duplicate does not report it
 *   --diff <file>        Unified diff, e.g. from `git diff -U0 origin/main`;
 *                        only report pairs where a passage has an added line
 *   --link-base <url>    Markdown output links each passage to <url>/<path>,
 *                        e.g. https://github.com/sourcegraph/docs/blob/<branch>
 *   --review <file>      Write a GitHub pull request review (JSON body for
 *                        POST /repos/{owner}/{repo}/pulls/{n}/reviews) with one
 *                        comment per added passage that duplicates another.
 *                        Requires --diff
 *
 * Exits 1 when any finding is reported.
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const args = process.argv.slice(2);
const ROOT_DIR = path.resolve(
	flagValue('--root') ??
		path.dirname(path.dirname(fileURLToPath(import.meta.url)))
);
const DOCS_DIR = path.join(ROOT_DIR, 'docs');
const THRESHOLD = Number(flagValue('--threshold') ?? 0.5);
const MIN_WORDS = Number(flagValue('--min-words') ?? 20);
const FORMAT = flagValue('--format') ?? 'text';
const BASELINE_FILE = flagValue('--baseline');
const DIFF = parseDiff(flagValue('--diff'));
const LINK_BASE = flagValue('--link-base')?.replace(/\/$/, '');
const REVIEW_FILE = flagValue('--review');

// Pages the `🤖 Sync generated docs` PRs overwrite whole (see AGENTS.md); their
// repetition is the generator's, and is fixed in sourcegraph/sourcegraph
const GENERATED_PAGES = [
	'docs/admin/telemetry/',
	'docs/ai/models.mdx',
	'docs/cli/references/',
	'docs/cody/capabilities/supported-models.mdx',
	'docs/self-hosted/observability/alerts.mdx',
	'docs/self-hosted/observability/dashboards.mdx'
];

const SHINGLE_SIZE = 3;
// A trigram in more passages than this is boilerplate ("in the site
// configuration"), so it does not nominate candidate pairs
const MAX_POSTINGS = 50;
const SNIPPET_LENGTH = 90;

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

// Sorted relative paths of the .md and .mdx files under docs/ that are
// written by hand
function listDocsFiles(dir = DOCS_DIR) {
	return fs
		.readdirSync(dir, {withFileTypes: true})
		.sort((a, b) => a.name.localeCompare(b.name))
		.flatMap(entry => {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) return listDocsFiles(full);
			const file = path.relative(ROOT_DIR, full);
			return /\.mdx?$/.test(entry.name) &&
				!GENERATED_PAGES.some(prefix => file.startsWith(prefix))
				? [file]
				: [];
		});
}

// The words of a passage, lowercased, without Markdown, JSX, MDX comments,
// link targets, or URLs, so the same sentence formatted two ways compares equal
function words(text) {
	return (
		text
			.toLowerCase()
			.replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
			.replace(/<[^>]*>/g, ' ')
			.replace(/\]\([^)]*\)/g, ']')
			.replace(/https?:\/\/\S+/g, ' ')
			.match(/[a-z0-9]+/g) ?? []
	);
}

function shingles(wordList) {
	const set = new Set();
	for (let index = 0; index + SHINGLE_SIZE <= wordList.length; index++) {
		set.add(wordList.slice(index, index + SHINGLE_SIZE).join(' '));
	}
	return set;
}

// The start of a passage for the report: without code fences, MDX comments,
// or JSX tags, since a snippet of `<Callout type="warning">` identifies
// nothing, and without backticks, since a cut-off one would swallow the rest
// of a Markdown line
function snippet(text) {
	const content = text
		.replace(/^\s*(`{3,}|~{3,}).*$/gm, ' ')
		.replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
		.replace(/<[^>]*>/g, ' ')
		.replace(/`/g, '')
		.replace(/\s+/g, ' ')
		.trim();
	return content.length > SNIPPET_LENGTH
		? content.slice(0, SNIPPET_LENGTH - 1) + '…'
		: content;
}

// The passages of one file that are long enough to compare:
// [{file, line, endLine, heading, snippet, shingles}]. A passage is a run of
// non-blank lines (paragraph, list, or table) or a fenced code block. Front
// matter, headings, imports, and SCHEMA_SYNC blocks are not passages; the
// heading is kept to identify the passage across revisions.
function extractPassages(file, source) {
	const lines = source.split('\n');
	const passages = [];
	let heading = '';
	let inSchemaSync = false;
	let fence; // the ``` or ~~~ that opened the code block being collected
	let start; // index of the first line being collected
	let collected = [];

	const flush = () => {
		const text = collected.join('\n');
		const wordList = words(text);
		if (
			wordList.length >= MIN_WORDS &&
			!/^\s*(import|export)\s/.test(text)
		) {
			passages.push({
				file,
				line: start + 1,
				endLine: start + collected.length,
				heading,
				snippet: snippet(text),
				shingles: shingles(wordList)
			});
		}
		collected = [];
	};

	let index = lines[0] === '---' ? lines.indexOf('---', 1) + 1 : 0;
	for (; index < lines.length; index++) {
		const text = lines[index];
		if (fence) {
			collected.push(text);
			if (text.trim().startsWith(fence)) {
				fence = undefined;
				flush();
			}
			continue;
		}
		if (text.includes('SCHEMA_SYNC_START')) inSchemaSync = true;
		if (text.includes('SCHEMA_SYNC_END')) inSchemaSync = false;
		if (inSchemaSync) continue;

		const fenceMatch = text.match(/^\s*(`{3,}|~{3,})/);
		const headingMatch = text.match(/^#{1,6}\s+(.*)/);
		// A list item is its own passage, so one step copied between two
		// procedures is found; its indented continuation lines stay with it
		const listItem = /^\s*(?:[-*+]|\d+\.)\s/.test(text);
		if (fenceMatch || headingMatch || listItem || text.trim() === '')
			flush();
		if (fenceMatch) {
			fence = fenceMatch[1];
			start = index;
			collected.push(text);
		} else if (headingMatch) {
			heading = headingMatch[1].trim();
		} else if (text.trim() !== '') {
			if (collected.length === 0) start = index;
			collected.push(text);
		}
	}
	flush();
	return passages;
}

function jaccard(a, b) {
	const [small, big] = a.size <= b.size ? [a, b] : [b, a];
	let intersection = 0;
	for (const shingle of small) {
		if (big.has(shingle)) intersection++;
	}
	return intersection / (a.size + b.size - intersection);
}

// Every pair of passages at least THRESHOLD similar: [{similarity, a, b}],
// with a before b in file order. Candidates come from an inverted index of
// trigrams, so only passages that share an uncommon trigram are compared.
function findDuplicatePairs(passages) {
	const index = new Map();
	passages.forEach((passage, id) => {
		for (const shingle of passage.shingles) {
			if (!index.has(shingle)) index.set(shingle, []);
			index.get(shingle).push(id);
		}
	});

	const pairs = [];
	passages.forEach((a, aId) => {
		const candidates = new Set();
		for (const shingle of a.shingles) {
			const ids = index.get(shingle);
			if (ids.length > MAX_POSTINGS) continue;
			for (const bId of ids) {
				if (bId > aId) candidates.add(bId);
			}
		}
		for (const bId of candidates) {
			const b = passages[bId];
			// Jaccard cannot exceed the size ratio, so skip hopeless pairs
			const [small, big] =
				a.shingles.size <= b.shingles.size
					? [a.shingles.size, b.shingles.size]
					: [b.shingles.size, a.shingles.size];
			if (small / big < THRESHOLD) continue;
			const similarity = jaccard(a.shingles, b.shingles);
			if (similarity >= THRESHOLD) pairs.push({similarity, a, b});
		}
	});
	return pairs;
}

// The passage without its shingles, for the JSON output and the baseline
function describe({shingles: _, ...passage}) {
	return passage;
}

// Line numbers are left out so a passage that only moved is not a new finding
function passageKey({file, heading}) {
	return `${file}#${heading}`;
}

function pairKey({a, b}) {
	return [passageKey(a), passageKey(b)].sort().join('\u0000');
}

function withoutBaseline(pairs, baselineFile) {
	const baseline = new Set(
		JSON.parse(fs.readFileSync(baselineFile, 'utf-8')).map(pairKey)
	);
	return pairs.filter(pair => !baseline.has(pairKey(pair)));
}

// The first line of the passage that the diff added, or undefined
function addedLineIn({file, line, endLine}) {
	const added = DIFF?.get(file);
	if (!added) return undefined;
	for (let current = line; current <= endLine; current++) {
		if (added.has(current)) return current;
	}
	return undefined;
}

// Passages joined by a reported pair, grouped: [{passages, similarity}] with
// passages in file order and `similarity` the weakest link in the group,
// biggest groups first
function clusters(pairs) {
	const parent = new Map();
	const find = passage => {
		while (parent.has(passage) && parent.get(passage) !== passage) {
			passage = parent.get(passage);
		}
		return passage;
	};
	for (const {a, b} of pairs) {
		parent.set(find(a), find(b));
	}

	const groups = new Map();
	for (const pair of pairs) {
		const root = find(pair.a);
		if (!groups.has(root)) {
			groups.set(root, {passages: new Set(), similarity: 1});
		}
		const group = groups.get(root);
		group.passages.add(pair.a).add(pair.b);
		group.similarity = Math.min(group.similarity, pair.similarity);
	}

	return [...groups.values()]
		.map(({passages, similarity}) => ({
			similarity,
			passages: [...passages].sort(
				(a, b) => a.file.localeCompare(b.file) || a.line - b.line
			)
		}))
		.sort(
			(a, b) =>
				b.passages.length - a.passages.length ||
				b.similarity - a.similarity
		);
}

function percent(similarity) {
	return `${Math.round(similarity * 100)}%`;
}

function location({file, line, endLine}) {
	return `${file}:${line}${endLine > line ? `-${endLine}` : ''}`;
}

function formatText(pairs) {
	const scope = BASELINE_FILE || DIFF ? 'new ' : '';
	if (pairs.length === 0) {
		return `✅ No ${scope}duplicated passages found!\n`;
	}
	const groups = clusters(pairs);
	const lines = [
		`❌ Found ${pairs.length} ${scope}duplicated pair(s) of passages in ${groups.length} group(s):`
	];
	for (const {passages, similarity} of groups) {
		lines.push(
			'',
			`${passages.length} passages at least ${percent(similarity)} similar:`
		);
		for (const passage of passages) {
			lines.push(`   ${location(passage)}`, `   └─ ${passage.snippet}`);
		}
	}
	return lines.join('\n') + '\n';
}

function linkTo(text, url) {
	return url ? `[${text}](${url})` : text;
}

// ?plain=1 opens GitHub's code view, where #L<n> anchors work; the rendered
// Markdown preview ignores them
function passageLink(passage) {
	const {file, line, endLine} = passage;
	const anchor = endLine > line ? `#L${line}-L${endLine}` : `#L${line}`;
	return linkTo(
		`\`${location(passage)}\``,
		LINK_BASE && `${LINK_BASE}/${file}?plain=1${anchor}`
	);
}

const CONVENTION =
	'Each fact has one home in the docs. Keep the passage on the page that owns ' +
	'the topic, and replace the others with a sentence and a link to it, so they ' +
	'cannot drift apart. Before writing a config snippet, search `docs/` for the ' +
	'key and link to the existing one.';

// Body for a pull request comment
function formatMarkdown(pairs) {
	if (pairs.length === 0) {
		return '### ✅ This revision adds no duplicated passages\n';
	}
	const groups = clusters(pairs);
	const lines = [
		`### ⚠️ This PR adds ${pairs.length} duplicated pair(s) of passages`,
		'',
		'Only passages this PR added are listed, with the places that already say ' +
			'the same thing; duplication already on the base branch is not. ' +
			'Each added passage also has an inline comment.',
		''
	];
	for (const {passages, similarity} of groups) {
		lines.push(
			`**${passages.length} passages, at least ${percent(similarity)} similar**`,
			...passages.map(
				passage => `- ${passageLink(passage)}: ${passage.snippet}`
			),
			''
		);
	}
	lines.push(
		CONVENTION,
		'',
		'Reproduce locally with `node dev/check-duplicates.mjs --diff <(git diff -U0 origin/main)`.'
	);
	return lines.join('\n') + '\n';
}

// First line of a review comment, so the workflow can match the comments it
// posted earlier to the findings still present and delete the rest
const REVIEW_MARKER = '<!-- check-duplicates-finding:';

// Body for POST /repos/{owner}/{repo}/pulls/{n}/reviews: one comment per added
// passage, on its first added line, naming the passages it duplicates. No
// review body: a submitted review cannot be deleted, so a body would outlive
// the comments once the duplication is gone.
function reviewRequest(pairs) {
	const partners = new Map(); // added passage → [{passage, similarity}]
	for (const {similarity, a, b} of pairs) {
		for (const [passage, partner] of [
			[a, b],
			[b, a]
		]) {
			if (addedLineIn(passage) === undefined) continue;
			if (!partners.has(passage)) partners.set(passage, []);
			partners.get(passage).push({passage: partner, similarity});
		}
	}
	const comments = [...partners].map(([passage, duplicates]) => ({
		path: passage.file,
		line: addedLineIn(passage),
		side: 'RIGHT',
		body: [
			`${REVIEW_MARKER} ${duplicates.map(({passage}) => passageKey(passage)).join(', ')} -->`,
			'This passage says the same thing as:',
			...duplicates.map(
				({passage, similarity}) =>
					`- ${passageLink(passage)} (${percent(similarity)} similar)`
			),
			'',
			CONVENTION
		].join('\n')
	}));
	return {event: 'COMMENT', body: '', comments};
}

const FORMATTERS = {
	text: formatText,
	json: pairs =>
		JSON.stringify(
			pairs.map(({similarity, a, b}) => ({
				similarity,
				a: describe(a),
				b: describe(b)
			})),
			null,
			'\t'
		) + '\n',
	markdown: formatMarkdown
};

function main() {
	const format = FORMATTERS[FORMAT];
	if (!format) {
		throw new Error(
			`Unknown --format "${FORMAT}"; use text, json, or markdown`
		);
	}

	const passages = listDocsFiles().flatMap(file =>
		extractPassages(
			file,
			fs.readFileSync(path.join(ROOT_DIR, file), 'utf-8')
		)
	);
	let pairs = findDuplicatePairs(passages);
	if (BASELINE_FILE) {
		pairs = withoutBaseline(pairs, BASELINE_FILE);
	}
	if (DIFF) {
		pairs = pairs.filter(
			({a, b}) =>
				addedLineIn(a) !== undefined || addedLineIn(b) !== undefined
		);
	}
	if (REVIEW_FILE) {
		fs.writeFileSync(
			REVIEW_FILE,
			JSON.stringify(reviewRequest(pairs), null, '\t') + '\n'
		);
	}

	// Not process.exit(): that can truncate stdout when it is a pipe
	process.stdout.write(format(pairs));
	process.exitCode = pairs.length === 0 ? 0 : 1;
}

main();
