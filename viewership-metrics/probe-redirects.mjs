#!/usr/bin/env node

/**
 * Probes every redirect rule in src/data/redirects.ts against the live site
 * and joins the Cloudflare traffic for its source and destination.
 *
 * For each rule, requests https://sourcegraph.com/docs<source>, follows the
 * redirects a browser would, and records every hop, the final status, and
 * whether the first redirect is the one the rule promises. When the URL the
 * user ends up on has a #fragment, checks the final page has that anchor.
 *
 * Browsers never send #fragments, so a rule whose source has one is probed
 * as its bare path, which is what the middleware actually sees.
 *
 * Traffic comes from reports/page-views-by-path.md (run page-views-report
 * first) and is credited the way the middleware matches: a path's traffic
 * belongs to the first rule with exactly that source. Writes
 * reports/redirect-probe.json. See README.md.
 *
 * Usage: npm run probe-redirects
 */

import fs from 'fs';
import path from 'path';
import {
	HOST,
	REPORTS_DIR,
	SITEMAP_URL,
	fetchSitemapPaths,
	landingPath,
	loadRedirectRules,
	neverFiresReason,
	normalizePath,
	requestPath
} from './shared.mjs';

const ORIGIN = `https://${HOST}`;
const USER_AGENT = 'sourcegraph-docs-redirect-probe';
const CONCURRENCY = 8;
const MAX_HOPS = 10;
const REQUEST_TIMEOUT_MS = 30_000;
const REDIRECT_STATUSES = [301, 302, 303, 307, 308];

const PAGE_VIEWS_REPORT = path.join(REPORTS_DIR, 'page-views-by-path.md');
const OUTPUT_FILE = path.join(REPORTS_DIR, 'redirect-probe.json');

// Table rows from page-views-by-path.md, keyed by path, plus the window.
function loadPageViews() {
	const text = fs.readFileSync(PAGE_VIEWS_REPORT, 'utf8');
	const window = text.match(/^- Window: (.*)$/m)?.[1] ?? null;
	const rowsByPath = new Map();
	const rowPattern =
		/^\| (\S+) \| (\d+) \| (\d+) \| (\d+) \| (\d+) \| (\d+) \| (yes|no) \|$/;
	for (const line of text.split('\n')) {
		const match = line.match(rowPattern);
		if (!match) continue;
		const [
			,
			pagePath,
			requests,
			visits,
			redirects,
			notFound,
			serverErrors
		] = match;
		rowsByPath.set(pagePath, {
			requests: Number(requests),
			visits: Number(visits),
			redirects: Number(redirects),
			notFound: Number(notFound),
			serverErrors: Number(serverErrors),
			inSitemap: match[7] === 'yes'
		});
	}
	return {window, rowsByPath};
}

// The #fragment a user would have in the address bar for this source.
function sourceFragmentOf(source) {
	const hash = source.indexOf('#');
	return hash === -1 ? null : source.slice(hash + 1);
}

// The Location src/middleware.ts sends for a rule (createRedirectUrl).
function expectedLocation(destination) {
	if (destination.startsWith('http')) return destination;
	const separator = destination.startsWith('/') ? '' : '/';
	return `${ORIGIN}/docs${separator}${destination}`;
}

// id= and name= attributes, which is what a #fragment scrolls to.
function anchorIds(html) {
	return new Set(
		[...html.matchAll(/\s(?:id|name)="([^"]*)"/g)].map(match => match[1])
	);
}

const responseByUrl = new Map();

// One GET without following redirects, memoised per URL because rules
// share sources and chains converge on the same pages.
function fetchOnce(url) {
	if (!responseByUrl.has(url)) responseByUrl.set(url, fetchUncached(url));
	return responseByUrl.get(url);
}

async function fetchUncached(url, attempt = 1) {
	try {
		const response = await fetch(url, {
			redirect: 'manual',
			headers: {'user-agent': USER_AGENT},
			signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
		});
		const location = response.headers.get('location');
		const isHtml = (response.headers.get('content-type') ?? '').includes(
			'text/html'
		);
		const anchors =
			!location && isHtml ? anchorIds(await response.text()) : null;
		if (location) await response.body?.cancel();
		return {status: response.status, location, anchors};
	} catch (error) {
		if (attempt < 3) return fetchUncached(url, attempt + 1);
		return {
			status: null,
			location: null,
			anchors: null,
			error: error.message
		};
	}
}

