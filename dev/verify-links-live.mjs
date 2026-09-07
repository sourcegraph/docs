#!/usr/bin/env node
// Prove that the links a branch changed resolve on a deployed site.
//
// For every internal link that differs between a base ref and the working
// tree, fetch the target page on --site and check the rendered HTML, not the
// HTTP status: the docs site serves its not-found page with 200 (see the
// dynamicParams fix) and even real pages embed the not-found text in their
// RSC payload, so neither status nor page text proves anything. A link passes
// when
//   - the target page's own first heading id (from its local MDX source) is an
//     id in the HTML, which the not-found page never has, and
//   - the link's #fragment, when present, is an id in the HTML.
// Prints a Markdown table to paste into a PR. Old links point at --old-site so
// reviewers can see the current breakage.
//
//   node dev/verify-links-live.mjs --site https://<preview>.vercel.app [--old-site https://sourcegraph.com/docs] [--base origin/main]
//
// Production serves under https://sourcegraph.com/docs (basePath in
// next.config.js); Vercel previews serve at the root, so pass the full prefix
// in --site.
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { extractHeadings } from './check-links.mjs';

const args = process.argv.slice(2);
const argValue = (flag, fallback) => {
	const index = args.indexOf(flag);
	return index === -1 ? fallback : args[index + 1];
};
const SITE = argValue('--site', 'https://sourcegraph.com/docs').replace(/\/$/, '');
const OLD_SITE = argValue('--old-site', 'https://sourcegraph.com/docs').replace(/\/$/, '');
const BASE_REF = argValue('--base', 'origin/main');

const LINK = /\]\(([^)\s]+)\)|href=["']([^"']+)["']/g;

function routeFor(file) {
	return '/' + file.replace(/^docs\//, '').replace(/\.mdx$/, '').replace(/\/index$/, '');
}

// Same precedence as the site (first glob match): foo.mdx before foo/index.mdx.
function sourceFileFor(route) {
	const stem = route === '/' ? 'docs/index' : `docs${route}`;
	return [`${stem}.mdx`, `${stem}/index.mdx`].find(candidate => fs.existsSync(candidate));
}

const firstHeadingCache = new Map();
function firstHeadingId(route) {
	if (!firstHeadingCache.has(route)) {
		const file = sourceFileFor(route);
		const [first] = file ? extractHeadings(fs.readFileSync(file, 'utf-8')) : [];
		firstHeadingCache.set(route, first);
	}
	return firstHeadingCache.get(route);
}

// Collect { file, oldUrl, newUrl } for every link that changed.
function changedLinks() {
	const diff = execSync(`git diff -U0 ${BASE_REF}`, { encoding: 'utf-8' });
	const result = [];
	let file, removed = [], added = [];
	const flush = () => {
		if (removed.length === added.length) removed.forEach((oldLine, index) => {
			const oldLinks = [...oldLine.matchAll(LINK)].map(m => m[1] ?? m[2]);
			const newLinks = [...added[index].matchAll(LINK)].map(m => m[1] ?? m[2]);
			if (oldLinks.length !== newLinks.length) return;
			oldLinks.forEach((oldUrl, i) => {
				if (oldUrl !== newLinks[i]) result.push({ file, oldUrl, newUrl: newLinks[i] });
			});
		});
		removed = []; added = [];
	};
	for (const line of diff.split('\n')) {
		if (line.startsWith('+++ b/')) { flush(); file = line.slice(6); continue; }
		if (line.startsWith('@@')) { flush(); continue; }
		if (line.startsWith('---')) continue;
		if (line.startsWith('-')) removed.push(line.slice(1));
		else if (line.startsWith('+')) added.push(line.slice(1));
	}
	flush();
	return result;
}

function resolveTarget(file, url) {
	if (/^(https?:|mailto:|tel:)/.test(url)) return null;
	const [pagePart, fragment] = url.split('#');
	let page;
	if (pagePart === '') page = routeFor(file);
	else if (pagePart.startsWith('/')) page = pagePart;
	else page = path.posix.join(path.posix.dirname(routeFor(file)), pagePart);
	page = page.replace(/\/$/, '') || '/';
	return { page, fragment, href: `${page}${fragment ? '#' + fragment : ''}` };
}

const pageCache = new Map();
async function fetchPage(page) {
	if (!pageCache.has(page)) {
		pageCache.set(page, fetch(`${SITE}${page}`, { redirect: 'follow' }).then(response => response.text()));
	}
	return pageCache.get(page);
}

function hasId(html, id) {
	const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	return new RegExp(`\\sid=["']${escaped}["']`).test(html);
}

const links = changedLinks();
const rows = [];
let failures = 0;
for (const { file, oldUrl, newUrl } of links) {
	const target = resolveTarget(file, newUrl);
	if (!target) continue;
	const html = await fetchPage(target.page);
	const heading = firstHeadingId(target.page);
	// No local source file means no such page; a page with no headings cannot be verified either.
	const pageOk = Boolean(heading) && hasId(html, heading);
	const anchorOk = !target.fragment || hasId(html, target.fragment);
	if (!pageOk || !anchorOk) failures++;
	const oldTarget = resolveTarget(file, oldUrl);
	const oldCell = oldTarget ? `[\`${oldUrl}\`](${OLD_SITE}${oldTarget.href})` : `\`${oldUrl}\``;
	rows.push(`| \`${file}\` | ${oldCell} | [\`${newUrl}\`](${SITE}${target.href}) | ${pageOk ? '✅' : '❌'} | ${target.fragment ? (anchorOk ? '✅' : '❌') : '—'} |`);
}

console.log(`Checked ${rows.length} changed links against ${SITE}: ${rows.length - failures} resolve, ${failures} fail.`);
console.log('Page rendered = the target page\'s first heading id is present (the 404 page never has it); Anchor = the #fragment is an id on the page. Old links point at the current site.\n');
console.log('| File containing the link | Old link (broken today) | New link (preview) | Page rendered | Anchor found |');
console.log('|--------------------------|-------------------------|--------------------|---------------|--------------|');
console.log(rows.join('\n'));
process.exitCode = failures ? 1 : 0;
