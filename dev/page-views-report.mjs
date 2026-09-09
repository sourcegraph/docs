#!/usr/bin/env node

/**
 * Page views report from Cloudflare's GraphQL Analytics API.
 *
 * Counts human page views on sourcegraph.com for /docs, /changelog and
 * /blog over the last 90 days and writes two Markdown reports to logs/:
 * one sorted by path, one sorted by request count.
 *
 * Filters: HTML 200 responses, Bot Management "likely_human", excluding
 * Hetzner (a single hosting provider that dwarfs real German traffic)
 * and China.
 *
 * Requires CLOUDFLARE_API_TOKEN with "Zone > Analytics > Read" on the
 * sourcegraph.com zone.
 *
 * Usage: CLOUDFLARE_API_TOKEN=... node dev/page-views-report.mjs [--days 90]
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const ZONE_TAG =
	process.env.CLOUDFLARE_ZONE_ID ?? 'a168cb2eefa87d19793824cd9bf83f3a';
const HOST = 'sourcegraph.com';
const PATH_PREFIXES = ['/docs', '/changelog', '/blog'];
const EXCLUDED_COUNTRIES = ['CN'];
const EXCLUDED_ASN_DESCRIPTIONS = ['Hetzner Online GmbH'];

// Zone limits reported by the `settings` query: 32 days per query,
// 90 days of history, 10,000 rows per page.
const MAX_WINDOW_DAYS = 30;
const MAX_HISTORY_DAYS = 90;
const PAGE_SIZE = 10000;

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

const LOGS_DIR = path.join(
	path.dirname(path.dirname(fileURLToPath(import.meta.url))),
	'logs'
);

const QUERY = `
query PageViews($zoneTag: string!, $filter: ZoneHttpRequestsAdaptiveGroupsFilter_InputObject!) {
	viewer {
		zones(filter: {zoneTag: $zoneTag}) {
			httpRequestsAdaptiveGroups(limit: ${PAGE_SIZE}, filter: $filter, orderBy: [count_DESC]) {
				count
				sum { visits }
				dimensions { clientRequestPath }
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
		edgeResponseStatus: 200,
		edgeResponseContentTypeName: 'html',
		botManagementDecision: 'likely_human',
		clientASNDescription_notin: EXCLUDED_ASN_DESCRIPTIONS,
		clientCountryName_notin: EXCLUDED_COUNTRIES,
		OR: PATH_PREFIXES.flatMap(prefix => [
			{clientRequestPath: prefix},
			{clientRequestPath_like: `${prefix}/%`}
		])
	};
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
		const pagePath = normalizePath(row.dimensions.clientRequestPath);
		const totals = rowsByPath.get(pagePath) ?? {requests: 0, visits: 0};
		totals.requests += row.count;
		totals.visits += row.sum.visits;
		rowsByPath.set(pagePath, totals);
	}
}

// Merge trailing-slash variants of the same page.
function normalizePath(pagePath) {
	return pagePath.length > 1 ? pagePath.replace(/\/+$/, '') : pagePath;
}

function formatReport({title, start, end, rows}) {
	const totalRequests = rows.reduce((sum, row) => sum + row.requests, 0);
	const totalVisits = rows.reduce((sum, row) => sum + row.visits, 0);
	const lines = [
		`# ${title}`,
		'',
		`- Window: ${start.toISOString()} to ${end.toISOString()} (UTC)`,
		`- Host: ${HOST}; paths: ${PATH_PREFIXES.join(', ')}`,
		`- Filters: HTML 200 responses; Bot Management likely_human; ` +
			`excluding ASN ${EXCLUDED_ASN_DESCRIPTIONS.join(', ')}; ` +
			`excluding countries ${EXCLUDED_COUNTRIES.join(', ')}`,
		`- Totals: ${rows.length} paths, ${totalRequests} requests, ${totalVisits} visits`,
		'- Counts are adaptive-sampled estimates. Visits = requests whose ' +
			"referrer is not sourcegraph.com (Cloudflare's page-view proxy).",
		'',
		'| Path | Requests | Visits |',
		'| --- | ---: | ---: |',
		...rows.map(row => `| ${row.path} | ${row.requests} | ${row.visits} |`),
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

	const rows = [...rowsByPath.entries()].map(([pagePath, totals]) => ({
		path: pagePath,
		...totals
	}));

	fs.mkdirSync(LOGS_DIR, {recursive: true});
	const reports = [
		{
			file: 'page-views-by-path.md',
			title: `Page views by path (last ${days} days)`,
			rows: [...rows].sort((a, b) => a.path.localeCompare(b.path))
		},
		{
			file: 'page-views-by-count.md',
			title: `Page views by request count (last ${days} days)`,
			rows: [...rows].sort(
				(a, b) =>
					b.requests - a.requests || a.path.localeCompare(b.path)
			)
		}
	];
	for (const report of reports) {
		const target = path.join(LOGS_DIR, report.file);
		fs.writeFileSync(target, formatReport({...report, start, end}));
		console.log(`✅ Wrote ${path.relative(process.cwd(), target)}`);
	}
	console.log(`\n${rows.length} paths total.`);
}

main().catch(error => {
	console.error(`❌ ${error.message}`);
	process.exit(1);
});
