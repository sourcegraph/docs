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
 * 
 * Usage: node dev/check-links.mjs [options]
 *   --check-anchors        Also validate #anchors against headings
 *   --root <dir>           Repository to check (default: this repository)
 *   --format <name>        Output as text (default), json, or markdown
 *   --baseline <file>      Only report findings absent from this JSON file
 *                          (produced by --format json on another revision)
 *   --link-base <url>      Markdown output links each file path to <url>/<path>,
 *                          e.g. https://github.com/sourcegraph/docs/blob/<branch>
 *
 * Exits 1 when any finding is reported.
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
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

const DOCS_DIR = path.join(ROOT_DIR, 'docs');
// Files whose links are checked. Only .mdx files become site routes; see
// `filePathPattern` in contentlayer.config.ts.
const SOURCE_GLOB = '**/*.{md,mdx}';
const ROUTE_GLOB = '**/*.mdx';

function flagValue(name) {
	const index = args.indexOf(name);
	return index === -1 ? undefined : args[index + 1];
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
function routeFor(file) {
	return '/' + file.replace(/\.mdx$/, '').replace(/(^|\/)index$/, '');
}

// Get all MDX files and build a map of valid paths
async function buildPathMap() {
	// Sorted so foo.mdx precedes foo/index.mdx; when both exist the site serves
	// the first match (allPosts.find), so the first file owns the route here too.
	const files = (await glob(ROUTE_GLOB, { cwd: DOCS_DIR })).sort();
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
	
	return { pathMap, routesByLowerCase, headingsMap, headingsByFile, assetsByLowerCase: await buildAssetMap() };
}

// Lowercased link path -> real link path, for files under public/ and docs/
// (images, PDFs, ...). An enumerated map rather than fs.existsSync, which is
// case-insensitive on macOS and would hide links that 404 on Linux.
async function buildAssetMap() {
	const assetsByLowerCase = new Map();
	for (const dir of ['public', 'docs']) {
		const files = await glob('**/*', { cwd: path.join(ROOT_DIR, dir), nodir: true });
		for (const file of files) {
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

// Check if a link is valid
function validateLink(link, currentFile, { pathMap, routesByLowerCase, headingsMap, headingsByFile, assetsByLowerCase }) {
	const { url } = link;
	
	// Skip external links, mailto, tel, javascript, etc.
	if (url.startsWith('http://') || url.startsWith('https://') || 
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

// Find every broken link: [{ file, line, url, error }]
async function findBrokenLinks() {
	const maps = await buildPathMap();
	const files = await glob(SOURCE_GLOB, { cwd: DOCS_DIR });
	const findings = [];
	
	for (const file of files.sort()) {
		const fullPath = path.join(DOCS_DIR, file);
		const content = fs.readFileSync(fullPath, 'utf-8');
		
		for (const link of extractLinks(content, fullPath)) {
			const error = validateLink(link, fullPath, maps);
			if (error) {
				findings.push({
					file: `docs/${file}`,
					line: link.lineNumber,
					url: link.url,
					error
				});
			}
		}
	}
	
	return findings;
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

// Body for a pull request comment
function formatMarkdown(findings) {
	if (findings.length === 0) {
		return '### ✅ This PR introduces no broken links\n';
	}
	
	const lines = [
		`### ❌ This PR introduces ${findings.length} broken link(s)`,
		'',
		'Any broken links found here on pages not changed in this PR indicate ' +
			'your PR has broken inbound links. Please fix the inbound links on ' +
			'the other pages.',
		'',
		'Adding a redirect in `src/data/redirects.ts` does not satisfy this ' +
			'check, because it’s a workaround instead of a fix.',
		''
	];
	for (const [file, fileFindings] of groupByFile(findings)) {
		const fileLabel = `**\`${file}\`**`;
		lines.push(LINK_BASE ? `[${fileLabel}](${LINK_BASE}/${file})` : fileLabel);
		for (const { line, url, error } of fileFindings) {
			lines.push(`- line ${line}: \`${url}\` — ${error}`);
		}
		lines.push('');
	}
	lines.push(
		'Reproduce locally with `pnpm check-links --check-anchors` ' +
			'(see `dev/check-links.mjs`).'
	);
	return lines.join('\n') + '\n';
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

	process.stdout.write(format(findings));
	process.exit(findings.length === 0 ? 0 : 1);
}

// Only run when executed directly; dev/verify-links-live.mjs imports extractHeadings.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	main().catch(err => {
		console.error('Error running link checker:', err);
		process.exit(1);
	});
}
