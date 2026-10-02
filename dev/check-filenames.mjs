#!/usr/bin/env node

/**
 * Filename convention checker for documentation files.
 *
 * Ensures no underscores are used in folder or file names under docs/, since
 * they become URL paths, which use hyphens. Runs in `pnpm run build` and as a
 * pull request check (.github/workflows/check-filenames.yml).
 *
 * Usage: node dev/check-filenames.mjs
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const DOCS_DIR = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	'..',
	'docs'
);
const ADVICE =
	'Use hyphens (-) instead of underscores (_) in file and folder names';

console.log('🔍 Checking for underscores in docs filenames...\n');

const errors = fs
	.readdirSync(DOCS_DIR, {recursive: true})
	.filter(file => path.basename(file).includes('_'))
	.map(file => path.join('docs', file))
	.sort();

if (errors.length === 0) {
	console.log('✅ No underscores found in filenames!');
	process.exit(0);
}

console.log(`❌ Found ${errors.length} path(s) with underscores:\n`);
for (const file of errors) {
	console.log(`   ${file}`);
	// Annotation on the file in the pull request's Files changed tab
	if (process.env.GITHUB_ACTIONS) {
		console.log(`::error file=${file}::${ADVICE}`);
	}
}
console.log(`\n   ${ADVICE}\n`);
process.exit(1);
