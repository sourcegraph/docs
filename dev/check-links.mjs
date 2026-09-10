#!/usr/bin/env node

/**
 * Dead link checker for MDX documentation files.
 * Transparency note; This is AI generated, if it doesn't detect things correctly 
 * please blame this script, and use AI to improve its detection. It's proven massively
 * helpful during larger docs refactors so far.
 * 
 * Checks for:
 * - Broken internal links (markdown and JSX/HTML style)
 * - Links whose case differs from the real path (work on macOS, 404 on Linux)
 * - Missing anchor/heading references
 * - Invalid file paths
 * - Absolute links to this site (https://sourcegraph.com/docs/..., the legacy
 *   https://docs.sourcegraph.com/... host, http://, //, www.), which should be
 *   relative links; the finding proposes one, following src/data/redirects.ts
 * - With --check-external, external links on added lines that return 404 or 410
 * 
 * Usage: node dev/check-links.mjs [options]
 *   --check-anchors        Also validate #anchors against headings
 *   --root <dir>           Repository to check (default: this repository)
 *   --format <name>        Output as text (default), json, or markdown
 *   --baseline <file>      Only report findings absent from this JSON file
 *                          (produced by --format json on another revision)
 *   --link-base <url>      Markdown output links each file path to <url>/<path>,
 *                          e.g. https://github.com/sourcegraph/docs/blob/<branch>
 *   --diff <file>          Unified diff of the change under review, e.g. from
 *                          `git diff -U0 origin/main`. Markdown output splits
 *                          findings into outbound (in a file the diff touches) and
 *                          inbound (elsewhere); the added lines scope the two flags below
 *   --check-external       Request every external link on an added line and report
 *                          404s and 410s. Follows redirects; ignores #anchors, other
 *                          statuses, and network errors. Requires --diff
 *   --review <file>        Write a GitHub pull request review (JSON body for
 *                          POST /repos/{owner}/{repo}/pulls/{n}/reviews) with one
 *                          suggested-change comment per added line that has a fix
 *
 * Exits 1 when any finding is reported.
 */

import fs from 'fs';
import path from 'path';
import GithubSlugger from 'github-slugger';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse CLI flags
const args = process.argv.slice(2);
const CHECK_ANCHORS = args.includes('--check-anchors');
const ROOT_DIR = path.resolve(flagValue('--root') ?? path.dirname(__dirname));
const FORMAT = flagValue('--format') ?? 'text';
const BASELINE_FILE = flagValue('--baseline');
const LINK_BASE = flagValue('--link-base')?.replace(/\/$/, '');
const DIFF = parseDiff(flagValue('--diff'));
const CHECK_EXTERNAL = args.includes('--check-external');
const REVIEW_FILE = flagValue('--review');

if (CHECK_EXTERNAL && !DIFF) {
	throw new Error('--check-external needs --diff, to know which lines were added');
}

// Files and added lines of a unified diff, with paths relative to the repository:
// { files: Set<'docs/foo.mdx'>, addedLines: Map<'docs/foo.mdx', Set<lineNumber>> }.
// Works with any amount of context, so `git diff` and `git diff -U0` both do.
function parseDiff(file) {
	if (!file) return undefined;
	const files = new Set();
	const addedLines = new Map();
	let currentFile;
	let lineNumber;
	for (const line of fs.readFileSync(file, 'utf-8').split('\n')) {
		if (line.startsWith('diff --git ')) {
			currentFile = undefined;
		} else if (line.startsWith('+++ ') && !currentFile) {
			// `+++ /dev/null` is a deleted file, which has no added lines
			currentFile = line.slice(4).replace(/^b\//, '');
			if (currentFile === '/dev/null') continue;
			files.add(currentFile);
			addedLines.set(currentFile, new Set());
		} else if (line.startsWith('@@ ')) {
			lineNumber = Number(line.match(/^@@ -\S+ \+(\d+)/)[1]);
		} else if (line.startsWith('+') && currentFile) {
			addedLines.get(currentFile).add(lineNumber++);
		} else if (line.startsWith(' ')) {
			lineNumber++;
		}
	}
	return { files, addedLines };
}

const DOCS_DIR = path.join(ROOT_DIR, 'docs');
// Files whose links are checked. Only .mdx files become site routes; see
// `filePathPattern` in contentlayer.config.ts.
const SOURCE_EXTENSIONS = ['.md', '.mdx'];
const ROUTE_EXTENSIONS = ['.mdx'];

function flagValue(name) {
	const index = args.indexOf(name);
	return index === -1 ? undefined : args[index + 1];
}

// Sorted relative paths of every file under dir, optionally limited to some
// extensions. Sorted so foo.mdx precedes foo/index.mdx; when both exist the
// site serves the first match (allPosts.find), so the first file owns the route.
export function listFiles(dir, extensions) {
	if (!fs.existsSync(dir)) return [];
	return fs
		.readdirSync(dir, { recursive: true, withFileTypes: true })
		.filter(entry => entry.isFile() && (!extensions || extensions.includes(path.extname(entry.name))))
		.map(entry => path.relative(dir, path.join(entry.parentPath, entry.name)))
		.sort();
}

// Regex patterns for extracting links
const MARKDOWN_LINK_REGEX = /\[([^\]]*)\]\(([^)]+)\)/g;
const JSX_HREF_REGEX = /href=["']([^"']+)["']/g;
const SRC_ATTR_REGEX = /src=["']([^"']+)["']/g;

