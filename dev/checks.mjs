#!/usr/bin/env node

/**
 * Runs the docs checks in dev/check-*.mjs. `npm run build` runs them all
 * before `next build`.
 *
 * Usage: node dev/checks.mjs [check ...] [flags]
 *   node dev/checks.mjs                                 every check
 *   node dev/checks.mjs links filenames                 only those
 *   node dev/checks.mjs links --check-anchors           flags go to that one check
 *
 * Every check runs even when an earlier one fails; exits 1 if any failed.
 */

import {spawnSync} from 'child_process';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CHECKS = {
	links: 'check-links.mjs',
	filenames: 'check-filenames.mjs',
	images: 'check-images.mjs'
};

const args = process.argv.slice(2);
const names = [];
while (args.length > 0 && CHECKS[args[0]]) {
	names.push(args.shift());
}
const flags = args;

if (flags.length > 0 && !flags[0].startsWith('-')) {
	console.error(
		`Unknown check "${flags[0]}"; use ${Object.keys(CHECKS).join(', ')}`
	);
	process.exit(1);
}
if (flags.length > 0 && names.length !== 1) {
	console.error(
		`Flags ${flags.join(' ')} need exactly one check to apply to`
	);
	process.exit(1);
}

const failed = [];
for (const name of names.length > 0 ? names : Object.keys(CHECKS)) {
	const script = path.join(__dirname, CHECKS[name]);
	const {status} = spawnSync(process.execPath, [script, ...flags], {
		stdio: 'inherit'
	});
	if (status !== 0) failed.push(name);
}

if (failed.length > 0) {
	console.error(`\n❌ Failed checks: ${failed.join(', ')}`);
	process.exit(1);
}
