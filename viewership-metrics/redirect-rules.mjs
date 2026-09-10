// Reads the redirect rules in src/data/redirects.ts, shared by the reports.

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

export const HOST = 'sourcegraph.com';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = path.dirname(SCRIPT_DIR);
export const REPORTS_DIR = path.join(SCRIPT_DIR, 'reports');
const REDIRECTS_FILE = path.join(REPO_ROOT, 'src', 'data', 'redirects.ts');

// One `{source: '...', destination: '...' | CONSTANT}` entry in redirects.ts.
const REDIRECT_RULE_PATTERN =
	/\{\s*source:\s*'([^']*)',\s*destination:\s*(?:'([^']*)'|(\w+))\s*,?\s*\}/g;

// Merge trailing-slash variants of the same page.
export function normalizePath(pagePath) {
	return pagePath.length > 1 ? pagePath.replace(/\/+$/, '') : pagePath;
}

// src/middleware.ts matches rules by exact source path (relative to /docs)
// and the first match wins, so a repeated source is a dead rule.
export function loadRedirectRules() {
	const text = fs.readFileSync(REDIRECTS_FILE, 'utf8');
	const firstLineBySource = new Map();
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
			destination: destination ?? constantName,
			shadowedBy: firstLineBySource.get(source)
		});
		if (!firstLineBySource.has(source)) firstLineBySource.set(source, line);
	}
	return rules;
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
