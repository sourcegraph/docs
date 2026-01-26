const path = require('path');
const fs = require('fs');
const { sync: glob } = require('glob');

const DOCS_DIR = './docs';
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

const ASSET_EXTENSIONS = new Set([
	'png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico',
	'pdf',
	'zip', 'tar', 'gz', 'tgz',
	'mp4', 'mov', 'webm',
	'css', 'js', 'map',
]);

function normalizeRoute(p) {
	if (!p) return '/';

	p = String(p).trim();

	// Convert Windows separators to URL separators
	p = p.replace(/\\/g, '/');

	// Ensure leading slash
	if (!p.startsWith('/')) p = '/' + p;

	// Collapse duplicate slashes (keep a single leading slash)
	p = p.replace(/\/{2,}/g, '/');

	// Remove trailing slash (except for root)
	if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);

	return p;
}

function buildValidRoutes(files) {
	const validRoutes = new Set();
	const canonicalByLower = new Map(); // lower -> canonical (for case-mismatch detection)

	for (const file of files) {
		// docs/cody/capabilities/chat.mdx → /cody/capabilities/chat
		// docs/cody/index.mdx → /cody
		// docs/index.mdx → /
		let route = file
			.replace(/(^|\/)index\.mdx?$/, '')  // handles "index.mdx" and "foo/index.mdx"
			.replace(/\.mdx?$/, '');

		route = normalizeRoute(route);
		validRoutes.add(route);

		const lower = route.toLowerCase();
		if (!canonicalByLower.has(lower)) {
			canonicalByLower.set(lower, route);
		}
	}

	return { validRoutes, canonicalByLower };
}

