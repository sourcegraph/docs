#!/usr/bin/env node
// Diff the rendered HTML of two deployments of this site, page by page.
//
// Lists the pages from both sitemaps, fetches each page from both sites, strips
// what differs between any two deployments (see normalize), and writes a
// unified diff of the pages that still differ to logs/. Use it to see what a
// Vercel preview would change on production before merging.
//
//   node dev/diff-deployments.mjs --site https://<preview>.vercel.app [--base https://sourcegraph.com/docs] [--pages /code-search,/cody] [--limit 20]
//
// Pass each site with the prefix it serves under: production is
// https://sourcegraph.com/docs (basePath in next.config.js), a preview may be
// https://<preview>.vercel.app or https://<preview>.vercel.app/docs. When the
// two prefixes differ, they are stripped from root-relative URLs before diffing.
//
// Exits 1 when any page differs or could not be fetched.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const argValue = (flag, fallback) => {
	const index = args.indexOf(flag);
	return index === -1 ? fallback : args[index + 1];
};
const SITE = argValue('--site')?.replace(/\/$/, '');
const BASE = argValue('--base', 'https://sourcegraph.com/docs').replace(/\/$/, '');
const ONLY_PAGES = argValue('--pages')?.split(',');
const LIMIT = Number(argValue('--limit', Infinity));
const CONCURRENCY = Number(argValue('--concurrency', 6));
const LOGS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'logs');

if (!SITE) {
	console.error('usage: node dev/diff-deployments.mjs --site <url> [--base <url>] [--pages <a,b>] [--limit <n>]');
	process.exit(2);
}

// Pages every deployment serves that the sitemap does not list.
const EXTRA_PAGES = ['/robots.txt', '/sitemap.xml', '/api/versions', '/api/releases', '/page-that-does-not-exist'];

async function sitemapPages(site) {
	const xml = await (await fetch(`${site}/sitemap.xml`)).text();
	// The sitemap always names production URLs, whichever deployment served it.
	return [...xml.matchAll(/<loc>https:\/\/sourcegraph\.com\/docs(\/[^<]*)?<\/loc>/g)]
		.map(match => (match[1] ?? '/').replace(/\/$/, '') || '/');
}

const basePathOf = site => new URL(site).pathname.replace(/\/$/, '');

// Root-relative URLs and the og:image carry the site's basePath (next.config.js,
// NEXT_PUBLIC_DOCS_BASE_PATH); the same page on a site without one does not.
// When both sites share a basePath, keep it: a missing prefix is then a bug.
function stripBasePath(body, site) {
	const basePath = basePathOf(site);
	if (!basePath || basePath === basePathOf(site === SITE ? BASE : SITE)) return body;
	const escaped = basePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	return body
		.replace(new RegExp(`=(["'])${escaped}(?=/)`, 'g'), '=$1')
		.replace(new RegExp(`=(["'])${escaped}(?=[#?"'])`, 'g'), '=$1/')
		.replace(new RegExp(`https://sourcegraph\\.com${escaped}/api/og/`, 'g'), 'https://sourcegraph.com/api/og/');
}

// Remove what differs between any two deployments of the same code.
function normalize(body, site) {
	return stripBasePath(body, site)
		// The RSC payload and chunk loaders repeat the page with build-specific ids.
		.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
		.replace(/ data-dpl-id="[^"]*"/g, '')
		// Turbopack names chunks by content, so any code change renames them.
		.replace(/\/_next\/static\/immutable\/chunks\/[\w-]+\.(js|css)/g, '/_next/static/immutable/chunks/HASH.$1')
		// Cloudflare injects a hidden bot-detection anchor in front of production.
		.replace(/<a href="https:\/\/sourcegraph\.com\/cdn-cgi\/[^"]*"[^>]*>\s*<\/a>/g, '')
		// The sitemap stamps pages with the build time and lists them in build order.
		.replace(/<lastmod>[^<]*<\/lastmod>/g, '<lastmod/>')
		.replace(/(<url>[\s\S]*<\/url>)/, urls => urls.match(/<url>[\s\S]*?<\/url>/g).sort().join('\n'))
		// One tag per line, so the diff points at the changed tag.
		.replace(/>\s*</g, '>\n<');
}

async function fetchNormalized(site, page) {
	// `${BASE}/` would be https://sourcegraph.com/docs/, which redirects to /docs.
	const response = await fetch(page === '/' ? site : `${site}${page}`, { redirect: 'manual' });
	const body = normalize(await response.text(), site);
	const location = response.headers.get('location');
	return `HTTP ${response.status}${location ? ` -> ${location}` : ''}\n${body}`;
}

function unifiedDiff(page, before, after) {
	const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'diff-deployments-'));
	fs.writeFileSync(path.join(dir, 'base'), before);
	fs.writeFileSync(path.join(dir, 'site'), after);
	try {
		execFileSync('diff', ['-u', '--label', `base ${page}`, '--label', `site ${page}`, 'base', 'site'], { cwd: dir, encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 });
		return '';
	} catch (error) {
		if (error.status !== 1) throw error;
		return error.stdout;
	} finally {
		fs.rmSync(dir, { recursive: true });
	}
}

async function mapConcurrently(items, worker) {
	const results = new Array(items.length);
	let next = 0;
	await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
		while (next < items.length) {
			const index = next++;
			results[index] = await worker(items[index]);
		}
	}));
	return results;
}

const [basePages, sitePages] = await Promise.all([sitemapPages(BASE), sitemapPages(SITE)]);
const onlyInBase = basePages.filter(page => !sitePages.includes(page));
const onlyInSite = sitePages.filter(page => !basePages.includes(page));
const pages = (ONLY_PAGES ?? [...new Set([...basePages, ...sitePages, ...EXTRA_PAGES])]).slice(0, LIMIT);

console.log(`Comparing ${pages.length} pages: ${SITE} against ${BASE}`);
const results = await mapConcurrently(pages, async page => {
	try {
		const [before, after] = await Promise.all([fetchNormalized(BASE, page), fetchNormalized(SITE, page)]);
		return { page, diff: unifiedDiff(page, before, after) };
	} catch (error) {
		return { page, error: error.message };
	}
});

const changed = results.filter(result => result.diff);
const failed = results.filter(result => result.error);
const identical = results.length - changed.length - failed.length;

console.log(`${identical} identical, ${changed.length} differ, ${failed.length} failed to fetch.`);
if (onlyInBase.length) console.log(`\nIn the base sitemap only:\n  ${onlyInBase.join('\n  ')}`);
if (onlyInSite.length) console.log(`\nIn the site sitemap only:\n  ${onlyInSite.join('\n  ')}`);
if (failed.length) console.log(`\nFailed to fetch:\n${failed.map(result => `  ${result.page}: ${result.error}`).join('\n')}`);
if (changed.length) {
	console.log('\nPages that differ (changed lines):');
	for (const { page, diff } of changed) {
		const lines = diff.split('\n').filter(line => /^[-+][^-+]/.test(line)).length;
		console.log(`  ${page} (${lines})`);
	}
	fs.mkdirSync(LOGS_DIR, { recursive: true });
	const report = path.join(LOGS_DIR, `diff-deployments-${new Date().toISOString().replace(/[:.]/g, '-')}.diff`);
	fs.writeFileSync(report, changed.map(result => result.diff).join('\n'));
	console.log(`\nFull diff: ${path.relative(process.cwd(), report)}`);
}
process.exitCode = changed.length || failed.length ? 1 : 0;
