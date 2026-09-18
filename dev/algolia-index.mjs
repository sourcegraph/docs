#!/usr/bin/env node
// Build the Algolia search index for the docs site from the contentlayer output.
//
// Records follow the DocSearch shape the search modal already understands
// (hierarchy.lvl0..lvl6, content, type, url, anchor), but `hierarchy.lvl0` is
// the product the page belongs to (Agentic Batch Changes, Deep Search, ...)
// instead of the sidebar separator the Algolia crawler used, and every record
// carries `product` / `section` facets plus DocSearch `weight` fields so the
// index's customRanking has something to rank on.
//
// Usage:
//   node dev/algolia-index.mjs                  # build + push to `sourcegraph_docs`
//   node dev/algolia-index.mjs --dry-run        # build only; writes .algolia/records.ndjson + settings.json
//   node dev/algolia-index.mjs --index NAME     # push to another index
//   node dev/algolia-index.mjs --stats          # print product/type distribution (also on push)
//
// Requires `pnpm exec contentlayer2 build` (or a `next build`) to have populated
// `.contentlayer/generated`. Pushing uses `npx @algolia/cli`, which takes the
// credentials from ALGOLIA_APPLICATION_ID / ALGOLIA_ADMIN_API_KEY when set and
// otherwise from the profile stored by `algolia profile add` (local use).

import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import GithubSlugger from 'github-slugger';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const generatedDir = path.join(root, '.contentlayer/generated/Post');
const outDir = path.join(root, '.algolia');

const SITE_URL = 'https://sourcegraph.com/docs';
const DEFAULT_INDEX = 'sourcegraph_docs';
const DEFAULT_APP_ID = 'JSZOJ0ZYVG';
// Consecutive paragraphs under the same heading are merged into chunks of up to
// this many characters; snippets (`attributesToSnippet`) still surface the part
// that matched.
const MAX_CONTENT_LENGTH = 700;
const MIN_CONTENT_LENGTH = 3;
// Only deduplicate substantial prose. Short labels such as "Permissions" can
// be useful on every page where they occur; long identical chunks are usually
// generated-reference boilerplate.
const MIN_DEDUPLICATION_LENGTH = 80;
// Caps that keep generated reference pages (dashboards, alerts, changelog:
// thousands of headings each) from dominating the index. Headings are always
// indexed; only prose chunks are capped.
const MAX_CONTENT_PER_SECTION = 3;
const MAX_CONTENT_PER_PAGE = 600;

const args = process.argv.slice(2);
const flag = name => args.includes(name);
const option = (name, fallback) => {
	const i = args.indexOf(name);
	return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};
const dryRun = flag('--dry-run');
const indexName = option('--index', DEFAULT_INDEX);

// ---------------------------------------------------------------------------
// Product mapping: page URL -> owning navigation topic
// ---------------------------------------------------------------------------

// Pages that are reachable but not linked from the sidebar.
const FALLBACK_PRODUCTS = [
	{prefix: '/getting-started', product: 'Getting started', section: 'Documentation'},
	{prefix: '/how-to', product: 'How-to guides', section: 'Documentation'},
	{prefix: '/dotcom', product: 'Sourcegraph.com', section: 'Documentation'},
	{prefix: '/releases', product: 'Releases', section: 'Documentation'},
	{prefix: '/technical-changelog', product: 'Technical changelog', section: 'Documentation'},
	{prefix: '/legacy', product: 'Legacy', section: 'Documentation'},
	{prefix: '/pricing', product: 'Pricing', section: 'Resources'}
];

