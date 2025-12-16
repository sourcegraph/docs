#!/usr/bin/env node

/**
 * Image syntax checker for MDX documentation files.
 *
 * Ensures <img> tags are not used directly in MDX files.
 * - Use markdown image syntax ![alt](src) instead for click-to-zoom support.
 *
 * Usage: node dev/check-images.mjs
 */

import fs from 'fs';
import path from 'path';
import {glob} from 'glob';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.join(path.dirname(__dirname), 'docs');

async function main() {
	console.log('🔍 Checking for raw <img> tags in MDX files...\n');

	const files = await glob('**/*.mdx', {cwd: DOCS_DIR});
	const imgErrors = [];

	for (const file of files) {
		const filePath = path.join(DOCS_DIR, file);
		const content = fs.readFileSync(filePath, 'utf-8');
		const lines = content.split('\n');

		for (let i = 0; i < lines.length; i++) {
			if (lines[i].includes('<img')) {
				imgErrors.push({file, line: i + 1, content: lines[i].trim()});
			}
		}
	}

	if (imgErrors.length === 0) {
		console.log('✅ No raw <img> tags found in MDX files!');
		process.exit(0);
	}

	console.log(`❌ Found ${imgErrors.length} raw <img> tag(s):\n`);
	for (const error of imgErrors) {
		console.log(`   docs/${error.file}:${error.line}`);
		console.log(`   ${error.content}\n`);
	}
	console.log('   Use markdown image syntax instead: ![alt text](image-url)');
	console.log('   This enables click-to-zoom functionality.\n');

	process.exit(1);
}

main().catch(err => {
	console.error('Error running image checker:', err);
	process.exit(1);
});
