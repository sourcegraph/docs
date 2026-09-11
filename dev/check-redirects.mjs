#!/usr/bin/env node

/**
 * Checks redirects in src/data/redirects.ts.
 *
 * Redirects exist so external traffic to an old URL still reaches a page, so
 * each one must be correct. Checks, for every entry:
 * - the source does not shadow an existing page (the middleware would redirect
 *   visitors away from a page that exists)
 * - the source has no #fragment: browsers never send fragments, so such an
 *   entry can never match
 * - the source has no earlier entry: the middleware uses the first match only
 * - neither path starts with /docs: the middleware strips that prefix from
 *   requests and adds it to destinations
 * - the destination is a page, not another redirect
 * - the destination page exists under docs/ (or is a file under public/)
 * - when the destination has a #fragment, the heading exists on that page
 *
 * External (http) destinations are not checked.
 *
 * Usage: node dev/check-redirects.mjs [options]
 *   --root <dir>           Repository to check (default: this repository)
 *   --format <name>        Output as text (default), json, or markdown
 *   --baseline <file>      Only report findings absent from this JSON file
 *                          (produced by --format json on another revision)
 *   --link-base <url>      Markdown output links each line to
 *                          <url>/src/data/redirects.ts, e.g.
 *                          https://github.com/sourcegraph/docs/blob/<branch>
 *   --diff <file>          `git diff` output; with --review, only entries this
 *                          diff added get a suggested change
 *   --review <file>        Write a pull request review with one suggested
 *                          change per fixable finding to this JSON file
 *
 * Exits 1 when any finding is reported.
 */

import fs from 'fs';
import path from 'path';
import vm from 'vm';
import {fileURLToPath} from 'url';
import {extractHeadings, listFiles, routeFor} from './check-links.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const ROOT_DIR = path.resolve(flagValue('--root') ?? path.dirname(__dirname));
const FORMAT = flagValue('--format') ?? 'text';
const BASELINE_FILE = flagValue('--baseline');
const LINK_BASE = flagValue('--link-base')?.replace(/\/$/, '');
const DIFF_FILE = flagValue('--diff');
const REVIEW_FILE = flagValue('--review');

const REDIRECTS_PATH = 'src/data/redirects.ts';
const REDIRECTS_FILE = path.join(ROOT_DIR, REDIRECTS_PATH);
const CONSTANTS_FILE = path.join(ROOT_DIR, 'src/data/constants.ts');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
// Report sections, most urgent first: a shadowed page is unreachable today.
// `fix` teaches the author what a correct entry looks like, where it applies.
const PROBLEM = {
	shadowsPage: {
		heading: 'Source overshadows a docs page that exists',
		fix:
			"Redirects take precedence over pages, so visitors to that page's URL are redirected away from it. " +
			'Update or remove the redirect or the page to remove the conflict.'
	},
	fragmentSource: {
		heading: 'Source has a #fragment, so this redirect can never match',
		fix:
			'Use the page path alone as the source. #fragments are processed in the browser, so browsers ' +
			'never send them to web servers.\n\n' +
			'If the redirect destination has a #fragment, it takes precedence, otherwise if the customer ' +
			"clicked a link which has a #fragment, it'll be kept and tried on the destination page."
	},
	docsPrefix: {
		heading: 'Source or destination starts with /docs',
		fix:
			'Write paths without the /docs prefix. The site removes /docs from the requested URL before ' +
			'matching sources, and adds it back in front of the destination, so a /docs/... source never ' +
			'matches and a /docs/... destination lands on /docs/docs/....'
	},
	duplicateSource: {
		heading:
			'Source already has an earlier entry, so this one is never used',
		fix: 'Only the first entry for a source matches. Update that entry instead of adding another.'
	},
	chained: {
		heading: 'Destination is another redirect',
		fix:
			"Chained redirects cost the customer's browser a round trip, slow down their page load time, " +
			'and frustrate them. They also make the redirects file impossible to maintain, and make it too ' +
			"easy to create redirect loops. Change the rule's destination to the final destination."
	},
	missingPage: {
		heading: 'Destination page does not exist',
		fix:
			'Set the redirect destination to the page that replaced it, or remove the rule if there is no replacement page; ' +
			"visitors then get our fancy 404 page, with links they can click to find where they're trying " +
			'to go, and the search bar.'
	},
	missingHeading: {
		heading: 'Destination heading does not exist',
		fix: "Use the heading's correct anchor, or drop the #fragment to land the customer at the top of the page."
	}
};

function flagValue(name) {
	const index = args.indexOf(name);
	return index === -1 ? undefined : args[index + 1];
}