async function loadNavigationOwners() {
	const {navigation} = await import(
		path.join(root, 'src/data/navigation.ts')
	);
	// href -> {product, section}. Registered in navigation order and first
	// registration wins, so a page linked from two places (e.g. the Cody CLI
	// page under both "Cody" and "Developer tools") belongs to the first.
	const owners = new Map();
	const normalize = href => href.replace(/[#?].*$/, '').replace(/\/+$/, '') || '/';
	const register = (href, owner) => {
		if (!href || href.startsWith('http')) return;
		const key = normalize(href);
		if (!owners.has(key)) owners.set(key, owner);
	};
	const topics = navigation.flatMap(group =>
		group.topics.map(topic => ({...topic, section: group.separator}))
	);
	// A single-page topic whose page lives under another topic's path (e.g.
	// "Install Cody CLI" at /cody/clients/install-cli under "Cody" at /cody) is a
	// shortcut, not a product of its own; the page belongs to the enclosing
	// topic. Topics with their own sections (e.g. "Sourcegraph MCP server" at
	// /api/mcp under /api) stay separate products.
	const productOf = topic => {
		const href = normalize(topic.href ?? '');
		const parent =
			!topic.sections?.length &&
			topics.find(
				other =>
					other !== topic &&
					other.href &&
					normalize(other.href) !== href &&
					isPathPrefix(normalize(other.href), href)
			);
		return parent ? productOf(parent) : {product: topic.title, section: topic.section};
	};
	for (const topic of topics) {
		{
			const owner = productOf(topic);
			register(topic.href, owner);
			for (const sec of topic.sections ?? []) {
				register(sec.href, owner);
				for (const sub of sec.subsections ?? []) register(sub.href, owner);
			}
		}
	}
	return owners;
}

function isPathPrefix(prefix, url) {
	return url === prefix || url.startsWith(prefix + '/');
}

function resolveOwner(url, owners) {
	let best;
	for (const [href, owner] of owners) {
		if (isPathPrefix(href, url) && (!best || href.length > best.href.length)) {
			best = {href, owner};
		}
	}
	if (best) return best.owner;
	const fallback = FALLBACK_PRODUCTS.find(f => isPathPrefix(f.prefix, url));
	if (fallback) return {product: fallback.product, section: fallback.section};
	return {product: 'Sourcegraph Docs', section: 'Documentation'};
}

// ---------------------------------------------------------------------------
// Markdown/MDX -> plain text blocks
// ---------------------------------------------------------------------------

const regXFenceLine = /^\s*(`{3,}|~{3,})/;

// Same walk as contentlayer.config.ts: drop fenced code blocks so `# comment`
// lines inside them are not taken for headings and code is not indexed as prose.
function stripFencedCodeBlocks(markdown) {
	const kept = [];
	let openFence;
	for (const line of markdown.split('\n')) {
		const fence = line.match(regXFenceLine)?.[1];
		if (openFence) {
			const closes =
				fence !== undefined &&
				fence[0] === openFence[0] &&
				fence.length >= openFence.length &&
				line.trim() === fence;
			if (closes) openFence = undefined;
		} else if (fence) {
			openFence = fence;
		} else {
			kept.push(line);
		}
	}
	return kept.join('\n');
}

function stripMdxNoise(markdown) {
	// Contentlayer's body.raw excludes frontmatter. Strip it explicitly too so
	// this remains true if the indexer's input changes in the future.
	markdown = markdown.replace(/^---\s*\n[\s\S]*?\n---\s*(?:\n|$)/, '');
	// Inline code spans keep their contents verbatim: `<YOUR-CONFIG-FILE>` in a
	// heading is text, not a tag.
	const codeSpans = [];
	const protect = markdown.replace(/`[^`\n]*`/g, span => {
		codeSpans.push(span);
		return `\u0000${codeSpans.length - 1}\u0000`;
	});
	return protect
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
		.replace(/^\s*(import|export)\b[^\n]*(\n\s+[^\n]*)*/gm, '')
		// Opening/closing/self-closing JSX or HTML tags, possibly spanning lines.
		.replace(/<\/?[A-Za-z][\w.-]*(?:\s[^<>]*?)?\/?>/g, '\n')
		.replace(/\u0000(\d+)\u0000/g, (_, i) => codeSpans[Number(i)]);
}

// Inline cleanup for a single text block.
function cleanInline(text) {
	return text
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links -> text
		.replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1') // reference links
		.replace(/`([^`]*)`/g, '$1') // inline code
		.replace(/\{\s*(['"`])\s*\1\s*\}/g, ' ') // {' '} JSX spacers
		.replace(/\{#[\w-]+\}\s*$/, '') // {#custom-heading-id}
		.replace(/(\*\*|__)(.*?)\1/g, '$2')
		.replace(/(^|\s)[*_](\S.*?\S|\S)[*_](?=[\s.,;:!?)]|$)/g, '$1$2')
		.replace(/~~(.*?)~~/g, '$1')
		.replace(/\\([\\`*_{}[\]()#+\-.!|])/g, '$1')
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/\s+/g, ' ')
		.trim();
}

function headingTitle(rawContent) {
	// Same as contentlayer.config.ts: '## [Text](/link)' -> 'Text'.
	const match = rawContent.match(/\[([^\]]+)\]\([^)]+\)/);
	return match ? match[1] : rawContent;
}

const regXHeading = /^ *(#{1,6})\s+(.+)/;
const regXListItem = /^\s*(?:[-*+]|\d+[.)])\s+/;
const regXTableSeparator = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;

// Yields {kind: 'heading', level, title} and {kind: 'text', text} in document order.
function* blocks(markdown) {
	const lines = stripMdxNoise(stripFencedCodeBlocks(markdown)).split('\n');
	let paragraph = [];
	const flush = function* () {
		if (paragraph.length) {
			const text = cleanInline(paragraph.join(' '));
			paragraph = [];
			if (text) yield {kind: 'text', text};
		}
	};
	for (const rawLine of lines) {
		const line = rawLine.replace(/^\s*>\s?/, ''); // blockquote prefix
		const heading = line.match(regXHeading);
		if (heading) {
			yield* flush();
			const title = cleanInline(headingTitle(heading[2]));
			if (title) yield {kind: 'heading', level: heading[1].length, title};
			continue;
		}
		if (!line.trim() || /^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
			yield* flush();
			continue;
		}
		if (regXListItem.test(line)) {
			yield* flush();
			paragraph.push(line.replace(regXListItem, '').replace(/^\[[ xX]\]\s+/, ''));
			continue;
		}
		if (/^\s*\|/.test(line)) {
			yield* flush();
			if (regXTableSeparator.test(line)) continue;
			const cells = line
				.trim()
				.replace(/^\||\|$/g, '')
				.split('|')
				.map(c => cleanInline(c))
				.filter(Boolean);
			if (cells.length) yield {kind: 'text', text: cells.join(' — ')};
			continue;
		}
		paragraph.push(line);
	}
	yield* flush();
}

// ---------------------------------------------------------------------------
// Records
// ---------------------------------------------------------------------------

const LEVEL_WEIGHT = {lvl1: 100, lvl2: 90, lvl3: 80, lvl4: 70, lvl5: 60, lvl6: 50, content: 0};

function pageTitleFromPath(url) {
	const last = url.split('/').filter(Boolean).pop() ?? 'Sourcegraph Docs';
	return last.replace(/[-_]+/g, ' ').replace(/^\w/, c => c.toUpperCase());
}

function contentHash(content) {
	return createHash('sha256')
		.update(content.toLowerCase().replace(/\s+/g, ' ').trim())
		.digest('hex');
}

function buildPageRecords(post, owner, deduplication) {
	const url = post.url;
	const pageUrl = SITE_URL + url;
	const slugger = new GithubSlugger();
	const pageRank = Math.round((post.seoPriority ?? 0.5) * 100);
	const records = [];
	let position = 0;

	const hierarchy = {
		lvl0: owner.product,
		lvl1: post.title ?? null,
		lvl2: null,
		lvl3: null,
		lvl4: null,
		lvl5: null,
		lvl6: null
	};
	let anchor = null;

	const push = (type, content) => {
		const rec = {
			objectID: `${url}#${position}`,
			type,
			content,
			anchor,
			url: anchor ? `${pageUrl}#${anchor}` : pageUrl,
			url_without_anchor: pageUrl,
			hierarchy: {...hierarchy},
			product: owner.product,
			section: owner.section,
			weight: {pageRank, level: LEVEL_WEIGHT[type], position}
		};
		records.push(rec);
		position += 1;
	};

	// Prose under the current heading, merged into chunks and flushed when the
	// next heading starts.
	let pending = [];
	let contentInSection = 0;
	let contentInPage = 0;
	const flushContent = () => {
		let chunk = '';
		const chunks = [];
		for (const text of pending) {
			if (chunk && chunk.length + 1 + text.length > MAX_CONTENT_LENGTH) {
				chunks.push(chunk);
				chunk = '';
			}
			chunk = chunk ? `${chunk} ${text}` : text;
		}
		if (chunk) chunks.push(chunk);
		pending = [];
		for (const c of chunks) {
			if (contentInSection >= MAX_CONTENT_PER_SECTION || contentInPage >= MAX_CONTENT_PER_PAGE) break;
			push('content', c.slice(0, MAX_CONTENT_LENGTH));
			contentInSection += 1;
			contentInPage += 1;
		}
		contentInSection = 0;
	};

	let sawH1 = false;
	const ensurePageRecord = () => {
		if (sawH1) return;
		sawH1 = true;
		hierarchy.lvl1 ??= pageTitleFromPath(url);
		push('lvl1', null);
	};

	for (const block of blocks(post.body.raw)) {
		if (block.kind === 'heading') {
			flushContent();
			const id = slugger.slug(block.title);
			if (block.level === 1 && !sawH1) {
				// The first H1 is the page title and the page record itself.
				sawH1 = true;
				hierarchy.lvl1 = block.title;
				anchor = null;
				push('lvl1', null);
				continue;
			}
			ensurePageRecord();
			// A second H1 is treated like an H2 so it stays under the page.
			const level = Math.min(Math.max(block.level, 2), 6);
			hierarchy[`lvl${level}`] = block.title;
			for (let l = level + 1; l <= 6; l++) hierarchy[`lvl${l}`] = null;
			anchor = id;
			push(`lvl${level}`, null);
			continue;
		}
		if (block.text === 'On this page') continue;
		if (block.text.length < MIN_CONTENT_LENGTH) continue;
		ensurePageRecord();
		if (block.text.length >= MIN_DEDUPLICATION_LENGTH) {
			const hash = contentHash(block.text);
			if (deduplication.hashes.has(hash)) {
				deduplication.removed += 1;
				continue;
			}
			deduplication.hashes.add(hash);
		}
		pending.push(block.text);
	}
	flushContent();
	ensurePageRecord();
	return records;
}

function loadPosts() {
	if (!fs.existsSync(generatedDir)) {
		throw new Error(
			`${path.relative(root, generatedDir)} not found; run \`pnpm exec contentlayer2 build\` first`
		);
	}
	return fs
		.readdirSync(generatedDir)
		.filter(f => f.endsWith('.json') && !f.startsWith('_'))
		.map(f => JSON.parse(fs.readFileSync(path.join(generatedDir, f), 'utf8')))
		.sort((a, b) => a.url.localeCompare(b.url));
}

function deduplicateContent(records) {
	const seen = new Set();
	let removed = 0;
	const unique = records.filter(record => {
		if (record.type !== 'content' || record.content.length < MIN_DEDUPLICATION_LENGTH) {
			return true;
		}
		const hash = contentHash(record.content);
		if (seen.has(hash)) {
			removed += 1;
			return false;
		}
		seen.add(hash);
		return true;
	});
	return {records: unique, removed};
}

// Standard DocSearch index settings plus our product/section facets.
const settings = {
	searchableAttributes: [
		'unordered(hierarchy.lvl1)',
		'unordered(hierarchy.lvl2)',
		'unordered(hierarchy.lvl3)',
		'unordered(hierarchy.lvl4)',
		'unordered(hierarchy.lvl5)',
		'unordered(hierarchy.lvl6)',
		'content'
	],
	attributesToRetrieve: [
		'hierarchy',
		'content',
		'anchor',
		'url',
		'url_without_anchor',
		'type',
		'product',
		'section'
	],
	attributesToHighlight: ['hierarchy', 'content'],
	attributesToSnippet: ['content:10'],
	attributesForFaceting: ['product', 'section', 'type'],
	// Keep the page record plus at most one matching heading or prose chunk.
	attributeForDistinct: 'url_without_anchor',
	distinct: 2,
	// Page titles before headings before prose; pageRank (from seoPriority)
	// only breaks ties within a level, otherwise a landing page's headings
	// would outrank its sibling pages.
	customRanking: [
		'desc(weight.level)',
		'desc(weight.pageRank)',
		'asc(weight.position)'
	],
	ranking: ['words', 'filters', 'typo', 'attribute', 'proximity', 'exact', 'custom'],
	highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
	highlightPostTag: '</span>',
	// cspell:disable-next-line -- Algolia's setting name
	minWordSizefor1Typo: 3,
	// cspell:disable-next-line -- Algolia's setting name
	minWordSizefor2Typos: 7,
	allowTyposOnNumericTokens: false,
	minProximity: 1,
	removeStopWords: ['en'],
	ignorePlurals: ['en'],
	advancedSyntax: true,
	attributeCriteriaComputedByMinProximity: true,
	removeWordsIfNoResults: 'allOptional',
	hitsPerPage: 20
};

const synonyms = [
	{objectID: 'api-key-access-token', type: 'synonym', synonyms: ['API key', 'access token']},
	{objectID: 'sso-saml', type: 'synonym', synonyms: ['SSO', 'SAML', 'single sign-on']},
	{objectID: 'login-sign-in', type: 'synonym', synonyms: ['login', 'sign in']},
	{objectID: 'repo-repository', type: 'synonym', synonyms: ['repo', 'repository']},
	{objectID: 'auth-authentication', type: 'synonym', synonyms: ['auth', 'authentication']},
	{objectID: 'perms-permissions', type: 'synonym', synonyms: ['perms', 'permissions']},
	{objectID: 'src-cli', type: 'synonym', synonyms: ['src-cli', 'src CLI']}
];

// ---------------------------------------------------------------------------
// Push via the Algolia CLI
// ---------------------------------------------------------------------------

function algolia(cliArgs) {
	const credentialArgs = [];
	if (process.env.ALGOLIA_ADMIN_API_KEY) {
		credentialArgs.push('--application-id', process.env.ALGOLIA_APPLICATION_ID ?? DEFAULT_APP_ID);
		credentialArgs.push('--api-key', process.env.ALGOLIA_ADMIN_API_KEY);
	}
	const full = ['-y', '@algolia/cli', ...cliArgs, ...credentialArgs];
	console.log(`$ npx ${cliArgs.join(' ')}`);
	const res = spawnSync('npx', full, {stdio: 'inherit', cwd: root});
	if (res.status !== 0) {
		throw new Error(`algolia ${cliArgs[0]} ${cliArgs[1]} failed with exit code ${res.status}`);
	}
}

function printStats(records) {
	const count = (key, fn) => {
		const m = new Map();
		for (const r of records) {
			const k = fn(r);
			m.set(k, (m.get(k) ?? 0) + 1);
		}
		console.log(`\n${key}:`);
		for (const [k, v] of [...m].sort((a, b) => b[1] - a[1])) {
			console.log(`  ${String(v).padStart(5)}  ${k}`);
		}
	};
	count('records per product', r => `${r.product}  (${r.section})`);
	count('records per type', r => r.type);
}

async function main() {
	const owners = await loadNavigationOwners();
	const posts = loadPosts().filter(
		p => !p.preview && p.url !== '/technical-changelog'
	);
	const allRecords = [];
	const pages = [];
	const deduplication = {hashes: new Set(), removed: 0};
	for (const post of posts) {
		const owner = resolveOwner(post.url, owners);
		pages.push({url: post.url, ...owner});
		allRecords.push(...buildPageRecords(post, owner, deduplication));
	}
	const {records, removed: duplicateRecords} = deduplicateContent(allRecords);
	const removed = deduplication.removed + duplicateRecords;

	fs.mkdirSync(outDir, {recursive: true});
	const recordsFile = path.join(outDir, 'records.ndjson');
	const settingsFile = path.join(outDir, 'settings.json');
	const synonymsFile = path.join(outDir, 'synonyms.ndjson');
	fs.writeFileSync(recordsFile, records.map(r => JSON.stringify(r)).join('\n') + '\n');
	fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2) + '\n');
	fs.writeFileSync(synonymsFile, synonyms.map(s => JSON.stringify(s)).join('\n') + '\n');
	fs.writeFileSync(
		path.join(outDir, 'pages.json'),
		JSON.stringify(pages, null, 2) + '\n'
	);
	console.log(
		`Built ${records.length} records for ${pages.length} pages (${removed} duplicate content blocks removed) -> ${path.relative(root, recordsFile)}`
	);
	if (flag('--stats') || !dryRun) printStats(records);

	if (dryRun) return;

	// Build into a temporary index and move it over the live one so searches
	// never see a half-populated index.
	const tmpIndex = `${indexName}_tmp`;
	algolia(['settings', 'import', tmpIndex, '-F', settingsFile, '--wait']);
	algolia(['objects', 'import', tmpIndex, '-F', recordsFile, '--wait']);
	algolia(['synonyms', 'import', tmpIndex, '-F', synonymsFile, '--replace-existing-synonyms', '--wait']);
	algolia(['indices', 'move', tmpIndex, indexName, '--confirm', '--wait']);
	console.log(`\nIndex "${indexName}" updated with ${records.length} records.`);
}

main().catch(err => {
	console.error(err.message ?? err);
	process.exit(1);
});
