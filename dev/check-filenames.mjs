#!/usr/bin/env node

/**
 * Filename convention checker for documentation files.
 * 
 * Ensures no underscores are used in folder or file names,
 * as URLs should only use hyphens.
 * 
 * Usage: node dev/check-filenames.mjs
 */

import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.join(path.dirname(__dirname), 'docs');

async function main() {
	console.log('🔍 Checking for underscores in docs filenames...\n');
	
	const files = await glob('**/*', { cwd: DOCS_DIR });
	const errors = [];
	
	for (const file of files) {
		const parts = file.split('/');
		for (const part of parts) {
			if (part.includes('_')) {
				errors.push(file);
				break;
			}
		}
	}
	
	if (errors.length === 0) {
		console.log('✅ No underscores found in filenames!');
		process.exit(0);
	}
	
	console.log(`❌ Found ${errors.length} path(s) with underscores:\n`);
	
	for (const file of errors) {
		console.log(`   docs/${file}`);
	}
	
	console.log('\n   Please use hyphens (-) instead of underscores (_) in file and folder names.\n');
	process.exit(1);
}

main().catch(err => {
	console.error('Error running filename checker:', err);
	process.exit(1);
});
