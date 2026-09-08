#!/usr/bin/env node

/**
 * Broken redirect checker for src/data/redirects.ts.
 *
 * A redirect is broken when a visitor who follows it does not end up on a real
 * page. Checks, for every entry:
 * - the destination page exists under docs/ (or is a file under public/),
 *   following chains through other redirects
 * - when the destination has a #fragment, the heading exists on that page
 * - the source does not shadow an existing page (the middleware would redirect
 *   visitors away from a page that exists)
 *
 * External (http) destinations are not checked.
 *
 * Usage: node dev/check-redirects.mjs [--format text|json|markdown]
 *        [--root <repo dir>] [--baseline <json file>]
 *
 * --root      Check a different checkout (for example the merge base).
 * --baseline  Ignore findings also present in this JSON report, so only
 *             redirects broken by the current change are reported.
 *
 * Exit code 1 when there are findings, 0 otherwise.
 */

import fs from 'fs';
import path from 'path';
import vm from 'vm';
import {glob} from 'glob';
import GithubSlugger from 'github-slugger';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
function flag(name, fallback) {
	const i = args.indexOf(name);
	return i === -1 ? fallback : args[i + 1];
}
const ROOT = path.resolve(flag('--root', path.dirname(__dirname)));
const FORMAT = flag('--format', 'text');
const BASELINE = flag('--baseline');

const REDIRECTS_FILE = path.join(ROOT, 'src/data/redirects.ts');
const CONSTANTS_FILE = path.join(ROOT, 'src/data/constants.ts');
const DOCS_DIR = path.join(ROOT, 'docs');
const PUBLIC_DIR = path.join(ROOT, 'public');
const MAX_CHAIN = 10;

// Load redirects.ts without a TypeScript toolchain. The file is plain data
// plus one import, so strip the module syntax and evaluate it.
function loadRedirects() {
	const source = fs.readFileSync(REDIRECTS_FILE, 'utf-8');
	const constants = fs.readFileSync(CONSTANTS_FILE, 'utf-8');
	const rss = constants.match(
		/TECHNICAL_CHANGELOG_RSS_URL\s*=\s*['"]([^'"]+)['"]/
	);

	const script = source
		.replace(/^import .*$/gm, '')
		.replace(/^export const /gm, 'const ')
		.replace(/module\.exports\s*=\s*\{[\s\S]*?\};?/g, '');

	const sandbox = {TECHNICAL_CHANGELOG_RSS_URL: rss ? rss[1] : ''};
	vm.runInNewContext(`${script}\nresult = updatedRedirectsData;`, sandbox);

	// Line number of each entry, for the report. Entries are written one
	// `source:` per line; if that assumption fails, omit line numbers.
	const lines = source.split('\n');
	const arrayEnd = lines.findIndex(line => /^\];?\s*$/.test(line));
	const sourceLines = [];
	lines.slice(0, arrayEnd).forEach((line, i) => {
		if (/^\s*source:/.test(line)) sourceLines.push(i + 1);
	});
	const haveLines = sourceLines.length === sandbox.result.length;

	return sandbox.result.map((r, i) => ({
		source: r.source,
		destination: r.destination,
		line: haveLines ? sourceLines[i] : undefined
	}));
}

// Same heading extraction as dev/check-links.mjs, so both checks agree on
// which anchors exist.
function extractHeadings(content) {
	const slugger = new GithubSlugger();
	const headings = new Set();
	const contentWithoutCode = content.replace(/```[\s\S]*?```/g, '');
	const headingRegex = /^#{1,6}\s+(.+)$/gm;
	let match;
	while ((match = headingRegex.exec(contentWithoutCode)) !== null) {
		const linkMatch = match[1].match(/\[([^\]]+)\]\([^)]+\)/);
		const title = linkMatch ? linkMatch[1] : match[1];
		headings.add(slugger.slug(title.trim()));
	}
	return headings;
}

async function buildRoutes() {
	const files = await glob('**/*.mdx', {cwd: DOCS_DIR});
	const headingsByRoute = new Map();
	for (const file of files) {
		const route =
			'/' + file.replace(/\.mdx$/, '').replace(/(^|\/)index$/, '');
		const content = fs.readFileSync(path.join(DOCS_DIR, file), 'utf-8');
		headingsByRoute.set(
			route === '' ? '/' : route,
			extractHeadings(content)
		);
	}
	return headingsByRoute;
}