// Load redirects.ts without a TypeScript toolchain. The file is plain data
// plus one import, so strip the module syntax and evaluate it.
// Returns [{ source, destination, line }].
function loadRedirects() {
	const source = fs.readFileSync(REDIRECTS_FILE, 'utf-8');
	const constants = fs.readFileSync(CONSTANTS_FILE, 'utf-8');
	const rssUrl =
		constants.match(
			/TECHNICAL_CHANGELOG_RSS_URL\s*=\s*['"]([^'"]+)['"]/
		)?.[1] ?? '';

	const script = source
		.replace(/^import .*$/gm, '')
		.replace(/^export const /gm, 'const ')
		.replace(/module\.exports\s*=\s*\{[\s\S]*?\};?/g, '');

	const sandbox = {TECHNICAL_CHANGELOG_RSS_URL: rssUrl};
	vm.runInNewContext(`${script}\nresult = updatedRedirectsData;`, sandbox);

	// Line numbers of each entry, for the report and suggested changes: the
	// `source:` line, plus the `{` and `}` lines around it. Entries are written
	// one `source:` per line; if that assumption fails, omit line numbers.
	const lines = source.split('\n');
	const arrayEnd = lines.findIndex(line => /^\];?\s*$/.test(line));
	const positions = [];
	lines.slice(0, arrayEnd).forEach((line, index) => {
		if (!/^\s*source:/.test(line)) return;
		let start = index;
		while (start > 0 && !/^\s*\{\s*$/.test(lines[start])) start--;
		let end = index;
		while (end < arrayEnd && !/^\s*\},?\s*$/.test(lines[end])) end++;
		positions.push({line: index + 1, startLine: start + 1, endLine: end + 1});
	});
	const havePositions = positions.length === sandbox.result.length;

	return sandbox.result.map((redirect, index) => ({
		source: redirect.source,
		destination: redirect.destination,
		...(havePositions ? positions[index] : {})
	}));
}

// Site route -> Set of anchors on that page. When foo.mdx and foo/index.mdx
// both exist the first (sorted) file owns the route, as in check-links.mjs.
function buildHeadingsByRoute() {
	const headingsByRoute = new Map();
	for (const file of listFiles(DOCS_DIR, ['.mdx'])) {
		const route = routeFor(file);
		if (headingsByRoute.has(route)) continue;
		headingsByRoute.set(
			route,
			extractHeadings(fs.readFileSync(path.join(DOCS_DIR, file), 'utf-8'))
		);
	}
	return headingsByRoute;
}

// '/foo/bar/?x=1#baz' -> { pathname: '/foo/bar', fragment: 'baz' }
function splitUrl(url) {
	const [pathAndQuery, fragment = ''] = url.split('#');
	const pathname = pathAndQuery.split('?')[0].replace(/\/+$/, '') || '/';
	return {pathname, fragment: decodeURIComponent(fragment)};
}

function isPublicFile(pathname) {
	const fullPath = path.join(PUBLIC_DIR, pathname);
	return fullPath.startsWith(PUBLIC_DIR) && fs.existsSync(fullPath);
}

function isExternal(url) {
	return /^https?:\/\//.test(url);
}

// Every incorrect redirect: [{ source, destination, line, problem, detail?, fix? }].
// `fix` is the entry that should replace this one, or {remove: true}, where the
// fix is mechanical; a shadowed page or missing destination needs a human.
function findBrokenRedirects(redirects, headingsByRoute) {
	const findings = [];
	const firstBySource = new Map();
	for (const redirect of redirects) {
		if (!firstBySource.has(redirect.source))
			firstBySource.set(redirect.source, redirect);
	}
	const report = (redirect, problem, {detail, fix} = {}) =>
		findings.push({...redirect, problem: problem.heading, detail, fix});
	const withoutFragment = url => url.split('#')[0];
	const withoutDocsPrefix = url => url.replace(/^\/docs(?=\/)/, '');
	const isRedirect = pathname =>
		firstBySource.has(pathname) && !headingsByRoute.has(pathname);

	for (const redirect of redirects) {
		const source = splitUrl(redirect.source);
		if (source.fragment) {
			// Another entry may already cover the source without its fragment
			const fix = firstBySource.has(withoutFragment(redirect.source))
				? {remove: true}
				: {source: withoutFragment(redirect.source), destination: redirect.destination};
			report(redirect, PROBLEM.fragmentSource, {fix});
			continue;
		}
		if (firstBySource.get(redirect.source) !== redirect) {
			report(redirect, PROBLEM.duplicateSource, {fix: {remove: true}});
			continue;
		}
		if (headingsByRoute.has(source.pathname)) {
			report(redirect, PROBLEM.shadowsPage);
		}
		if (
			source.pathname.startsWith('/docs/') ||
			redirect.destination.startsWith('/docs/')
		) {
			report(redirect, PROBLEM.docsPrefix, {
				fix: {
					source: withoutDocsPrefix(redirect.source),
					destination: withoutDocsPrefix(redirect.destination)
				}
			});
			continue;
		}
		if (isExternal(redirect.destination)) continue;

		const destination = splitUrl(redirect.destination);
		if (isRedirect(destination.pathname)) {
			const final = finalDestination(destination.pathname);
			report(redirect, PROBLEM.chained, {
				detail: final ?? 'none, redirect loop',
				fix: final && {source: redirect.source, destination: final}
			});
			continue;
		}
		const headings = headingsByRoute.get(destination.pathname);
		if (!headings) {
			if (!isPublicFile(destination.pathname)) {
				report(redirect, PROBLEM.missingPage);
			}
			continue;
		}
		if (destination.fragment && !headings.has(destination.fragment)) {
			report(redirect, PROBLEM.missingHeading, {
				fix: {source: redirect.source, destination: destination.pathname}
			});
		}
	}

	// Where a visitor to `pathname` finally lands; undefined for a redirect loop
	function finalDestination(pathname) {
		const visited = new Set();
		while (isRedirect(pathname) && !visited.has(pathname)) {
			visited.add(pathname);
			pathname = firstBySource.get(pathname).destination;
			if (isExternal(pathname)) return pathname;
			pathname = splitUrl(pathname).pathname;
		}
		return visited.has(pathname) ? undefined : pathname;
	}
	return findings;
}