// A fence opener/closer is a run of 3+ backticks or tildes at the start of a line.
const FENCE_LINE_REGEX = /^\s*(`{3,}|~{3,})/;

// Blank out fenced code blocks, keeping line numbers intact, so `# comment`
// lines and example links inside them are ignored. Walks line by line: a naive
// /```[\s\S]*?```/ regex also matches inline backtick runs in prose (e.g.
// `"true```), which flips every later fence pairing.
function stripFencedCodeBlocks(content) {
	let openFence;
	return content.split('\n').map(line => {
		const fence = line.match(FENCE_LINE_REGEX)?.[1];
		if (openFence) {
			const closesOpenFence =
				fence !== undefined &&
				fence[0] === openFence[0] &&
				fence.length >= openFence.length &&
				line.trim() === fence;
			if (closesOpenFence) {
				openFence = undefined;
			}
			return '';
		}
		if (fence) {
			openFence = fence;
			return '';
		}
		return line;
	}).join('\n');
}

// Extract anchor targets from MDX content: heading slugs, plus explicit
// <a name="..."> and id="..." attributes
export function extractHeadings(content) {
	const slugger = new GithubSlugger();
	const headingRegex = /^#{1,6}\s+(.+)$/gm;
	const explicitAnchorRegex = /<[a-zA-Z][^>]*\s(?:id|name)=["']([^"']+)["']/g;
	const headings = new Set();
	
	const contentWithoutCode = stripFencedCodeBlocks(content);
	
	let match;
	while ((match = headingRegex.exec(contentWithoutCode)) !== null) {
		// rehype-slug slugs the heading's full text, with links reduced to their text:
		// "How can I use [GitHub expression syntax](url) literally" -> "How can I use GitHub expression syntax literally"
		const title = match[1].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
		headings.add(slugger.slug(title.trim()));
	}
	
	while ((match = explicitAnchorRegex.exec(contentWithoutCode)) !== null) {
		headings.add(match[1]);
	}

	return headings;
}

// Site route for a file under docs/: foo/bar.mdx -> /foo/bar, foo/index.mdx -> /foo, index.mdx -> /
export function routeFor(file) {
	return '/' + file.replace(/\.mdx$/, '').replace(/(^|\/)index$/, '');
}

// Get all MDX files and build a map of valid paths
function buildPathMap() {
	const files = listFiles(DOCS_DIR, ROUTE_EXTENSIONS);
	const pathMap = new Map();
	// Lowercased route -> real route, to detect case mismatches
	const routesByLowerCase = new Map();
	const headingsMap = new Map();
	// Absolute file path -> headings, for same-page #anchor links
	const headingsByFile = new Map();
	
	for (const file of files) {
		const fullPath = path.join(DOCS_DIR, file);
		const headings = extractHeadings(fs.readFileSync(fullPath, 'utf-8'));
		headingsByFile.set(fullPath, headings);
		
		const routePath = routeFor(file);
		if (pathMap.has(routePath)) continue;
		
		// Also allow trailing slash variant
		pathMap.set(routePath, fullPath);
		pathMap.set(routePath + '/', fullPath);
		routesByLowerCase.set(routePath.toLowerCase(), routePath);
		headingsMap.set(routePath, headings);
		headingsMap.set(routePath + '/', headings);
	}
	
	return {
		pathMap,
		routesByLowerCase,
		headingsMap,
		headingsByFile,
		assetsByLowerCase: buildAssetMap(),
		redirects: loadRedirects()
	};
}

// Source route -> destination of src/data/redirects.ts. The middleware uses the
// first rule whose source equals the requested path, so first entry wins here too.
function loadRedirects() {
	const redirects = new Map();
	const source = fs.readFileSync(path.join(ROOT_DIR, 'src/data/redirects.ts'), 'utf-8');
	const ruleRegex = /source:\s*(['"])(.*?)\1,\s*destination:\s*(['"])(.*?)\3/gs;
	for (const [, , from, , to] of source.matchAll(ruleRegex)) {
		if (!redirects.has(from)) redirects.set(from, to);
	}
	return redirects;
}

// Lowercased link path -> real link path, for files under public/ and docs/
// (images, PDFs, ...). An enumerated map rather than fs.existsSync, which is
// case-insensitive on macOS and would hide links that 404 on Linux.
function buildAssetMap() {
	const assetsByLowerCase = new Map();
	for (const dir of ['public', 'docs']) {
		for (const file of listFiles(path.join(ROOT_DIR, dir))) {
			const linkPath = '/' + file;
			assetsByLowerCase.set(linkPath.toLowerCase(), linkPath);
		}
	}
	return assetsByLowerCase;
}

// Parse and validate links in a single file
function extractLinks(content, filePath) {
	const links = [];
	
	const contentWithoutCode = stripFencedCodeBlocks(content);
	
	// Extract markdown links [text](url)
	let match;
	while ((match = MARKDOWN_LINK_REGEX.exec(contentWithoutCode)) !== null) {
		const url = match[2].trim();
		const lineNumber = contentWithoutCode.substring(0, match.index).split('\n').length;
		links.push({ url, lineNumber, type: 'markdown' });
	}
	
	// Reset lastIndex for href regex
	JSX_HREF_REGEX.lastIndex = 0;
	while ((match = JSX_HREF_REGEX.exec(contentWithoutCode)) !== null) {
		const url = match[1].trim();
		const lineNumber = contentWithoutCode.substring(0, match.index).split('\n').length;
		links.push({ url, lineNumber, type: 'href' });
	}

	// Reset lastIndex for src regex  
	SRC_ATTR_REGEX.lastIndex = 0;
	while ((match = SRC_ATTR_REGEX.exec(contentWithoutCode)) !== null) {
		const url = match[1].trim();
		const lineNumber = contentWithoutCode.substring(0, match.index).split('\n').length;
		links.push({ url, lineNumber, type: 'src' });
	}
	
	return links;
}

// Absolute links to this site, in every form the docs have used: http or https,
// scheme-relative, www., the legacy docs.sourcegraph.com host, or sourcegraph.com/docs.
// Links pinned to an old version (/@5.1/..., /v/5.1/...) are external: the
// middleware sends them to that version's own site.
const SELF_LINK_REGEX = /^(?:https?:)?\/\/(?:www\.)?(?:docs\.sourcegraph\.com|sourcegraph\.com\/docs)(?=[/#?]|$)(?!\/@|\/v\/)/i;

export function isSelfLink(url) {
	return SELF_LINK_REGEX.test(url);
}

// The relative form of an absolute self-link: https://sourcegraph.com/docs/a/b/#c -> /a/b#c.
// A ?query has no meaning on a docs page and is dropped.
function relativeSelfLink(url) {
	const [pathAndQuery, anchor] = url.replace(SELF_LINK_REGEX, '').split('#');
	const route = pathAndQuery.split('?')[0].replace(/\/$/, '') || '/';
	return anchor ? `${route}#${anchor}` : route;
}

// Absolute self-links break on preview deployments and local dev, and hide moved
// pages behind redirects, so they are findings even when the target exists. The
// fix is the relative link, following src/data/redirects.ts when the page moved.
// The redirect destination's own #anchor wins over the link's, like the middleware.
function validateSelfLink(url, currentFile, maps) {
	const relative = relativeSelfLink(url);
	const anchor = relative.split('#')[1];
	const visited = new Set();
	let candidate = relative;
	while (true) {
		const moved = candidate === relative ? '' : ' to a moved page';
		const problem = validateLink({ url: candidate }, currentFile, maps);
		if (!problem) {
			return { error: `Absolute self-link${moved}; use "${candidate}" instead`, fix: candidate };
		}
		const destination = maps.redirects.get(candidate.split('#')[0]);
		if (!destination || visited.has(destination)) {
			const replaced = moved ? `; "${candidate}" replaced it, but` : ', and';
			return { error: `Absolute self-link${moved}${replaced} ${problem[0].toLowerCase()}${problem.slice(1)}` };
		}
		visited.add(destination);
		candidate = isSelfLink(destination) ? relativeSelfLink(destination) : destination;
		if (anchor && !candidate.includes('#') && !/^https?:/.test(candidate)) {
			candidate += `#${anchor}`;
		}
	}
}

// Check if a link is valid. Returns null, an error string, or { error, fix }.
function validateLink(link, currentFile, maps) {
	const { pathMap, routesByLowerCase, headingsMap, headingsByFile, assetsByLowerCase } = maps;
	const { url } = link;

	if (isSelfLink(url)) {
		return validateSelfLink(url, currentFile, maps);
	}
	
	// Skip external links, mailto, tel, javascript, etc.
	if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//') ||
		url.startsWith('mailto:') || url.startsWith('tel:') ||
		url.startsWith('javascript:') || url.startsWith('data:') ||
		url.startsWith('command:')) {
		return null;
	}
	
	// Skip angle-bracket URLs like <https://example.com>
	if (url.startsWith('<http') || url.startsWith('<https')) {
		return null;
	}
	
	// Skip email addresses without mailto: prefix (common shorthand)
	if (url.includes('@') && !url.startsWith('/') && !url.includes('/')) {
		return null;
	}
	
	// Handle anchor-only links (#heading)
	if (url.startsWith('#')) {
		if (!CHECK_ANCHORS) {
			return null;
		}
		const anchor = url.substring(1);
		const headings = headingsByFile.get(currentFile);
		
		if (headings && !headings.has(anchor)) {
			return `Anchor "${anchor}" not found in current file`;
		}
		return null;
	}
	
	// Parse path and anchor
	const [linkPath, anchor] = url.split('#');
	
	// Handle relative paths
	let resolvedPath;
	if (linkPath.startsWith('/')) {
		resolvedPath = linkPath;
	} else {
		// Relative path - resolve from current file's directory
		// For index.mdx files, resolve from parent since the URL is the folder itself
		let currentDir = path.dirname(currentFile);
		if (path.basename(currentFile) === 'index.mdx') {
			currentDir = path.dirname(currentDir);
		}
		const relativeToDocs = path.relative(DOCS_DIR, currentDir);
		resolvedPath = '/' + path.join(relativeToDocs, linkPath).replace(/\\/g, '/');
	}
	
	// Normalize path (remove trailing slash for comparison, handle ..)
	resolvedPath = path.normalize(resolvedPath).replace(/\\/g, '/');
	if (!resolvedPath.startsWith('/')) {
		resolvedPath = '/' + resolvedPath;
	}
	
	// Check if it's a valid route
	if (pathMap.has(resolvedPath)) {
		// If there's an anchor, validate it (only when flag is enabled)
		if (CHECK_ANCHORS && anchor) {
			const headings = headingsMap.get(resolvedPath);
			if (headings && !headings.has(anchor)) {
				return `Anchor "${anchor}" not found in "${resolvedPath}"`;
			}
		}
		return null;
	}
	
	// Check if it's an asset under public/ or docs/
	const realAsset = assetsByLowerCase.get(resolvedPath.toLowerCase());
	if (realAsset === resolvedPath) {
		return null;
	}
	
	// Same route or asset with different case: resolves on macOS, 404s on the Linux build
	const realPath = realAsset ?? routesByLowerCase.get(
		resolvedPath.replace(/\/$/, '').toLowerCase()
	);
	if (realPath) {
		return `Case mismatch: "${resolvedPath}" should be "${realPath}"`;
	}
	
	// Check if it's a file with extension (like .png, .pdf)
	if (path.extname(resolvedPath)) {
		return `File not found: "${resolvedPath}"`;
	}
	
	return `Page not found: "${resolvedPath}"`;
}

function isAddedLine(file, line) {
	return DIFF?.addedLines.get(file)?.has(line) ?? false;
}

// Find every broken link: [{ file, line, url, error, fix? }]
async function findBrokenLinks() {
	const maps = buildPathMap();
	const findings = [];
	const externalLinks = [];
	
	for (const file of listFiles(DOCS_DIR, SOURCE_EXTENSIONS)) {
		const fullPath = path.join(DOCS_DIR, file);
		const content = fs.readFileSync(fullPath, 'utf-8');
		
		for (const link of extractLinks(content, fullPath)) {
			const location = { file: `docs/${file}`, line: link.lineNumber, url: link.url };
			const problem = validateLink(link, fullPath, maps);
			if (problem) {
				findings.push({ ...location, ...(typeof problem === 'string' ? { error: problem } : problem) });
			} else if (CHECK_EXTERNAL && isExternalLink(link.url) && isAddedLine(location.file, location.line)) {
				externalLinks.push(location);
			}
		}
	}
	
	return [...findings, ...(await findDeadExternalLinks(externalLinks))];
}

// Hosts reserved for examples and documentation (RFC 2606, RFC 6761), never requested
const PLACEHOLDER_HOST_REGEX = /(^|\.)(example\.(com|net|org)|example|test|invalid|localhost|local|internal)$/i;
// Templated URLs like https://<your-host>/ or https://$HOST/, never requested
const PLACEHOLDER_URL_REGEX = /[<>{}$*]/;

function isExternalLink(url) {
	if (!/^https?:\/\//i.test(url) || PLACEHOLDER_URL_REGEX.test(url)) return false;
	try {
		return !PLACEHOLDER_HOST_REGEX.test(new URL(url).hostname);
	} catch {
		return false;
	}
}

// HTTP status of url after redirects, or undefined on a network error or timeout.
// HEAD first; some servers refuse or misreport HEAD, so an error status is
// confirmed with a GET whose body is not read.
async function probeUrl(url) {
	const request = method =>
		fetch(url, {
			method,
			redirect: 'follow',
			signal: AbortSignal.timeout(15_000),
			headers: { 'user-agent': 'sourcegraph-docs-check-links (+https://github.com/sourcegraph/docs)' }
		});
	try {
		let response = await request('HEAD');
		if (response.status >= 400) {
			response = await request('GET');
			await response.body?.cancel();
		}
		return response.status;
	} catch {
		return undefined;
	}
}

// Findings for external links whose target is gone. Only 404 and 410 count: rate
// limits, bot blocks, server errors, and network failures are not the PR's fault.
async function findDeadExternalLinks(links) {
	const urls = [...new Set(links.map(link => link.url.split('#')[0]))];
	const statusByUrl = new Map();
	const queue = [...urls];
	const worker = async () => {
		for (let url = queue.shift(); url !== undefined; url = queue.shift()) {
			statusByUrl.set(url, await probeUrl(url));
		}
	};
	await Promise.all(Array.from({ length: 8 }, worker));

	return links.flatMap(link => {
		const status = statusByUrl.get(link.url.split('#')[0]);
		return status === 404 || status === 410 ? [{ ...link, error: `External link returns HTTP ${status}` }] : [];
	});
}

// Identity of a finding across revisions: line numbers shift, so ignore them
function findingKey({ file, url, error }) {
	return `${file}\n${url}\n${error}`;
}

function withoutBaseline(findings, baselineFile) {
	const baseline = new Set(
		JSON.parse(fs.readFileSync(baselineFile, 'utf-8')).map(findingKey)
	);
	return findings.filter(finding => !baseline.has(findingKey(finding)));
}

function groupByFile(findings) {
	const byFile = new Map();
	for (const finding of findings) {
		if (!byFile.has(finding.file)) {
			byFile.set(finding.file, []);
		}
		byFile.get(finding.file).push(finding);
	}
	return byFile;
}

function formatText(findings) {
	const scope = BASELINE_FILE ? 'new ' : '';
	if (findings.length === 0) {
		return `✅ No ${scope}dead links found!\n`;
	}
	
	const byFile = groupByFile(findings);
	const lines = [
		`❌ Found ${findings.length} ${scope}dead link(s) in ${byFile.size} file(s):\n`
	];
	for (const [file, fileFindings] of byFile) {
		lines.push(`\n📄 ${file}`);
		for (const { line, url, error } of fileFindings) {
			lines.push(`   Line ${line}: ${url}`);
			lines.push(`   └─ ${error}`);
		}
	}
	return lines.join('\n') + '\n';
}

function linkTo(text, url) {
	return url ? `[${text}](${url})` : text;
}

// Markdown list of findings grouped by file, linked to the source when --link-base is set
function markdownFindingList(findings) {
	const lines = [];
	for (const [file, fileFindings] of groupByFile(findings)) {
		// ?plain=1 opens GitHub's code view, where #L<n> anchors work; the rendered
		// Markdown preview ignores them
		const fileUrl = LINK_BASE && `${LINK_BASE}/${file}?plain=1`;
		lines.push(linkTo(`**\`${file}\`**`, fileUrl));
		for (const { line, url, error } of fileFindings) {
			lines.push(`- ${linkTo(`line ${line}`, fileUrl && `${fileUrl}#L${line}`)}: \`${url}\` — ${error}`);
		}
		lines.push('');
	}
	return lines;
}

// Body for a pull request comment. With --diff, findings are split into
// outbound (in a file this PR changed: the PR added or edited a bad link) and
// inbound (in a file it did not: the PR renamed or removed a link target).
function formatMarkdown(findings) {
	if (findings.length === 0) {
		return '### ✅ This PR introduces no broken links\n';
	}
	
	const lines = [`### ❌ This PR introduces ${findings.length} broken link(s)`, ''];
	if (DIFF) {
		const outbound = findings.filter(finding => DIFF.files.has(finding.file));
		const inbound = findings.filter(finding => !DIFF.files.has(finding.file));
		if (outbound.length > 0) {
			lines.push(
				'### Outbound',
				'',
				'Your PR includes links to pages or anchors that do not exist, or absolute links to this site.',
				'',
				...markdownFindingList(outbound)
			);
		}
		if (inbound.length > 0) {
			lines.push(
				'### Inbound',
				'',
				'A change your PR made broke inbound links from elsewhere. ' +
					'Please fix the inbound links on the other pages.',
				'',
				...markdownFindingList(inbound)
			);
		}
	} else {
		lines.push(...markdownFindingList(findings));
	}
	if (findings.some(finding => isSelfLink(finding.url))) {
		lines.push(
			'Write links to this site as relative paths (`/admin/config/site-config`), ' +
				'not `https://sourcegraph.com/docs/…` or `https://docs.sourcegraph.com/…`: ' +
				'absolute links leave the preview deployment and local dev server, and ' +
				'hide moved pages behind redirects.',
			''
		);
	}
	lines.push(
		'Reproduce locally with `pnpm check-links --check-anchors` ' +
			'(see `dev/check-links.mjs`).',
		'',
		'Adding a redirect in `src/data/redirects.ts` does not satisfy this ' +
			'check, because it’s a workaround instead of a fix.'
	);
	return lines.join('\n') + '\n';
}

// Body for POST /repos/{owner}/{repo}/pulls/{n}/reviews: one suggested change per
// added line that has fixes, so the author can apply them from the PR. Review
// comments must sit on a line of the diff, hence the added-line restriction.
function reviewRequest(findings) {
	const fixesByLine = new Map();
	for (const finding of findings) {
		if (!finding.fix || !isAddedLine(finding.file, finding.line)) continue;
		const key = `${finding.file}:${finding.line}`;
		if (!fixesByLine.has(key)) fixesByLine.set(key, { file: finding.file, line: finding.line, fixes: [] });
		fixesByLine.get(key).fixes.push(finding);
	}

	const comments = [...fixesByLine.values()].map(({ file, line, fixes }) => {
		const source = fs.readFileSync(path.join(ROOT_DIR, file), 'utf-8').split('\n')[line - 1];
		const fixed = fixes.reduce((text, { url, fix }) => text.split(url).join(fix), source);
		return {
			path: file,
			line,
			side: 'RIGHT',
			body: [...fixes.map(({ error }) => `- ${error}`), '```suggestion', fixed, '```'].join('\n')
		};
	});
	return {
		event: 'COMMENT',
		body: 'Suggested fixes for the links this PR adds; details in the check-links comment.',
		comments
	};
}

const FORMATTERS = {
	text: formatText,
	json: findings => JSON.stringify(findings, null, '\t') + '\n',
	markdown: formatMarkdown
};

async function main() {
	const format = FORMATTERS[FORMAT];
	if (!format) {
		throw new Error(`Unknown --format "${FORMAT}"; use text, json, or markdown`);
	}
	
	if (FORMAT === 'text') {
		console.log('🔍 Checking for dead links in MDX files...\n');
	}

	let findings = await findBrokenLinks();
	if (BASELINE_FILE) {
		findings = withoutBaseline(findings, BASELINE_FILE);
	}

	if (REVIEW_FILE) {
		fs.writeFileSync(REVIEW_FILE, JSON.stringify(reviewRequest(findings), null, '\t') + '\n');
	}
	process.stdout.write(format(findings));
	process.exit(findings.length === 0 ? 0 : 1);
}

// Only run when executed directly; dev/verify-links-live.mjs and dev/check-redirects.mjs
// import the exported helpers.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	main();
}