function split(url) {
	const [pathAndQuery, hash = ''] = url.split('#');
	const p = pathAndQuery.split('?')[0].replace(/\/+$/, '') || '/';
	return {path: p, hash: decodeURIComponent(hash)};
}

function isPublicFile(p) {
	const full = path.join(PUBLIC_DIR, p);
	return full.startsWith(PUBLIC_DIR) && fs.existsSync(full);
}

function check(redirects, headingsByRoute) {
	const findings = [];
	const firstBySource = new Map();
	for (const r of redirects) {
		if (!firstBySource.has(r.source)) firstBySource.set(r.source, r);
	}
	const report = (r, problem) =>
		findings.push({
			source: r.source,
			destination: r.destination,
			line: r.line,
			problem
		});

	for (const r of redirects) {
		// Only the first entry for a source is reachable; later duplicates are
		// dead code and cannot break anything.
		if (firstBySource.get(r.source) !== r) continue;

		const src = split(r.source);
		if (!src.hash && headingsByRoute.has(src.path)) {
			report(
				r,
				`source is an existing page; visitors to it are redirected away`
			);
		}

		if (/^https?:\/\//.test(r.destination)) continue;

		// Follow redirect chains to the page a visitor finally lands on.
		let dest = split(r.destination);
		let hops = 0;
		const seen = new Set([r.source]);
		while (
			firstBySource.has(dest.path) &&
			!headingsByRoute.has(dest.path)
		) {
			if (seen.has(dest.path) || ++hops > MAX_CHAIN) {
				report(
					r,
					`redirect loop or chain longer than ${MAX_CHAIN} hops`
				);
				dest = null;
				break;
			}
			seen.add(dest.path);
			const next = firstBySource.get(dest.path).destination;
			if (/^https?:\/\//.test(next)) {
				dest = null;
				break;
			}
			const nextSplit = split(next);
			// A hop without its own fragment keeps the fragment we have.
			dest = {path: nextSplit.path, hash: nextSplit.hash || dest.hash};
		}
		if (!dest) continue;

		const headings = headingsByRoute.get(dest.path);
		if (!headings) {
			if (!isPublicFile(dest.path)) {
				report(r, `destination page ${dest.path} does not exist`);
			}
			continue;
		}
		if (dest.hash && !headings.has(dest.hash)) {
			report(r, `heading #${dest.hash} not found on ${dest.path}`);
		}
	}
	return findings;
}

const key = f => `${f.source}\u0000${f.destination}\u0000${f.problem}`;

function applyBaseline(findings) {
	if (!BASELINE) return findings;
	const baseline = new Set(
		JSON.parse(fs.readFileSync(BASELINE, 'utf-8')).map(key)
	);
	return findings.filter(f => !baseline.has(key(f)));
}

function print(findings) {
	if (FORMAT === 'json') {
		console.log(JSON.stringify(findings, null, 2));
		return;
	}
	const scope = BASELINE ? 'broken by this PR' : 'broken';
	if (FORMAT === 'markdown') {
		if (findings.length === 0) {
			console.log(`### ✅ No redirects ${scope}`);
			return;
		}
		console.log(
			`### ❌ ${findings.length} redirect${findings.length === 1 ? '' : 's'} ${scope}\n`
		);
		console.log(
			'Visitors following these redirects do not land on a real page. Fix the destination in `src/data/redirects.ts`, or add a redirect for a page this PR removed.\n'
		);
		console.log('| Line | Source | Destination | Problem |');
		console.log('| --- | --- | --- | --- |');
		for (const f of findings) {
			console.log(
				`| ${f.line ?? ''} | \`${f.source}\` | \`${f.destination}\` | ${f.problem} |`
			);
		}
		return;
	}
	if (findings.length === 0) {
		console.log(`✅ No redirects ${scope}`);
		return;
	}
	console.log(`❌ ${findings.length} redirect(s) ${scope}:\n`);
	for (const f of findings) {
		const where = f.line
			? `src/data/redirects.ts:${f.line}`
			: 'src/data/redirects.ts';
		console.log(
			`  ${where}\n    ${f.source} -> ${f.destination}\n    ${f.problem}\n`
		);
	}
}

const findings = applyBaseline(check(loadRedirects(), await buildRoutes()));
print(findings);
process.exit(findings.length > 0 ? 1 : 0);
