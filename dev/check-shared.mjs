/**
 * What the dev/check-*.mjs scripts have in common: the flags they all take,
 * the unified diff of the change under review, the Markdown links in their
 * reports, and how they write their output. See .github/actions/pr-check.
 *
 * Flags read here:
 *   --format <name>      Output as text (default), json, or markdown
 *   --link-base <url>    Markdown output links each file path to <url>/<path>,
 *                        e.g. https://github.com/sourcegraph/docs/blob/<branch>
 *   --review <file>      Write a GitHub pull request review (JSON body for
 *                        POST /repos/{owner}/{repo}/pulls/{n}/reviews)
 */

import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);

// The value after a `--flag`, or undefined
export function flagValue(name) {
	const index = args.indexOf(name);
	return index === -1 ? undefined : args[index + 1];
}

export const LINK_BASE = flagValue('--link-base')?.replace(/\/$/, '');

// Added lines of a unified diff, by path relative to the repository:
// Map<'docs/foo.mdx', Set<lineNumber>>. Works with any amount of context, so
// `git diff` and `git diff -U0` both do.
export function parseDiff(file) {
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

// Sorted relative paths of every file under dir, optionally limited to some
// extensions. Sorted so foo.mdx precedes foo/index.mdx; when both exist the
// site serves the first match (allPosts.find), so the first file owns the route.
export function listFiles(dir, extensions) {
	if (!fs.existsSync(dir)) return [];
	return fs
		.readdirSync(dir, {recursive: true, withFileTypes: true})
		.filter(
			entry =>
				entry.isFile() &&
				(!extensions || extensions.includes(path.extname(entry.name)))
		)
		.map(entry =>
			path.relative(dir, path.join(entry.parentPath, entry.name))
		)
		.sort();
}

// Sorted paths of the .md and .mdx files under docs/, relative to the
// repository: 'docs/foo.mdx'
export function listDocsFiles(rootDir) {
	return listFiles(path.join(rootDir, 'docs'), ['.md', '.mdx']).map(file =>
		path.join('docs', file)
	);
}

// The findings absent from a --baseline file, matched by key
export function withoutBaseline(findings, baselineFile, findingKey) {
	const baseline = new Set(
		JSON.parse(fs.readFileSync(baselineFile, 'utf-8')).map(findingKey)
	);
	return findings.filter(finding => !baseline.has(findingKey(finding)));
}

export function groupByFile(findings) {
	const byFile = new Map();
	for (const finding of findings) {
		if (!byFile.has(finding.file)) {
			byFile.set(finding.file, []);
		}
		byFile.get(finding.file).push(finding);
	}
	return byFile;
}

export function linkTo(text, url) {
	return url ? `[${text}](${url})` : text;
}

// Where a file is on GitHub under --link-base, or undefined without it.
// ?plain=1 opens GitHub's code view, where #L<n> anchors work; the rendered
// Markdown preview ignores them
export function fileUrl(file) {
	return LINK_BASE && `${LINK_BASE}/${file}?plain=1`;
}

// Writes the review when --review asks for one, prints the findings in the
// --format asked for, and exits 1 when there are any. `review` builds the
// request body, only when needed.
export function report(findings, {text, markdown}, review) {
	const formatName = flagValue('--format') ?? 'text';
	const format = {
		text,
		json: items => JSON.stringify(items, null, '\t') + '\n',
		markdown
	}[formatName];
	if (!format) {
		throw new Error(
			`Unknown --format "${formatName}"; use text, json, or markdown`
		);
	}
	const reviewFile = flagValue('--review');
	if (reviewFile) {
		fs.writeFileSync(
			reviewFile,
			JSON.stringify(review(), null, '\t') + '\n'
		);
	}
	// Not process.exit(): that can truncate stdout when it is a pipe
	process.stdout.write(format(findings));
	process.exitCode = findings.length === 0 ? 0 : 1;
}
