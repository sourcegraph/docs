#!/usr/bin/env node

/**
 * Page inventory: one CSV row per docs/**\/*.mdx file, with how the page is
 * linked, how much it is read, and its git history across this repository
 * and the content's previous home, doc/ in sourcegraph/sourcegraph.
 *
 * Columns:
 *   path          File path under docs/
 *   inbound_links Links to the page from other pages, with or without #anchor,
 *                 following src/data/redirects.ts; links from the page itself
 *                 and from fenced code blocks are not counted
 *   page_views_90d Requests for the page in the Cloudflare page views report
 *                 (--page-views); 0 when the report has no row for it, empty
 *                 without a report
 *   nav_menu      True when src/data/navigation.ts links to the page
 *   overlapped    True when another file already owns the page's route
 *                 (foo.mdx hides foo/index.mdx), so the site never serves it
 *   created       Author date (yyyy-mm-dd) of the first counted commit
 *   last_changed  Author date of the last counted commit
 *   authors       Distinct author emails across counted commits
 *   commits       Counted commits
 *
 * A counted commit touched the file (or a path it was renamed from) in either
 * repository, and is not by an author in --exclude-authors. Pages only ever
 * edited by excluded authors get empty dates and 0 authors and commits.
 *
 * Usage: npm run page-inventory -- [options]
 *   --sourcegraph-repo <dir>   sourcegraph/sourcegraph clone (bare or not) to
 *                              read doc/ history from; skipped when unset
 *   --sourcegraph-ref <ref>    Revision whose history to walk (default: main)
 *   --page-views <file>        page-views-by-path.md from reports/traffic
 *   --exclude-authors <list>   Comma-separated author names or emails
 *                              (default: Marc,MaedahBatool)
 *   --out <file>               CSV path (default: reports/pages/page-inventory.csv)
 */

import fs from 'fs';
import path from 'path';
import {execFileSync} from 'child_process';
import {fileURLToPath} from 'url';
import {listFiles, routeFor} from '../../dev/check-links.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..', '..');
const DOCS_DIR = path.join(REPO_ROOT, 'docs');

const args = process.argv.slice(2);
function flagValue(name, fallback) {
	const index = args.indexOf(name);
	return index === -1 ? fallback : args[index + 1];
}

const SOURCEGRAPH_REPO = flagValue('--sourcegraph-repo');
const SOURCEGRAPH_REF = flagValue('--sourcegraph-ref', 'main');
const PAGE_VIEWS_FILE = flagValue('--page-views');
const OUT_FILE = path.resolve(
	flagValue('--out', path.join(SCRIPT_DIR, 'page-inventory.csv'))
);
const EXCLUDED_AUTHORS = flagValue('--exclude-authors', 'Marc,MaedahBatool')
	.split(',')
	.map(author => author.trim().toLowerCase())
	.filter(Boolean);

// ---- Routes ---------------------------------------------------------------

const files = listFiles(DOCS_DIR, ['.mdx']);
// Route -> file that owns it. Files are sorted so foo.mdx precedes foo/index.mdx,
// matching the site's first-match rule.
const fileByRoute = new Map();
for (const file of files) {
	const route = routeFor(file);
	if (!fileByRoute.has(route)) fileByRoute.set(route, file);
}

const redirects = loadRedirects();