// Follow redirects like a browser: fragments are not sent, and a Location
// without a fragment keeps the one already in the address bar, so a user
// who requested #requestedFragment keeps it unless some hop replaces it.
async function follow(startUrl, requestedFragment) {
	const hops = [];
	let url = startUrl;
	let fragment = requestedFragment;
	let fragmentFrom = requestedFragment === null ? null : 'request';
	for (let hop = 0; hop <= MAX_HOPS; hop++) {
		const response = await fetchOnce(url);
		hops.push({url, status: response.status, location: response.location});
		const redirected =
			REDIRECT_STATUSES.includes(response.status) && response.location;
		if (!redirected) {
			return {
				hops,
				final: {
					url,
					fragment,
					fragmentFrom,
					anchorFound:
						fragment !== null && response.anchors
							? response.anchors.has(fragment)
							: null,
					status: response.status,
					error: response.error ?? null
				}
			};
		}
		const next = new URL(response.location, url);
		if (next.hash) {
			fragment = decodeURIComponent(next.hash.slice(1));
			fragmentFrom = 'redirect';
		}
		next.hash = '';
		url = next.href;
	}
	return {
		hops,
		final: {
			url,
			fragment,
			fragmentFrom,
			anchorFound: null,
			status: null,
			error: 'too many redirects'
		}
	};
}

// Whether the user ends up on the page the rule names, fragment aside.
function onDestinationPage(finalUrl, destination) {
	const expected = new URL(expectedLocation(destination));
	const actual = new URL(finalUrl);
	return (
		actual.host === expected.host &&
		normalizePath(actual.pathname) === normalizePath(expected.pathname)
	);
}

function firstHopOutcome(hops, expected) {
	const [first] = hops;
	if (first.status === null) return 'error';
	if (!REDIRECT_STATUSES.includes(first.status)) return 'no-redirect';
	const actual = new URL(first.location, first.url).href;
	return actual === expected
		? 'redirects-as-expected'
		: 'redirects-elsewhere';
}

function trafficFor(rowsByPath, url) {
	if (!url) return null;
	const {hostname, pathname} = new URL(url, ORIGIN);
	if (hostname !== HOST) return null;
	return rowsByPath.get(normalizePath(pathname)) ?? null;
}

// Sitemap membership of a page on this site; null when off-site.
function inSitemap(sitemapPaths, pagePath) {
	return pagePath === null ? null : sitemapPaths.has(pagePath);
}

async function probeRule(rule, {rowsByPath, sitemapPaths}) {
	const sourceFragment = sourceFragmentOf(rule.source);
	const requestUrl = `${ORIGIN}/docs${requestPath(rule.source)}`;
	const expected = expectedLocation(rule.destination);
	const {hops, final} = await follow(requestUrl, sourceFragment);
	return {
		line: rule.line,
		source: rule.source,
		destination: rule.destination,
		// Whether the middleware picks this rule for its request path, else
		// the line of the rule it picks (null: no rule, the page is served).
		fires: rule.fires,
		matchedRuleLine: rule.matchedRuleLine,
		sitemapSource: inSitemap(
			sitemapPaths,
			normalizePath(new URL(requestUrl).pathname)
		),
		sitemapDestination: inSitemap(
			sitemapPaths,
			landingPath(rule.destination)
		),
		sourceFragment,
		requestUrl,
		expectedLocation: expected,
		outcome: firstHopOutcome(hops, expected),
		hops,
		final: {
			...final,
			onDestinationPage: onDestinationPage(final.url, rule.destination)
		},
		// Source traffic is credited only to the rule that fires for the
		// path; destination is where the user ends up after every redirect.
		traffic: {
			source: rule.fires ? trafficFor(rowsByPath, requestUrl) : null,
			destination: trafficFor(rowsByPath, final.url)
		}
	};
}

async function runPool(items, worker) {
	const results = new Array(items.length);
	let next = 0;
	let done = 0;
	async function lane() {
		while (next < items.length) {
			const index = next++;
			results[index] = await worker(items[index]);
			done += 1;
			if (done % 100 === 0) console.log(`   ${done}/${items.length}`);
		}
	}
	await Promise.all(Array.from({length: CONCURRENCY}, lane));
	return results;
}

