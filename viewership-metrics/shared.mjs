// Redirect rules, sitemap and path helpers shared by the reports.

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

export const HOST = 'sourcegraph.com';
// An index pointing at sitemap-main.xml (blog, changelog) and docs/sitemap.xml.
export const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = path.dirname(SCRIPT_DIR);
export const REPORTS_DIR = path.join(SCRIPT_DIR, 'reports');
const DATA_DIR = path.join(REPO_ROOT, 'src', 'data');
const REDIRECTS_FILE = path.join(DATA_DIR, 'redirects.ts');
// Where redirects.ts imports its destination constants from.
const CONSTANTS_FILE = path.join(DATA_DIR, 'constants.ts');

// One `{source: '...', destination: '...' | CONSTANT}` entry in redirects.ts.
const REDIRECT_RULE_PATTERN =
	/\{\s*source:\s*'([^']*)',\s*destination:\s*(?:'([^']*)'|(\w+))\s*,?\s*\}/g;
// `export const NAME = '...'` in constants.ts.
const STRING_CONSTANT_PATTERN = /export const (\w+)\s*=\s*'([^']*)'/g;

function loadStringConstants() {
	const text = fs.readFileSync(CONSTANTS_FILE, 'utf8');
	return new Map(
		[...text.matchAll(STRING_CONSTANT_PATTERN)].map(match => [
			match[1],
			match[2]
		])
	);
}

// Merge trailing-slash variants of the same page.
export function normalizePath(pagePath) {
	return pagePath.length > 1 ? pagePath.replace(/\/+$/, '') : pagePath;
}

// What the middleware sees for a rule's source: browsers never send the
// #fragment.
export function requestPath(source) {
	return source.replace(/#.*$/, '');
}

// Rules as src/middleware.ts applies them: the request path (relative to
// /docs) must equal a source exactly, and the first such rule wins. A `.md`
// path is rewritten to /api/md before the lookup, so it never reaches it.
// Each rule gets `matchedRuleLine`, the line of the rule the middleware
// picks for this rule's request path (null when no rule matches and the
// page is served), and `fires`, whether that is this rule.
export function loadRedirectRules() {
	const text = fs.readFileSync(REDIRECTS_FILE, 'utf8');
	const constants = loadStringConstants();
	const rules = [];
	let line = 1;
	let cursor = 0;
	for (const match of text.matchAll(REDIRECT_RULE_PATTERN)) {
		const [, source, destination, constantName] = match;
		line += text.slice(cursor, match.index).split('\n').length - 1;
		cursor = match.index;
		rules.push({
			line,
			source,
			destination:
				destination ?? constants.get(constantName) ?? constantName
		});
	}
	const firstLineBySource = new Map();
	for (const rule of rules) {
		if (rule.source.includes('#') || rule.source.endsWith('.md')) continue;
		if (!firstLineBySource.has(rule.source)) {
			firstLineBySource.set(rule.source, rule.line);
		}
	}
	return rules.map(rule => {
		const matchedRuleLine =
			firstLineBySource.get(requestPath(rule.source)) ?? null;
		return {...rule, matchedRuleLine, fires: matchedRuleLine === rule.line};
	});
}

// Why a rule can never fire, or null when it can.
export function neverFiresReason(rule) {
	if (rule.fires) return null;
	if (rule.matchedRuleLine !== null) return 'an earlier rule matches first';
	if (rule.source.endsWith('.md')) return '.md is rewritten, not redirected';
	return 'browsers drop the #, page is served';
}

// Where a redirect destination lands on sourcegraph.com, or null when it
// leaves the site (or is a constant the regex could not resolve).
export function landingPath(destination) {
	if (destination.startsWith('/')) {
		return normalizePath(`/docs${destination}`.replace(/[#?].*$/, ''));
	}
	if (destination.startsWith(`https://${HOST}/`)) {
		return normalizePath(new URL(destination).pathname);
	}
	return null;
}

// Paths listed in the sitemap, following <sitemapindex> entries. Any page
// with traffic that is not here is deleted, unlisted or a probe.
export async function fetchSitemapPaths(url = SITEMAP_URL, paths = new Set()) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`${url}: HTTP ${response.status}`);
	}
	const xml = await response.text();
	const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match =>
		match[1].trim()
	);
	if (xml.includes('<sitemapindex')) {
		for (const location of locations) {
			await fetchSitemapPaths(location, paths);
		}
	} else {
		for (const location of locations) {
			paths.add(normalizePath(new URL(location).pathname));
		}
	}
	return paths;
}