function extractLinks(content) {
	const links = [];

	// Match various link patterns in MDX
	const patterns = [
		/\]\((\/[^)\s"'`]+)(?:\s+["'][^"']*["'])?\)/g,      // Markdown: [text](/path) or [text](/path "title")
		/\bhref\s*=\s*["'](\/[^"']+)["']/g,                 // JSX: href="/path"
		/\bhref\s*=\s*\{\s*["'](\/[^"']+)["']\s*\}/g,       // JSX: href={'/path'}
		/\bto\s*=\s*["'](\/[^"']+)["']/g,                   // <Link to="/path">
		/\bto\s*=\s*\{\s*["'](\/[^"']+)["']\s*\}/g,         // <Link to={'/path'}>
	];

	// Reference-style link definitions: [ref]: /path
	const refLinkPattern = /^\s*\[[^\]]+\]:\s*(\/\S+)/gm;

	const lines = content.split('\n');
	let inFence = false;

	lines.forEach((line, lineIndex) => {
		// Skip code fences
		if (/^\s*```/.test(line)) {
			inFence = !inFence;
			return;
		}
		if (inFence) return;

		// Check for reference-style link definitions
		let refMatch;
		refLinkPattern.lastIndex = 0;
		while ((refMatch = refLinkPattern.exec(line)) !== null) {
			const fullLink = refMatch[1];
			const cleanLink = normalizeRoute(fullLink.split('#')[0].split('?')[0]);
			if (!isAssetLink(cleanLink) && !cleanLink.startsWith('/api/')) {
				links.push({ link: cleanLink, line: lineIndex + 1 });
			}
		}

		for (const pattern of patterns) {
			pattern.lastIndex = 0; // Reset regex state
			let match;
			while ((match = pattern.exec(line)) !== null) {
				const fullLink = match[1];
				// Strip anchor and query params for validation
				const cleanLink = normalizeRoute(fullLink.split('#')[0].split('?')[0]);

				// Skip API routes
				if (cleanLink.startsWith('/api/')) {
					continue;
				}

				// Skip asset files (using allowlist)
				if (isAssetLink(cleanLink)) {
					continue;
				}

				links.push({
					link: cleanLink,
					line: lineIndex + 1
				});
			}
		}
	});

	return links;
}

function isAssetLink(cleanLink) {
	const lastSegment = cleanLink.split('/').pop() || '';
	const m = lastSegment.match(/\.([a-z0-9]+)$/i);
	return m && ASSET_EXTENSIONS.has(m[1].toLowerCase());
}

function findBrokenLinks(files, validRoutes, canonicalByLower) {
	const brokenLinks = [];

	for (const file of files) {
		const filePath = path.join(DOCS_DIR, file);
		const content = fs.readFileSync(filePath, 'utf-8');
		const links = extractLinks(content);

		for (const { link, line } of links) {
			// Exact match - link is valid
			if (validRoutes.has(link)) continue;

			// Check for case mismatch (works on macOS/Windows but fails on Linux CI)
			const canonical = canonicalByLower.get(link.toLowerCase());
			if (canonical) {
				brokenLinks.push({
					file: filePath,
					line,
					link,
					suggestion: canonical,
					isCaseMismatch: true
				});
				continue;
			}

			// Truly broken link
			brokenLinks.push({ file: filePath, line, link });
		}
	}

	return brokenLinks;
}

async function sendToSlack(brokenLinks, totalFiles) {
	if (!SLACK_WEBHOOK_URL) {
		console.log('No SLACK_WEBHOOK_URL provided, printing results locally:');
		console.log(`Total docs scanned: ${totalFiles}`);
		console.log(`Broken links found: ${brokenLinks.length}`);
		if (brokenLinks.length > 0) {
			console.log('\nBroken links:');
			brokenLinks.forEach(({ file, line, link, suggestion, isCaseMismatch }) => {
				if (isCaseMismatch) {
					console.log(`  ${file}:${line} → ${link} (case mismatch, did you mean ${suggestion}?)`);
				} else {
					console.log(`  ${file}:${line} → ${link}`);
				}
			});
		}
		return;
	}

	// Guard for older Node versions
	if (typeof fetch !== 'function') {
		throw new Error('Global fetch is not available. Use Node 18+ or add a fetch polyfill.');
	}

	const date = new Date().toISOString().split('T')[0];

	const caseMismatches = brokenLinks.filter(b => b.isCaseMismatch);
	const trulyBroken = brokenLinks.filter(b => !b.isCaseMismatch);

	const blocks = [
		{
			type: 'header',
			text: {
				type: 'plain_text',
				text: `📊 Daily Docs Link Check - ${date}`,
				emoji: true
			}
		},
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: `*Total docs scanned:* ${totalFiles}\n*Broken links:* ${trulyBroken.length}\n*Case mismatches:* ${caseMismatches.length}`
			}
		}
	];

	if (trulyBroken.length > 0) {
		// Group by file for cleaner output
		const grouped = {};
		for (const { file, line, link } of trulyBroken) {
			if (!grouped[file]) grouped[file] = [];
			grouped[file].push({ line, link });
		}

		let detailText = '*Broken links:*\n';
		const entries = Object.entries(grouped).slice(0, 10); // Limit to 10 files

		for (const [file, links] of entries) {
			const shortFile = file.replace('./docs/', '');
			detailText += `*${shortFile}*\n`;
			for (const { line, link } of links.slice(0, 5)) { // Limit to 5 links per file
				detailText += `  • Line ${line}: \`${link}\`\n`;
			}
			if (links.length > 5) {
				detailText += `  • ... and ${links.length - 5} more\n`;
			}
		}

		if (Object.keys(grouped).length > 10) {
			detailText += `\n_... and ${Object.keys(grouped).length - 10} more files with broken links_`;
		}

		blocks.push({
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: detailText
			}
		});
	}

	if (caseMismatches.length > 0 && caseMismatches.length <= 20) {
		let caseText = '*Case mismatches (will fail on Linux CI):*\n';
		for (const { file, line, link, suggestion } of caseMismatches.slice(0, 10)) {
			const shortFile = file.replace('./docs/', '');
			caseText += `• \`${shortFile}:${line}\`: \`${link}\` → \`${suggestion}\`\n`;
		}
		if (caseMismatches.length > 10) {
			caseText += `_... and ${caseMismatches.length - 10} more_`;
		}

		blocks.push({
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: caseText
			}
		});
	}

	if (brokenLinks.length === 0) {
		blocks.push({
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: '✅ No broken internal links found!'
			}
		});
	}

	const response = await fetch(SLACK_WEBHOOK_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ blocks })
	});

	if (!response.ok) {
		throw new Error(`Slack webhook failed: ${response.status}`);
	}

	console.log('Report sent to Slack');
}

async function main() {
	// Glob once and reuse
	const files = glob('**/*.{md,mdx}', {
		cwd: DOCS_DIR,
		ignore: ['node_modules/**']
	});

	console.log('Building valid routes...');
	const { validRoutes, canonicalByLower } = buildValidRoutes(files);
	console.log(`Found ${validRoutes.size} valid routes`);

	console.log('Scanning for broken links...');
	const brokenLinks = findBrokenLinks(files, validRoutes, canonicalByLower);

	await sendToSlack(brokenLinks, files.length);
}

main().catch(err => {
	console.error('Error:', err.message);
	process.exit(1);
});
