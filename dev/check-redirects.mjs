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

const REDIRECTS_PATH = 'src/data/redirects.ts';
const REDIRECTS_FILE = path.join(ROOT_DIR, REDIRECTS_PATH);
const CONSTANTS_FILE = path.join(ROOT_DIR, 'src/data/constants.ts');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
// Report sections, most urgent first: a shadowed page is unreachable today.
// `fix` teaches the author what a correct entry looks like, where it applies.
const PROBLEM = {
	shadowsPage: {
		heading: 'Source overshadows a docs page that already exists',
		fix: 'Visitors to that page are redirected away from it. Remove the redirect, or rename the page.'
	},
	fragmentSource: {
		heading: 'Source has a #fragment, so this redirect can never match',
		fix:
			'Browsers never send the #fragment to the server. Use the page path alone as the source; ' +
			"when the destination has no #fragment, the browser keeps the visitor's own."
	},
	duplicateSource: {
		heading:
			'Source already has an earlier entry, so this one is never used',
		fix: 'Only the first entry for a source matches. Update that entry instead of adding another.'
	},
	chained: {
		heading: 'Destination is another redirect',
		fix: 'Point straight at the final page (named after each line); every hop costs the visitor a round trip.'
	},
	missingPage: {
		heading: 'Destination page does not exist',
		fix:
			'Point at the page that replaced it, or remove the entry if there is no replacement ' +
			'(visitors then get the 404 page).'
	},
	missingHeading: {
		heading: 'Destination heading does not exist',
		fix: "Use the heading's current slug, or drop the #fragment to land at the top of the page."
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

	// Line number of each entry, for the report. Entries are written one
	// `source:` per line; if that assumption fails, omit line numbers.
	const lines = source.split('\n');
	const arrayEnd = lines.findIndex(line => /^\];?\s*$/.test(line));
	const sourceLines = [];
	lines.slice(0, arrayEnd).forEach((line, index) => {
		if (/^\s*source:/.test(line)) sourceLines.push(index + 1);
	});
	const haveLines = sourceLines.length === sandbox.result.length;

	return sandbox.result.map((redirect, index) => ({
		source: redirect.source,
		destination: redirect.destination,
		line: haveLines ? sourceLines[index] : undefined
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

// Every incorrect redirect: [{ source, destination, line, problem, detail? }]
function findBrokenRedirects(redirects, headingsByRoute) {
	const findings = [];
	const firstBySource = new Map();
	for (const redirect of redirects) {
		if (!firstBySource.has(redirect.source))
			firstBySource.set(redirect.source, redirect);
	}
	const report = (redirect, problem, detail) =>
		findings.push({...redirect, problem: problem.heading, detail});
	const isRedirect = pathname =>
		firstBySource.has(pathname) && !headingsByRoute.has(pathname);

	for (const redirect of redirects) {
		if (firstBySource.get(redirect.source) !== redirect) {
			report(redirect, PROBLEM.duplicateSource);
			continue;
		}
		const source = splitUrl(redirect.source);
		if (source.fragment) {
			report(redirect, PROBLEM.fragmentSource);
			continue;
		}
		if (headingsByRoute.has(source.pathname)) {
			report(redirect, PROBLEM.shadowsPage);
		}
		if (isExternal(redirect.destination)) continue;

		const destination = splitUrl(redirect.destination);
		if (isRedirect(destination.pathname)) {
			report(
				redirect,
				PROBLEM.chained,
				finalDestination(destination.pathname)
			);
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
			report(redirect, PROBLEM.missingHeading);
		}
	}

	// Where a visitor to `pathname` finally lands, e.g. "ends at /new-page"
	function finalDestination(pathname) {
		const visited = new Set();
		while (isRedirect(pathname) && !visited.has(pathname)) {
			visited.add(pathname);
			pathname = firstBySource.get(pathname).destination;
			if (isExternal(pathname)) return `ends at ${pathname}`;
			pathname = splitUrl(pathname).pathname;
		}
		return visited.has(pathname) ? 'redirect loop' : `ends at ${pathname}`;
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

function formatText(findings) {
	const scope = BASELINE_FILE ? 'broken by this change' : 'broken';
	if (findings.length === 0) {
		return `✅ No redirects ${scope}\n`;
	}
	const lines = [`❌ ${findings.length} redirect(s) ${scope}:`, ''];
	for (const {source, destination, line, problem, detail} of findings) {
		lines.push(
			`  ${REDIRECTS_PATH}${line ? `:${line}` : ''}`,
			`    ${source} -> ${destination}`,
			`    ${problem}${detail ? ` (${detail})` : ''}`,
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
		'Redirects are used so external traffic (links inside old versions of our product, ' +
			'bookmarks, search results, etc.) to old URLs still reaches a relevant page.',
		'',
		'A correct entry maps the old page path, exactly as the browser requests it, ' +
			'straight to a page that exists today, with an optional #heading that exists on that page:',
		'',
		'```ts',
		'{',
		"\tsource: '/old/section/page',",
		"\tdestination: '/new/section/page#heading-slug'",
		'},',
		'```',
		'',
		'Each section below says how to fix the entries listed under it.',
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
		for (const {source, destination, line, detail} of entries) {
			const where = line
				? linkTo(`line ${line}`, fileUrl && `${fileUrl}#L${line}`)
				: 'entry';
			lines.push(
				`- ${where}${detail ? `: ${detail}` : ''}`,
				'  ```ts',
				`  source: '${source}',`,
				`  destination: '${destination}'`,
				'  ```'
			);
		}
	}
	lines.push(
		'',
		'Reproduce locally with `pnpm check-redirects` (see `dev/check-redirects.mjs`)'
	);
	return lines.join('\n') + '\n';
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

	process.stdout.write(format(findings));
	process.exit(findings.length === 0 ? 0 : 1);
}

main();