function loadRedirects() {
	const source = fs.readFileSync(
		path.join(REPO_ROOT, 'src/data/redirects.ts'),
		'utf-8'
	);
	const ruleRegex =
		/source:\s*(['"])(.*?)\1,\s*destination:\s*(['"])(.*?)\3/gs;
	const rules = new Map();
	for (const [, , from, , to] of source.matchAll(ruleRegex)) {
		if (!rules.has(from)) rules.set(from, to);
	}
	return rules;
}

function normalizeRoute(route) {
	const bare = route.split('#')[0].split('?')[0].replace(/\/+$/, '');
	return bare || '/';
}

// The served route a link lands on, following redirects; undefined if none.
function resolveRoute(candidate) {
	const visited = new Set();
	let route = normalizeRoute(candidate);
	while (!fileByRoute.has(route)) {
		const destination = redirects.get(route) ?? redirects.get(route + '/');
		if (
			!destination ||
			visited.has(destination) ||
			/^https?:/.test(destination)
		) {
			return undefined;
		}
		visited.add(destination);
		route = normalizeRoute(destination);
	}
	return route;
}

// ---- Links ----------------------------------------------------------------

const SELF_LINK_REGEX =
	/^(?:https?:)?\/\/(?:www\.)?(?:docs\.sourcegraph\.com|sourcegraph\.com\/docs)(?=[/#?]|$)(?!\/@|\/v\/)/i;
const SKIPPED_SCHEME_REGEX =
	/^(https?:|\/\/|mailto:|tel:|javascript:|data:|command:|<|#)/;
const MARKDOWN_LINK_REGEX = /\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
const JSX_HREF_REGEX = /href=["']([^"']+)["']/g;
const FENCE_LINE_REGEX = /^\s*(`{3,}|~{3,})/;

function stripFencedCodeBlocks(content) {
	let openFence;
	return content
		.split('\n')
		.map(line => {
			const fence = line.match(FENCE_LINE_REGEX)?.[1];
			if (openFence) {
				const closes =
					fence !== undefined &&
					fence[0] === openFence[0] &&
					fence.length >= openFence.length &&
					line.trim() === fence;
				if (closes) openFence = undefined;
				return '';
			}
			if (fence) {
				openFence = fence;
				return '';
			}
			return line;
		})
		.join('\n');
}

// Routes each link in a file lands on, one entry per link.
function outboundRoutes(file) {
	const content = stripFencedCodeBlocks(
		fs.readFileSync(path.join(DOCS_DIR, file), 'utf-8')
	);
	const urls = [
		...content.matchAll(MARKDOWN_LINK_REGEX),
		...content.matchAll(JSX_HREF_REGEX)
	].map(match => match[1].trim());

	const routes = [];
	for (let url of urls) {
		if (SELF_LINK_REGEX.test(url))
			url = url.replace(SELF_LINK_REGEX, '') || '/';
		if (SKIPPED_SCHEME_REGEX.test(url)) continue;
		let candidate;
		if (url.startsWith('/')) {
			candidate = url;
		} else {
			// Relative links resolve from the page URL: foo/bar.mdx serves /foo/bar,
			// foo/index.mdx serves /foo, so both resolve from /foo
			let directory = path.dirname(file);
			if (path.basename(file) === 'index.mdx')
				directory = path.dirname(directory);
			candidate =
				'/' +
				path.join(
					directory === '.' ? '' : directory,
					url.split('#')[0]
				);
		}
		const route = resolveRoute(path.posix.normalize(candidate));
		if (route) routes.push(route);
	}
	return routes;
}

const inboundLinks = new Map(files.map(file => [file, 0]));
for (const file of files) {
	const ownRoute = routeFor(file);
	for (const route of outboundRoutes(file)) {
		if (route === ownRoute) continue;
		const target = fileByRoute.get(route);
		inboundLinks.set(target, inboundLinks.get(target) + 1);
	}
}

// ---- Navigation -----------------------------------------------------------

const navigationSource = fs.readFileSync(
	path.join(REPO_ROOT, 'src/data/navigation.ts'),
	'utf-8'
);
const navigationFiles = new Set();
for (const [, href] of navigationSource.matchAll(/href:\s*['"]([^'"]+)['"]/g)) {
	const route = resolveRoute(href);
	if (route) navigationFiles.add(fileByRoute.get(route));
}

// ---- Page views -----------------------------------------------------------

// Requests per docs route from reports/traffic/page-views-by-path.md, whose
// rows look like `| /docs/foo | 12 | 8 | 0 | 0 | 0 | yes |`.
function loadPageViews(file) {
	const views = new Map();
	if (!file) return views;
	for (const line of fs.readFileSync(file, 'utf-8').split('\n')) {
		const match = line.match(/^\| (\/docs(?:\/[^ |]*)?) \| (\d+) \|/);
		if (!match) continue;
		const route = normalizeRoute(match[1].slice('/docs'.length));
		views.set(route, (views.get(route) ?? 0) + Number(match[2]));
	}
	return views;
}

const pageViews = loadPageViews(PAGE_VIEWS_FILE);

// ---- Git history ----------------------------------------------------------

function git(repo, gitArgs) {
	return execFileSync('git', ['-C', repo, ...gitArgs], {
		encoding: 'utf-8',
		maxBuffer: 64 * 1024 * 1024
	});
}

const COMMIT_FORMAT = '%H%x09%ad%x09%an%x09%ae';

// Commits that touched a file, following renames: [{hash, date, name, email}],
// newest first, plus the earliest path the file was known by in that repository.
function fileHistory(repo, ref, file) {
	let output;
	try {
		output = git(repo, [
			'log',
			ref,
			'--follow',
			'--name-only',
			'--date=short',
			`--format=${COMMIT_FORMAT}`,
			'--',
			file
		]);
	} catch {
		return {commits: [], originalPath: undefined};
	}
	const commits = [];
	let originalPath;
	for (const line of output.split('\n')) {
		if (!line) continue;
		if (line.includes('\t')) {
			const [hash, date, name, email] = line.split('\t');
			commits.push({hash, date, name, email});
		} else {
			originalPath = line;
		}
	}
	return {commits, originalPath};
}

// An excluded author matches a commit's author name (with or without spaces),
// email, email local part, GitHub username in a noreply address
// (123+user@users.noreply.github.com), or email domain without its TLD
// (me@MaedahBatool.com), all case-insensitively.
function isExcluded(commit) {
	const name = commit.name.toLowerCase();
	const email = commit.email.toLowerCase();
	const [localPart, domain = ''] = email.split('@');
	const identities = new Set([
		name,
		name.replace(/\s+/g, ''),
		email,
		localPart,
		localPart.split('+').pop(),
		domain.split('.').slice(0, -1).join('.')
	]);
	return EXCLUDED_AUTHORS.some(author => identities.has(author));
}

// Every doc/**/*.md path ever added or renamed into sourcegraph/sourcegraph.
function loadSourcegraphDocPaths() {
	if (!SOURCEGRAPH_REPO) return new Set();
	const output = git(SOURCEGRAPH_REPO, [
		'log',
		SOURCEGRAPH_REF,
		'--format=',
		'--name-only',
		'--diff-filter=AR',
		'--',
		'doc/'
	]);
	return new Set(
		output.split('\n').filter(docPath => docPath.endsWith('.md'))
	);
}

const sourcegraphDocPaths = loadSourcegraphDocPaths();

// Where the page may have lived in sourcegraph/sourcegraph, most likely first:
// docs/foo/bar_baz.mdx was doc/foo/bar_baz.md. Pages renamed since the import
// are looked up by the original path this repository first knew them by. The
// import also moved some pages, so the fallback is the one doc/ file in the
// same top-level section with the same file name, or its foo/index.md form.
function sourcegraphPaths(originalPath) {
	const derived =
		'doc/' + originalPath.replace(/^docs\//, '').replace(/\.mdx$/, '.md');
	const section = derived.split('/')[1];
	const stem = path.basename(derived, '.md');
	const sameName = [...sourcegraphDocPaths].filter(
		docPath =>
			docPath !== derived &&
			docPath.startsWith(`doc/${section}/`) &&
			(docPath.endsWith(`/${stem}.md`) ||
				docPath.endsWith(`/${stem}/index.md`))
	);
	return sameName.length === 1 ? [derived, sameName[0]] : [derived];
}

let pagesWithSourcegraphHistory = 0;

function sourcegraphHistory(originalPath) {
	for (const docPath of sourcegraphPaths(originalPath)) {
		const {commits} = fileHistory(
			SOURCEGRAPH_REPO,
			SOURCEGRAPH_REF,
			docPath
		);
		if (commits.length > 0) {
			pagesWithSourcegraphHistory++;
			return commits;
		}
	}
	return [];
}

function historySummary(file) {
	const local = fileHistory(REPO_ROOT, 'HEAD', path.join('docs', file));
	let commits = local.commits;
	if (SOURCEGRAPH_REPO && local.originalPath) {
		commits = [...commits, ...sourcegraphHistory(local.originalPath)];
	}
	const counted = commits.filter(commit => !isExcluded(commit));
	const dates = counted.map(commit => commit.date).sort();
	return {
		created: dates[0] ?? '',
		lastChanged: dates[dates.length - 1] ?? '',
		authors: new Set(counted.map(commit => commit.email.toLowerCase()))
			.size,
		commits: counted.length
	};
}

// ---- CSV ------------------------------------------------------------------

function csvCell(value) {
	const text = String(value);
	return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

const header = [
	'path',
	'inbound_links',
	'page_views_90d',
	'nav_menu',
	'overlapped',
	'created',
	'last_changed',
	'authors',
	'commits'
];
const rows = [header];
for (const [index, file] of files.entries()) {
	const route = routeFor(file);
	const overlapped = fileByRoute.get(route) !== file;
	const history = historySummary(file);
	rows.push([
		file,
		inboundLinks.get(file),
		PAGE_VIEWS_FILE ? (pageViews.get(route) ?? 0) : '',
		navigationFiles.has(file) ? 'True' : '',
		overlapped ? 'True' : '',
		history.created,
		history.lastChanged,
		history.authors,
		history.commits
	]);
	if ((index + 1) % 50 === 0)
		console.error(`${index + 1}/${files.length} pages`);
}

fs.mkdirSync(path.dirname(OUT_FILE), {recursive: true});
fs.writeFileSync(
	OUT_FILE,
	rows.map(row => row.map(csvCell).join(',')).join('\n') + '\n'
);
if (SOURCEGRAPH_REPO) {
	console.error(
		`${pagesWithSourcegraphHistory}/${files.length} pages have history in sourcegraph/sourcegraph doc/`
	);
}
console.error(
	`Wrote ${rows.length - 1} rows to ${path.relative(process.cwd(), OUT_FILE)}`
);