// Line numbers are left out so an entry that only moved is not a new finding
function findingKey(finding) {
	return `${finding.source}\u0000${finding.destination}\u0000${finding.problem}`;
}

function withoutBaseline(findings, baselineFile) {
	const baseline = new Set(
		JSON.parse(fs.readFileSync(baselineFile, 'utf-8')).map(findingKey)
	);
	return findings.filter(finding => !baseline.has(findingKey(finding)));
}

// 'remove this entry', or which of source and destination to change to what
function describeFix({source, destination, fix}) {
	if (fix.remove) return 'remove this entry';
	const changes = [
		...(fix.source !== source ? [`the source to \`${fix.source}\``] : []),
		...(fix.destination !== destination
			? [`the destination to \`${fix.destination}\``]
			: [])
	];
	return `change ${changes.join(' and ')}`;
}

function formatText(findings) {
	const scope = BASELINE_FILE ? 'broken by this change' : 'broken';
	if (findings.length === 0) {
		return `✅ No redirects ${scope}\n`;
	}
	const lines = [`❌ ${findings.length} redirect(s) ${scope}:`, ''];
	for (const finding of findings) {
		const {source, destination, line, problem, detail, fix} = finding;
		lines.push(
			`  ${REDIRECTS_PATH}${line ? `:${line}` : ''}`,
			`    ${source} -> ${destination}`,
			`    ${problem}${detail ? ` (final destination: ${detail})` : ''}`,
			...(fix ? [`    Fix: ${describeFix(finding).replaceAll('`', '')}`] : []),
			''
		);
	}
	return lines.join('\n');
}

function linkTo(text, url) {
	return url ? `[${text}](${url})` : text;
}

// Map of problem heading -> its findings in line order, sections in PROBLEM order
function groupByProblem(findings) {
	const groups = new Map(
		Object.values(PROBLEM).map(({heading}) => [heading, []])
	);
	for (const finding of findings) groups.get(finding.problem).push(finding);
	for (const [problem, entries] of groups) {
		if (entries.length === 0) groups.delete(problem);
		else entries.sort((a, b) => (a.line ?? 0) - (b.line ?? 0));
	}
	return groups;
}

// Body for a pull request comment
function formatMarkdown(findings) {
	if (findings.length === 0) {
		return '### ✅ This PR breaks no redirects\n';
	}

	// ?plain=1 opens GitHub's code view, where #L<n> anchors work
	const fileUrl = LINK_BASE && `${LINK_BASE}/${REDIRECTS_PATH}?plain=1`;
	const lines = [
		`### ❌ This PR breaks ${findings.length} redirect(s)`,
		'',
		'Redirects are used so inbound traffic from external sources (links inside old versions of ' +
			'our product, bookmarks, search results, etc.) to old doc pages still reaches a relevant page.',
		'',
		'A correct entry maps the old page path, exactly as the browser requests it, ' +
			'straight to a page that exists today, with an optional #heading that exists on the destination page:',
		'',
		'```ts',
		'{',
		"\tsource: '/old/section/page',",
		"\tdestination: '/new/section/page#heading-slug'",
		'},',
		'```',
		'',
		'Each section below explains how to fix the entries listed under it.',
		'',
		'Do not use redirects for broken internal links, internal links must be fixed ' +
			'properly to tame the tech debt snowball no one wants to deal with; the ' +
			'"Check links" PR check comment lists the links this PR broke, if any.',
		'',
		linkTo(`**\`${REDIRECTS_PATH}\`**`, fileUrl)
	];
	// One section per problem with its fix. Each entry is shown as it appears
	// in the redirects file, so it is easy to find there.
	const fixes = new Map(
		Object.values(PROBLEM).map(({heading, fix}) => [heading, fix])
	);
	for (const [problem, entries] of groupByProblem(findings)) {
		lines.push('', `#### ${problem}`, '', fixes.get(problem), '');
		for (const finding of entries) {
			const {source, destination, line, detail, fix} = finding;
			const where = line
				? linkTo(`line ${line}`, fileUrl && `${fileUrl}#L${line}`)
				: 'entry';
			lines.push(
				`- ${where}`,
				'  ```ts',
				`  source: '${source}',`,
				`  destination: '${destination}'`,
				...(detail ? [`  final destination: ${detail}`] : []),
				'  ```',
				...(fix ? [`  Fix: ${describeFix(finding)}`] : [])
			);
		}
	}
	lines.push(
		'',
		'Reproduce locally with `node dev/check-redirects.mjs`'
	);
	return lines.join('\n') + '\n';
}

// Line numbers `git diff` output added to redirects.ts
function addedLines(diffFile) {
	const added = new Set();
	let inRedirects = false;
	let lineNumber;
	for (const line of fs.readFileSync(diffFile, 'utf-8').split('\n')) {
		if (line.startsWith('+++ ')) {
			inRedirects = line === `+++ b/${REDIRECTS_PATH}`;
		} else if (line.startsWith('@@ ')) {
			lineNumber = Number(line.match(/^@@ -\S+ \+(\d+)/)[1]);
		} else if (inRedirects && line.startsWith('+')) {
			added.add(lineNumber++);
		} else if (inRedirects && line.startsWith(' ')) {
			lineNumber++;
		}
	}
	return added;
}

// First line of a review comment, so the workflow can match the comments it
// posted earlier to the findings still present and delete the rest
const REVIEW_MARKER = '<!-- check-redirects-finding:';

// Body for POST /repos/{owner}/{repo}/pulls/{n}/reviews: one suggested change
// per fixable finding whose entry this PR added, replacing the whole entry
// (or deleting it). Review comments must sit on lines of the diff, hence the
// added-lines restriction. No review body: a submitted review cannot be
// deleted, so a body would outlive the comments once the entries are fixed.
function reviewRequest(findings, added) {
	const sourceLines = fs.readFileSync(REDIRECTS_FILE, 'utf-8').split('\n');
	const lineNumbers = (start, end) =>
		Array.from({length: end - start + 1}, (_, offset) => start + offset);
	const comments = findings
		.filter(
			({fix, startLine, endLine}) =>
				fix && startLine && lineNumbers(startLine, endLine).every(line => added.has(line))
		)
		.map(finding => {
			const {source, destination, problem, fix, startLine, endLine} = finding;
			const indent = sourceLines[startLine - 1].match(/^\s*/)[0];
			const comma = sourceLines[endLine - 1].trimEnd().endsWith(',') ? ',' : '';
			const entry = fix.remove
				? []
				: [
						`${indent}{`,
						`${indent}\tsource: '${fix.source}',`,
						`${indent}\tdestination: '${fix.destination}'`,
						`${indent}}${comma}`
					];
			const body = [
				`${REVIEW_MARKER} ${source} -> ${destination} -->`,
				`Problem: ${problem}`,
				`Fix: ${describeFix(finding)}`,
				'````suggestion',
				...entry,
				'````'
			];
			return {
				path: REDIRECTS_PATH,
				...(startLine !== endLine && {start_line: startLine, start_side: 'RIGHT'}),
				line: endLine,
				side: 'RIGHT',
				body: body.join('\n')
			};
		});
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

	let findings = findBrokenRedirects(loadRedirects(), buildHeadingsByRoute());
	if (BASELINE_FILE) {
		findings = withoutBaseline(findings, BASELINE_FILE);
	}

	if (REVIEW_FILE) {
		const added = DIFF_FILE ? addedLines(DIFF_FILE) : new Set();
		fs.writeFileSync(
			REVIEW_FILE,
			JSON.stringify(reviewRequest(findings, added), null, '\t') + '\n'
		);
	}

	// Not process.exit(): that can truncate stdout when it is a pipe
	process.stdout.write(format(findings));
	process.exitCode = findings.length === 0 ? 0 : 1;
}

main();
