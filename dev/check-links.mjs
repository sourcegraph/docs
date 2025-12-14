#!/usr/bin/env node

/**
 * Dead link checker for MDX documentation files.
 * Transparency note; This is AI generated, if it doesn't detect things correctly 
 * please blame this script, and use AI to improve its detection. It's proven massively
 * helpful during larger docs refactors so far.
 * 
 * Checks for:
 * - Broken internal links (markdown and JSX/HTML style)
 * - Missing anchor/heading references
 * - Invalid file paths
 * 
 * Usage: node dev/check-links.mjs [--check-anchors]
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import GithubSlugger from 'github-slugger';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.join(path.dirname(__dirname), 'docs');

// Parse CLI flags
const args = process.argv.slice(2);
const CHECK_ANCHORS = args.includes('--check-anchors');

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
	const files = await glob('**/*.mdx', { cwd: DOCS_DIR });
	const pathMap = new Map();
	const headingsMap = new Map();
	
	for (const file of files) {
		const fullPath = path.join(DOCS_DIR, file);
		const content = fs.readFileSync(fullPath, 'utf-8');
		
		// Route path (without .mdx extension)
		const routePath = '/' + file.replace(/\.mdx$/, '').replace(/\/index$/, '');
		
		// Also allow trailing slash variant
		pathMap.set(routePath, fullPath);
		pathMap.set(routePath + '/', fullPath);
		
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
	
	return { pathMap, headingsMap };
}

// Check if a path exists in public directory
function checkPublicPath(linkPath) {
	const publicPath = path.join(path.dirname(__dirname), 'public', linkPath);
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
function validateLink(link, currentFile, pathMap, headingsMap) {
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

async function main() {
	console.log('🔍 Checking for dead links in MDX files...\n');
	
	const { pathMap, headingsMap } = await buildPathMap();
	const files = await glob('**/*.mdx', { cwd: DOCS_DIR });
	
	let totalErrors = 0;
	const errors = [];
	
	for (const file of files) {
		const fullPath = path.join(DOCS_DIR, file);
		const content = fs.readFileSync(fullPath, 'utf-8');
		const links = extractLinks(content, fullPath);
		
		const fileErrors = [];
		
		for (const link of links) {
			const error = validateLink(link, fullPath, pathMap, headingsMap);
			if (error) {
				fileErrors.push({
					line: link.lineNumber,
					url: link.url,
					error
				});
			}
		}
		
		if (fileErrors.length > 0) {
			errors.push({
				file: `docs/${file}`,
				errors: fileErrors
			});
			totalErrors += fileErrors.length;
		}
	}
	
	// Output results
	if (errors.length === 0) {
		console.log('✅ No dead links found!');
		process.exit(0);
	}
	
	console.log(`❌ Found ${totalErrors} dead link(s) in ${errors.length} file(s):\n`);
	
	for (const { file, errors: fileErrors } of errors) {
		console.log(`\n📄 ${file}`);
		for (const { line, url, error } of fileErrors) {
			console.log(`   Line ${line}: ${url}`);
			console.log(`   └─ ${error}`);
		}
	}
	
	console.log('\n');
	process.exit(1);
}

main().catch(err => {
	console.error('Error running link checker:', err);
	process.exit(1);
});