// {value: how many items have it}, sorted by value.
function tally(items, valueOf) {
	const counts = new Map();
	for (const item of items) {
		const value = String(valueOf(item));
		counts.set(value, (counts.get(value) ?? 0) + 1);
	}
	return Object.fromEntries([...counts].sort());
}

// Cloudflare counts by response status, summed over distinct paths so rules
// sharing a path count once.
function trafficByStatus(results, urlOf, trafficOf) {
	const byUrl = new Map();
	for (const result of results) {
		const row = trafficOf(result);
		if (row) byUrl.set(normalizePath(urlOf(result)), row);
	}
	const sum = key =>
		[...byUrl.values()].reduce((total, row) => total + row[key], 0);
	return {
		200: sum('requests'),
		'3xx': sum('redirects'),
		404: sum('notFound'),
		'5xx': sum('serverErrors')
	};
}

// Does the rule do its job, and did anyone trigger it? Traffic here means
// redirects served on the source path, which only a firing rule can have.
function alignment(result) {
	if (!result.fires) return `never fires: ${neverFiresReason(result)}`;
	if (result.outcome !== 'redirects-as-expected') {
		return `fires, but the site ${result.outcome.replace(/-/g, ' ')}`;
	}
	const hasTraffic = (result.traffic.source?.redirects ?? 0) > 0;
	const works = result.final.status === 200;
	if (works) return hasTraffic ? 'works, has traffic' : 'works, no traffic';
	return hasTraffic
		? 'fires, lands on error, has traffic'
		: 'fires, lands on error, no traffic';
}

function summarizeCase(results) {
	return {
		rules: results.length,
		fires: tally(results, result => result.fires),
		sourceTraffic: trafficByStatus(
			results,
			result => result.requestUrl,
			result => result.traffic.source
		),
		destinationTraffic: trafficByStatus(
			results,
			result => result.final.url,
			result => result.traffic.destination
		),
		alignment: tally(results, alignment),
		outcome: tally(results, result => result.outcome),
		sitemapSource: tally(results, result => result.sitemapSource),
		sitemapDestination: tally(results, result => result.sitemapDestination),
		finalStatus: tally(results, result => result.final.status),
		onDestinationPage: tally(
			results,
			result => result.final.onDestinationPage
		),
		fragmentFrom: tally(results, result => result.final.fragmentFrom),
		anchorFound: tally(results, result => result.final.anchorFound)
	};
}

function summarize(results) {
	const firing = results.filter(result => result.fires);
	const hasFragment = text => text.includes('#');
	const cases = {
		'source and destination without #': (source, destination) =>
			!hasFragment(source) && !hasFragment(destination),
		'destination with #': (source, destination) =>
			!hasFragment(source) && hasFragment(destination),
		'source with #': (source, destination) =>
			hasFragment(source) && !hasFragment(destination),
		'source and destination with #': (source, destination) =>
			hasFragment(source) && hasFragment(destination)
	};
	return {
		all: summarizeCase(results),
		chains: firing.filter(result => result.hops.length > 2).length,
		longestChain: Math.max(...firing.map(result => result.hops.length - 1)),
		byFragmentCase: Object.fromEntries(
			Object.entries(cases).map(([name, matches]) => [
				name,
				summarizeCase(
					results.filter(result =>
						matches(result.source, result.destination)
					)
				)
			])
		)
	};
}

async function main() {
	const rules = loadRedirectRules();
	const {window, rowsByPath} = loadPageViews();
	console.log(`🗺️  Fetching ${SITEMAP_URL}...`);
	const sitemapPaths = await fetchSitemapPaths();

	console.log(
		`🔎 Probing ${rules.length} redirect rules against ${ORIGIN}...`
	);
	const results = await runPool(rules, rule =>
		probeRule(rule, {rowsByPath, sitemapPaths})
	);
	const summary = summarize(results);

	fs.mkdirSync(REPORTS_DIR, {recursive: true});
	fs.writeFileSync(
		OUTPUT_FILE,
		JSON.stringify(
			{
				probedAt: new Date().toISOString(),
				host: HOST,
				trafficWindow: window,
				summary,
				rules: results
			},
			null,
			'\t'
		) + '\n'
	);
	console.log(`✅ Wrote ${path.relative(process.cwd(), OUTPUT_FILE)}`);
	console.log(JSON.stringify(summary, null, 2));
}

main().catch(error => {
	console.error(`❌ ${error.message}`);
	process.exit(1);
});
