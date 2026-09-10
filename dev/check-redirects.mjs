#!/usr/bin/env node

/**
 * Redirect check for src/data/redirects.ts.
 *
 * Redirects exist so external traffic to an old URL still reaches a page, so
 * each one must be correct. Checks, for every entry:
 * - the destination page exists under docs/ (or is a file under public/),
 *   following chains through other redirects
 * - when the destination has a #fragment, the heading exists on that page
 * - the source does not shadow an existing page (the middleware would redirect
 *   visitors away from a page that exists)
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
import { fileURLToPath } from 'url';
import { extractHeadings, listFiles, routeFor } from './check-links.mjs';

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
const MAX_CHAIN_HOPS = 10;

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
	const rssUrl = constants.match(/TECHNICAL_CHANGELOG_RSS_URL\s*=\s*['"]([^'"]+)['"]/)?.[1] ?? '';

	const script = source
		.replace(/^import .*$/gm, '')
		.replace(/^export const /gm, 'const ')
		.replace(/module\.exports\s*=\s*\{[\s\S]*?\};?/g, '');

	const sandbox = { TECHNICAL_CHANGELOG_RSS_URL: rssUrl };
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
		headingsByRoute.set(route, extractHeadings(fs.readFileSync(path.join(DOCS_DIR, file), 'utf-8')));
	}
	return headingsByRoute;
}

// '/foo/bar/?x=1#baz' -> { pathname: '/foo/bar', fragment: 'baz' }
function splitUrl(url) {
	const [pathAndQuery, fragment = ''] = url.split('#');
	const pathname = pathAndQuery.split('?')[0].replace(/\/+$/, '') || '/';
	return { pathname, fragment: decodeURIComponent(fragment) };
}

function isPublicFile(pathname) {
	const fullPath = path.join(PUBLIC_DIR, pathname);
	return fullPath.startsWith(PUBLIC_DIR) && fs.existsSync(fullPath);
}

function isExternal(url) {
	return /^https?:\/\//.test(url);
}

// Every incorrect redirect: [{ source, destination, line, problem }]
function findBrokenRedirects(redirects, headingsByRoute) {
	const findings = [];
	// Only the first entry for a source is reachable; later duplicates are
	// dead code and cannot break anything.
	const firstBySource = new Map();
	for (const redirect of redirects) {
		if (!firstBySource.has(redirect.source)) firstBySource.set(redirect.source, redirect);
	}
	const report = (redirect, problem) => findings.push({ ...redirect, problem });

	for (const redirect of redirects) {
		if (firstBySource.get(redirect.source) !== redirect) continue;

		const source = splitUrl(redirect.source);
		if (!source.fragment && headingsByRoute.has(source.pathname)) {
			report(redirect, 'source is an existing page; visitors to it are redirected away');
		}

		if (isExternal(redirect.destination)) continue;

		// Follow redirect chains to the page a visitor finally lands on
		let destination = splitUrl(redirect.destination);
		let hops = 0;
		const visited = new Set([redirect.source]);
		while (firstBySource.has(destination.pathname) && !headingsByRoute.has(destination.pathname)) {
			if (visited.has(destination.pathname) || ++hops > MAX_CHAIN_HOPS) {
				report(redirect, `redirect loop or chain longer than ${MAX_CHAIN_HOPS} hops`);
				destination = undefined;
				break;
			}
			visited.add(destination.pathname);
			const next = firstBySource.get(destination.pathname).destination;
			if (isExternal(next)) {
				destination = undefined;
				break;
			}
			const nextUrl = splitUrl(next);
			// A hop without its own fragment keeps the fragment we have
			destination = { pathname: nextUrl.pathname, fragment: nextUrl.fragment || destination.fragment };
		}
		if (!destination) continue;

		const headings = headingsByRoute.get(destination.pathname);
		if (!headings) {
			if (!isPublicFile(destination.pathname)) {
				report(redirect, `destination page ${destination.pathname} does not exist`);
			}
			continue;
		}
		if (destination.fragment && !headings.has(destination.fragment)) {
			report(redirect, `heading #${destination.fragment} not found on ${destination.pathname}`);
		}
	}
	return findings;
}

// Line numbers are left out so an entry that only moved is not a new finding
function findingKey(finding) {
	return `${finding.source}\u0000${finding.destination}\u0000${finding.problem}`;
}

function withoutBaseline(findings, baselineFile) {
	const baseline = new Set(JSON.parse(fs.readFileSync(baselineFile, 'utf-8')).map(findingKey));
	return findings.filter(finding => !baseline.has(findingKey(finding)));
}

function formatText(findings) {
	const scope = BASELINE_FILE ? 'broken by this change' : 'broken';
	if (findings.length === 0) {
		return `✅ No redirects ${scope}\n`;
	}
	const lines = [`❌ ${findings.length} redirect(s) ${scope}:`, ''];
	for (const { source, destination, line, problem } of findings) {
		lines.push(
			`  ${REDIRECTS_PATH}${line ? `:${line}` : ''}`,
			`    ${source} -> ${destination}`,
			`    ${problem}`,
			''
		);
	}
	return lines.join('\n');
}

function linkTo(text, url) {
	return url ? `[${text}](${url})` : text;
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
		'Redirects exist so external traffic (search results, bookmarks) to an old URL ' +
			'still reaches a page. Each one must point at a page and heading that exist, ' +
			'and must not shadow a page that exists.',
		'',
		'- If this PR moved or renamed the redirect destination, then update the ' +
			'redirect with the updated destination',
		'',
		'- If this PR removed the destination, then either update the destination to ' +
			'the next most relevant page, or remove it to leave the user with our 404 page',
		'',
		'Redirects are not to be used for internal links (tech debt snowball), internal ' +
			'links must be fixed; the "Check links" comment lists any this PR broke.',
		'',
		'| Line | Source | Destination | Problem |',
		'| --- | --- | --- | --- |'
	];
	for (const { source, destination, line, problem } of findings) {
		const lineCell = line ? linkTo(line, fileUrl && `${fileUrl}#L${line}`) : '';
		lines.push(`| ${lineCell} | \`${source}\` | \`${destination}\` | ${problem} |`);
	}
	lines.push('', 'Reproduce locally with `pnpm check-redirects` (see `dev/check-redirects.mjs`).');
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
		throw new Error(`Unknown --format "${FORMAT}"; use text, json, or markdown`);
	}

	let findings = findBrokenRedirects(loadRedirects(), buildHeadingsByRoute());
	if (BASELINE_FILE) {
		findings = withoutBaseline(findings, BASELINE_FILE);
	}

	process.stdout.write(format(findings));
	process.exit(findings.length === 0 ? 0 : 1);
}

main();
