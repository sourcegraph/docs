#!/usr/bin/env node

/**
 * Page views report from Cloudflare's GraphQL Analytics API.
 *
 * Counts human page views (HTML 200s), redirects, 404s and 5xx errors on
 * sourcegraph.com for /docs, /changelog and /blog over the last 90 days
 * and writes Markdown reports to reports/ sorted by path, request count,
 * redirect count and error count, plus how often each redirect rule in
 * src/data/redirects.ts was followed. See README.md.
 *
 * Usage: CLOUDFLARE_API_TOKEN=... npm run page-views-report [-- --days 90]
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const ZONE_TAG =
	process.env.CLOUDFLARE_ZONE_ID ?? 'a168cb2eefa87d19793824cd9bf83f3a';
const HOST = 'sourcegraph.com';
const PATH_PREFIXES = ['/docs', '/changelog', '/blog'];
// An index pointing at sitemap-main.xml (blog, changelog) and docs/sitemap.xml.
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const EXCLUDED_COUNTRIES = ['CN'];
const EXCLUDED_ASN_DESCRIPTIONS = ['Hetzner Online GmbH'];

// Real redirects only; 304 Not Modified is a cache revalidation.
const REDIRECT_STATUSES = [301, 302, 303, 307, 308];

// Build output and static assets are not pages. Feeds (.xml, .rss, .atom)
// are kept because their 404s and redirects are worth knowing about.
const STATIC_ASSET_PATTERN =
	/\/_next(\/|$)|\.(js|css|map|png|jpe?g|gif|svg|ico|webp|woff2?|ttf)$/i;

// Real page URLs only use these characters; anything else is a scanner
// probe or injection payload, for example "(A(x))", "%3Cscript%3E", "..;/".
const SCANNER_PATH_PATTERN = /[^\w/.~@'-]/;

function isNoisePath(pagePath) {
	return (
		STATIC_ASSET_PATTERN.test(pagePath) ||
		SCANNER_PATH_PATTERN.test(pagePath)
	);
}

// Zone limits reported by the `settings` query: 32 days per query,
// 90 days of history, 10,000 rows per page.
const MAX_WINDOW_DAYS = 30;
const MAX_HISTORY_DAYS = 90;
const PAGE_SIZE = 10000;

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.dirname(SCRIPT_DIR);
const REPORTS_DIR = path.join(SCRIPT_DIR, 'reports');
const REDIRECTS_FILE = path.join(REPO_ROOT, 'src', 'data', 'redirects.ts');

// One `{source: '...', destination: '...' | CONSTANT}` entry in redirects.ts.
const REDIRECT_RULE_PATTERN =
	/\{\s*source:\s*'([^']*)',\s*destination:\s*(?:'([^']*)'|(\w+))\s*,?\s*\}/g;

const QUERY = `
query PageViews($zoneTag: string!, $filter: ZoneHttpRequestsAdaptiveGroupsFilter_InputObject!) {
	viewer {
		zones(filter: {zoneTag: $zoneTag}) {
			httpRequestsAdaptiveGroups(limit: ${PAGE_SIZE}, filter: $filter, orderBy: [count_DESC]) {
				count
				sum { visits }
				dimensions { clientRequestPath edgeResponseStatus }
			}
		}
	}
}`;

function parseDays() {
	const index = process.argv.indexOf('--days');
	if (index === -1) return MAX_HISTORY_DAYS;
	const days = Number(process.argv[index + 1]);
	if (!Number.isInteger(days) || days < 1 || days > MAX_HISTORY_DAYS) {
		throw new Error(
			`--days must be an integer from 1 to ${MAX_HISTORY_DAYS}`
		);
	}
	return days;
}

function buildFilter(start, end) {
	return {
		datetime_geq: start.toISOString(),
		datetime_lt: end.toISOString(),
		clientRequestHTTPHost: HOST,
		botManagementDecision: 'likely_human',
		clientRequestHTTPMethodName: 'GET',
		clientASNDescription_notin: EXCLUDED_ASN_DESCRIPTIONS,
		clientCountryName_notin: EXCLUDED_COUNTRIES,
		AND: [
			{
				OR: PATH_PREFIXES.flatMap(prefix => [
					{clientRequestPath: prefix},
					{clientRequestPath_like: `${prefix}/%`}
				])
			},
			{
				OR: [
					{
						edgeResponseStatus: 200,
						edgeResponseContentTypeName: 'html',
						// A browser that ran Cloudflare's JS detection.
						// Scrapers with spoofed browser user agents and
						// ASNs score `likely_human` but never pass it.
						// The first response only sets the cookie, so this
						// counts visitors who load a second page. Redirects
						// and errors are mostly first requests from stale
						// external links, so they are not filtered on it.
						jsDetectionPassed: 'Passed'
					},
					{edgeResponseStatus_in: REDIRECT_STATUSES},
					{edgeResponseStatus: 404},
					{edgeResponseStatus_geq: 500, edgeResponseStatus_lt: 600}
				]
			}
		]
	};
}

function emptyTotals() {
	return {
		requests: 0,
		visits: 0,
		redirects: 0,
		notFound: 0,
		serverErrors: 0
	};
}

function addRow(totals, row) {
	const status = row.dimensions.edgeResponseStatus;
	if (status === 200) {
		totals.requests += row.count;
		totals.visits += row.sum.visits;
	} else if (REDIRECT_STATUSES.includes(status)) {
		totals.redirects += row.count;
	} else if (status === 404) {
		totals.notFound += row.count;
	} else if (status >= 500) {
		totals.serverErrors += row.count;
	}
}

async function queryCloudflare(token, variables) {
	const response = await fetch(
		'https://api.cloudflare.com/client/v4/graphql',
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({query: QUERY, variables})
		}
	);
	if (!response.ok) {
		throw new Error(
			`Cloudflare API HTTP ${response.status}: ${await response.text()}`
		);
	}
	const body = await response.json();
	if (body.errors?.length) {
		throw new Error(
			`Cloudflare GraphQL error: ${JSON.stringify(body.errors)}`
		);
	}
	return body.data.viewer.zones[0].httpRequestsAdaptiveGroups;
}

// Fetch one window. If the page fills up, split the window and recurse
// so no rows are dropped.
async function fetchWindow(token, start, end, rowsByPath) {
	const rows = await queryCloudflare(token, {
		zoneTag: ZONE_TAG,
		filter: buildFilter(start, end)
	});
	if (rows.length >= PAGE_SIZE) {
		const middle = new Date(
			start.getTime() + (end.getTime() - start.getTime()) / 2
		);
		console.log(
			`  page full, splitting ${start.toISOString()} – ${end.toISOString()}`
		);
		await fetchWindow(token, start, middle, rowsByPath);
		await fetchWindow(token, middle, end, rowsByPath);
		return;
	}
	console.log(
		`  ${start.toISOString()} – ${end.toISOString()}: ${rows.length} paths`
	);
	for (const row of rows) {
		if (isTrailingSlashRedirect(row)) continue;
		const pagePath = normalizePath(row.dimensions.clientRequestPath);
		if (isNoisePath(pagePath)) continue;
		const totals = rowsByPath.get(pagePath) ?? emptyTotals();
		addRow(totals, row);
		rowsByPath.set(pagePath, totals);
	}
}

// Merge trailing-slash variants of the same page.
function normalizePath(pagePath) {
	return pagePath.length > 1 ? pagePath.replace(/\/+$/, '') : pagePath;
}

// The site redirects "/page/" to "/page"; that redirect is not worth counting.
function isTrailingSlashRedirect(row) {
	const {clientRequestPath, edgeResponseStatus} = row.dimensions;
	return (
		clientRequestPath.length > 1 &&
		clientRequestPath.endsWith('/') &&
		REDIRECT_STATUSES.includes(edgeResponseStatus)
	);
}

// src/middleware.ts matches rules by exact source path (relative to /docs)
// and the first match wins, so a repeated source is a dead rule.
function loadRedirectRules() {
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

// Paths listed in the sitemap, following <sitemapindex> entries. Any page
// with traffic that is not here is deleted, unlisted or a probe.
async function fetchSitemapPaths(url = SITEMAP_URL, paths = new Set()) {
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

// Where a redirect destination lands on sourcegraph.com, or null when it
// leaves the site (or is a constant the regex could not resolve).
function landingPath(destination) {
	if (destination.startsWith('/')) {
		return normalizePath(`/docs${destination}`.replace(/[#?].*$/, ''));
	}
	if (destination.startsWith(`https://${HOST}/`)) {
		return normalizePath(new URL(destination).pathname);
	}
	return null;
}

function reportHeader(title, start, end) {
	return [
		`# ${title}`,
		'',
		`- Window: ${start.toISOString()} to ${end.toISOString()} (UTC)`,
		`- Host: ${HOST}; paths: ${PATH_PREFIXES.join(', ')}`,
		`- Filters: Bot Management likely_human; GET; ` +
			`excluding ASN ${EXCLUDED_ASN_DESCRIPTIONS.join(', ')}; ` +
			`excluding countries ${EXCLUDED_COUNTRIES.join(', ')}. ` +
			'Requests and Visits also require JS detection passed, ' +
			'which excludes the first page of each visit.'
	];
}

// A destination the browser will request back through the middleware, or
// null when it leaves the docs site. Browsers do not send fragments.
function docsDestinationPath(destination) {
	const relative = destination.replace(
		/^https:\/\/sourcegraph\.com\/docs/,
		''
	);
	return relative.startsWith('/') ? relative.replace(/[#?].*$/, '') : null;
}

// Follow a rule's destination through further rules, as a browser would.
// Returns the rules hit after this one, and whether they loop back.
function chainAfter(rule, liveRuleBySource) {
	const hops = [];
	let next = liveRuleBySource.get(docsDestinationPath(rule.destination));
	while (next && next !== rule && !hops.includes(next)) {
		hops.push(next);
		next = liveRuleBySource.get(docsDestinationPath(next.destination));
	}
	return {hops, loop: Boolean(next)};
}

// Hits = redirects served on /docs<source>. Live rules sort by hits, then
// shadowed duplicates; both keep file order within a tie.
function formatRedirectRulesReport({
	title,
	start,
	end,
	rules,
	rowsByPath,
	sitemapPaths
}) {
	const hitsOf = rule =>
		rowsByPath.get(`/docs${rule.source}`)?.redirects ?? 0;
	const live = rules.filter(rule => !rule.shadowedBy);
	const ruleHits = live.reduce((sum, rule) => sum + hitsOf(rule), 0);
	const liveRuleBySource = new Map(live.map(rule => [rule.source, rule]));
	const chainOf = rule =>
		rule.shadowedBy
			? {hops: [], loop: false}
			: chainAfter(rule, liveRuleBySource);
	const chained = live.filter(rule => chainOf(rule).hops.length > 0);
	const longestChain = Math.max(
		0,
		...chained.map(rule => chainOf(rule).hops.length)
	);
	// Sitemap membership of the rule's own destination; blank when off-site.
	const sitemapOf = rule => {
		const landing = landingPath(rule.destination);
		return landing === null ? '' : sitemapPaths.has(landing) ? 'yes' : 'no';
	};
	const destinationUnlisted = live.filter(rule => sitemapOf(rule) === 'no');
	const docsRedirects = [...rowsByPath.entries()]
		.filter(([pagePath]) => pagePath.startsWith('/docs'))
		.reduce((sum, [, totals]) => sum + totals.redirects, 0);
	const sorted = [...rules].sort(
		(a, b) =>
			(a.shadowedBy ? 1 : 0) - (b.shadowedBy ? 1 : 0) ||
			hitsOf(b) - hitsOf(a) ||
			a.line - b.line
	);
	const lines = [
		...reportHeader(title, start, end),
		`- Rules: ${rules.length} in ${path.relative(REPO_ROOT, REDIRECTS_FILE)}; ` +
			`${live.length} live, ${rules.length - live.length} shadowed by an ` +
			`earlier rule with the same source (never match), ` +
			`${live.filter(rule => hitsOf(rule) === 0).length} live with zero hits`,
		`- Hits: ${ruleHits} redirects matched a rule, of ${docsRedirects} ` +
			'redirects on /docs paths (the rest are version and other redirects)',
		'- Hits count 3xx responses on /docs<Source> with the same filters as ' +
			'the page views reports; adaptive-sampled estimates.',
		`- Chains: ${chained.length} live rules redirect to another rule's ` +
			`source, so the browser follows more redirects (longest chain: ` +
			`${longestChain} more). Chain shows the extra hops and where the ` +
			'user ends up.',
		`- Sitemap: whether the rule's destination is in ${SITEMAP_URL} ` +
			`(blank when it leaves the site). ${destinationUnlisted.length} ` +
			`live rules point at an unlisted page, ${destinationUnlisted.reduce(
				(sum, rule) => sum + hitsOf(rule),
				0
			)} hits; unless Chain shows a further redirect, on /docs that is ` +
			'likely a soft 404.',
		'',
		'| Line | Source | Destination | Hits | Chain | Sitemap |',
		'| ---: | --- | --- | ---: | --- | --- |',
		...sorted.map(rule => {
			const {hops, loop} = chainOf(rule);
			const hits = rule.shadowedBy
				? `shadowed by line ${rule.shadowedBy}`
				: hitsOf(rule);
			const chain = loop
				? `LOOP after ${hops.length} more`
				: hops.length
					? `${hops.length} more → ${hops.at(-1).destination}`
					: '';
			return `| ${rule.line} | ${rule.source} | ${rule.destination} | ${hits} | ${chain} | ${sitemapOf(rule)} |`;
		}),
		''
	];
	return lines.join('\n');
}

// Totals cover every path, so the header is identical across reports.
function formatReport({title, start, end, total, rows}) {
	const lines = [
		...reportHeader(title, start, end),
		`- Totals: ${total.paths} paths, ${total.requests} requests, ` +
			`${total.visits} visits, ${total.redirects} 3xx, ` +
			`${total.notFound} 404s, ${total.serverErrors} 5xx`,
		'- Requests and Visits count HTML 200 responses. Visits = requests ' +
			"whose referrer is not sourcegraph.com (Cloudflare's page-view proxy).",
		`- 3xx counts redirects (${REDIRECT_STATUSES.join(', ')}); 404 and ` +
			'5xx count any content type. Trailing-slash redirects, static ' +
			'assets and scanner probe paths are skipped. ' +
			'All counts are adaptive-sampled estimates.',
		`- Sitemap: ${total.sitemapPaths} of ${total.paths} paths are in ` +
			`${SITEMAP_URL}, with ${total.sitemapRequests} of ${total.requests} ` +
			'requests. The rest are deleted, unlisted or probe paths; on /docs ' +
			'they still return 200. The blog sitemap lists only recent posts.',
		'',
		'| Path | Requests | Visits | 3xx | 404 | 5xx | Sitemap |',
		'| --- | ---: | ---: | ---: | ---: | ---: | --- |',
		...rows.map(
			row =>
				`| ${row.path} | ${row.requests} | ${row.visits} | ` +
				`${row.redirects} | ${row.notFound} | ${row.serverErrors} | ` +
				`${row.inSitemap ? 'yes' : 'no'} |`
		),
		''
	];
	return lines.join('\n');
}

async function main() {
	const token = process.env.CLOUDFLARE_API_TOKEN;
	if (!token) {
		throw new Error('CLOUDFLARE_API_TOKEN is not set');
	}
	const days = parseDays();

	// Cloudflare rejects any datetime older than exactly 90 days from the
	// moment the query runs, so anchor the window to now, rounded to the hour.
	const end = new Date(Math.floor(Date.now() / HOUR_MS) * HOUR_MS);
	const start = new Date(end.getTime() - days * DAY_MS + HOUR_MS);

	console.log(`📊 Fetching ${days} days of page views for ${HOST}...`);
	const rowsByPath = new Map();
	for (let windowStart = start; windowStart < end; ) {
		const windowEnd = new Date(
			Math.min(
				windowStart.getTime() + MAX_WINDOW_DAYS * DAY_MS,
				end.getTime()
			)
		);
		await fetchWindow(token, windowStart, windowEnd, rowsByPath);
		windowStart = windowEnd;
	}

	console.log(`🗺️  Fetching ${SITEMAP_URL}...`);
	const sitemapPaths = await fetchSitemapPaths();
	const rows = [...rowsByPath.entries()].map(([pagePath, totals]) => ({
		path: pagePath,
		...totals,
		inSitemap: sitemapPaths.has(pagePath)
	}));
	const total = {
		paths: rows.length,
		...emptyTotals(),
		sitemapPaths: 0,
		sitemapRequests: 0
	};
	for (const row of rows) {
		for (const key of Object.keys(emptyTotals())) total[key] += row[key];
		if (row.inSitemap) {
			total.sitemapPaths += 1;
			total.sitemapRequests += row.requests;
		}
	}

	// Every report has every row: sorted by a metric (descending), or by path.
	const reports = [
		{file: 'page-views-by-path.md', title: 'Page views by path'},
		{
			file: 'page-views-by-count.md',
			title: 'Page views by request count',
			metric: row => row.requests
		},
		{
			file: 'page-views-by-redirects.md',
			title: 'Page views by redirect count',
			metric: row => row.redirects
		},
		{
			file: 'page-views-by-errors.md',
			title: 'Page views by error count (404 + 5xx)',
			metric: row => row.notFound + row.serverErrors
		}
	];

	fs.mkdirSync(REPORTS_DIR, {recursive: true});
	for (const {file, title, metric} of reports) {
		const reportRows = [...rows].sort(
			(a, b) =>
				(metric ? metric(b) - metric(a) : 0) ||
				a.path.localeCompare(b.path)
		);
		const target = path.join(REPORTS_DIR, file);
		fs.writeFileSync(
			target,
			formatReport({
				title: `${title} (last ${days} days)`,
				start,
				end,
				total,
				rows: reportRows
			})
		);
		console.log(`✅ Wrote ${path.relative(process.cwd(), target)}`);
	}

	const rulesTarget = path.join(REPORTS_DIR, 'redirect-rules.md');
	fs.writeFileSync(
		rulesTarget,
		formatRedirectRulesReport({
			title: `Redirect rules by hits (last ${days} days)`,
			start,
			end,
			rules: loadRedirectRules(),
			rowsByPath,
			sitemapPaths
		})
	);
	console.log(`✅ Wrote ${path.relative(process.cwd(), rulesTarget)}`);
	console.log(`\n${rows.length} paths total.`);
}

main().catch(error => {
	console.error(`❌ ${error.message}`);
	process.exit(1);
});
