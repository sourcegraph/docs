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
 *
 * Exits 1 when any finding is reported.
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import GithubSlugger from 'github-slugger';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse CLI flags
const args = process.argv.slice(2);
const CHECK_ANCHORS = args.includes('--check-anchors');
const ROOT_DIR = path.resolve(flagValue('--root') ?? path.dirname(__dirname));
const FORMAT = flagValue('--format') ?? 'text';
const BASELINE_FILE = flagValue('--baseline');

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

// Extract headings from MDX content to build anchor map
function extractHeadings(content) {
	const slugger = new GithubSlugger();
	const headingRegex = /^#{1,6}\s+(.+)$/gm;
	const headings = new Set();
	
	// Remove code blocks to avoid false positives
	const contentWithoutCode = content.replace(/```[\s\S]*?```/g, '');
	
	let match;
	while ((match = headingRegex.exec(contentWithoutCode)) !== null) {
		// Handle headings with links: [Text](/path) -> Text
		const linkMatch = match[1].match(/\[([^\]]+)\]\([^)]+\)/);
		const title = linkMatch ? linkMatch[1] : match[1];
		headings.add(slugger.slug(title.trim()));
	}
	
	return headings;
}

// Get all MDX files and build a map of valid paths
async function buildPathMap() {
	const files = await glob(ROUTE_GLOB, { cwd: DOCS_DIR });
	const pathMap = new Map();
	// Lowercased route -> real route, to detect case mismatches
	const routesByLowerCase = new Map();
	const headingsMap = new Map();
	
	for (const file of files) {
		const fullPath = path.join(DOCS_DIR, file);
		const content = fs.readFileSync(fullPath, 'utf-8');
		
		// Route path (without .mdx extension)
		const routePath = '/' + file.replace(/\.mdx$/, '').replace(/\/index$/, '');
		
		// Also allow trailing slash variant
		pathMap.set(routePath, fullPath);
		pathMap.set(routePath + '/', fullPath);
		routesByLowerCase.set(routePath.toLowerCase(), routePath);
		
		// Handle index files
		if (file.endsWith('index.mdx')) {
			const dirPath = '/' + file.replace(/\/index\.mdx$/, '');
			pathMap.set(dirPath, fullPath);
			pathMap.set(dirPath + '/', fullPath);
		}
		
		// Extract headings for anchor validation
		const headings = extractHeadings(content);
		headingsMap.set(routePath, headings);
		headingsMap.set(routePath + '/', headings);
	}
	
	return { pathMap, routesByLowerCase, headingsMap };
}

// Check if a path exists in public directory
function checkPublicPath(linkPath) {
	const publicPath = path.join(ROOT_DIR, 'public', linkPath);
	return fs.existsSync(publicPath);
}

// Check if a path exists in docs directory (for images in docs/)
function checkDocsPath(linkPath) {
	const docsPath = path.join(DOCS_DIR, linkPath);
	return fs.existsSync(docsPath);
}

// Parse and validate links in a single file
function extractLinks(content, filePath) {
	const links = [];
	
	// Remove code blocks to avoid checking links in code examples
	const contentWithoutCode = content.replace(/```[\s\S]*?```/g, (match) => {
		// Replace with same number of newlines to preserve line numbers
		return match.replace(/[^\n]/g, ' ');
	});
	
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
function validateLink(link, currentFile, { pathMap, routesByLowerCase, headingsMap }) {
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
		const currentRoute = '/' + path.relative(DOCS_DIR, currentFile)
			.replace(/\.mdx$/, '')
			.replace(/\/index$/, '');
		const headings = headingsMap.get(currentRoute);
		
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
	
	// Same route with different case: resolves on macOS, 404s on the Linux build
	const realRoute = routesByLowerCase.get(
		resolvedPath.replace(/\/$/, '').toLowerCase()
	);
	if (realRoute) {
		return `Case mismatch: "${resolvedPath}" should be "${realRoute}"`;
	}

	// Check if it's a public asset
	if (checkPublicPath(resolvedPath)) {
		return null;
	}
	
	// Check if it's a file with extension (like .png, .pdf)
	if (path.extname(resolvedPath)) {
		// Could be an asset - check public folder or docs folder
		if (checkPublicPath(resolvedPath) || checkDocsPath(resolvedPath)) {
			return null;
		}
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
		'Findings in files this PR did not change mean the PR removed or ' +
			'renamed a page or heading that those files link to.',
		''
	];
	for (const [file, fileFindings] of groupByFile(findings)) {
		lines.push(`**\`${file}\`**`);
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

main().catch(err => {
	console.error('Error running link checker:', err);
	process.exit(1);
});
