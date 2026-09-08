#!/usr/bin/env node

/**
 * Example hostname checker for MDX documentation files.
 *
 * Ensures placeholder hostnames are consistent across the docs:
 * - "your Sourcegraph instance" is always `sourcegraph.example.com`
 * - code hosts and other services are `<service>.example.com`
 *   (e.g. `github.example.com`, `gitlab.example.com`, `bitbucket.example.com`)
 * - internal Sourcegraph infrastructure (`*.sgdev.org`) never appears in docs
 *
 * Auto-generated SCHEMA_SYNC blocks are skipped: their text comes from the
 * JSON schemas in sourcegraph/sourcegraph and must be fixed upstream.
 * The technical changelog is skipped as a historical record.
 *
 * Usage: node dev/check-hostnames.mjs
 */

import fs from 'fs';
import path from 'path';
import {glob} from 'glob';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.join(path.dirname(__dirname), 'docs');

const SOURCEGRAPH_HOST = 'sourcegraph.example.com';

const SKIP_FILES = new Set(['technical-changelog.mdx']);

const SCHEMA_SYNC_START = 'SCHEMA_SYNC_START';
const SCHEMA_SYNC_END = 'SCHEMA_SYNC_END';

/**
 * Each rule is a regex for a disallowed hostname and a function producing
 * the replacement to suggest for a given match.
 */
const RULES = [
	// your-sourcegraph-instance.com, my_sourcegraph.io, ...
	{
		pattern:
			/\b(?:your|my|our)[-_]?sourcegraph[-_a-z0-9]*\.(?:com|io|net|org|dev)\b/gi,
		suggest: () => SOURCEGRAPH_HOST
	},
	// sourcegraph.yourcompany.com, sourcegraph.your-domain.com, sourcegraph.mycompany.com, ...
	{
		pattern:
			/\bsourcegraph\.(?:your|my|our)[-_a-z0-9]*\.(?:com|io|net|org|dev)\b/gi,
		suggest: () => SOURCEGRAPH_HOST
	},
	// sourcegraph.company.com, sourcegraph.acme.io, sourcegraph.test, sourcegraph.corp
	{
		pattern:
			/\bsourcegraph\.(?:company|acme|corp|test)\b(?:\.(?:com|io|net|org|dev)\b)?(?::\d+)?/gi,
		suggest: () => SOURCEGRAPH_HOST
	},
	// myinstance.sourcegraph.com, yourinstance.sourcegraph.com, example.sourcegraph.com, ...
	{
		pattern:
			/\b(?:my|your)[-_]?(?:instance|domain|company)\.sourcegraph\.com\b|\bexample\.sourcegraph\.com\b/gi,
		suggest: () => SOURCEGRAPH_HOST
	},
	// src.example.com, src.acme.com
	{
		pattern:
			/\bsrc\.(?:example|acme|company|mycompany|yourcompany)\.com\b/gi,
		suggest: () => SOURCEGRAPH_HOST
	},
	// my-gitlab.example.com -> gitlab.example.com
	{
		pattern: /\bmy-([a-z0-9]+)\.example\.com\b/gi,
		suggest: m => m.replace(/^my-/i, '')
	},
	// Non-canonical spellings of common code hosts
	{
		pattern:
			/\b(?:bitbucketserver|bitbucket-server|your-bbs-instance)\.example\.com\b/gi,
		suggest: () => 'bitbucket.example.com'
	},
	{
		pattern: /\b(?:github-enterprise|ghe)\.example\.com\b/gi,
		suggest: () => 'github.example.com'
	},
	{
		pattern: /\bsmtp-server\.example\.com\b/gi,
		suggest: () => 'smtp.example.com'
	},
	// *.company.net / *.company.com style private hosts -> *.example.com
	{
		pattern:
			/\b((?:github|gitlab|bitbucket|gerrit|perforce|artifactory)(?:\.internal)?)\.company\.(?:com|net|io)\b/gi,
		suggest: m => m.replace(/\.company\.(?:com|net|io)$/i, '.example.com')
	},
	// Internal Sourcegraph infrastructure must not leak into public docs
	{
		pattern: /\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.sgdev\.org\b/gi,
		suggest: () => `${SOURCEGRAPH_HOST} (or <service>.example.com)`
	}
];

async function main() {
	console.log(
		'🔍 Checking for non-canonical example hostnames in MDX files...\n'
	);

	const files = await glob('**/*.mdx', {cwd: DOCS_DIR});
	const errors = [];

	for (const file of files.sort()) {
		if (SKIP_FILES.has(file)) continue;

		const content = fs.readFileSync(path.join(DOCS_DIR, file), 'utf-8');
		const lines = content.split('\n');
		let inSchemaBlock = false;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			if (line.includes(SCHEMA_SYNC_START)) inSchemaBlock = true;
			if (line.includes(SCHEMA_SYNC_END)) inSchemaBlock = false;
			if (inSchemaBlock) continue;

			for (const {pattern, suggest} of RULES) {
				for (const match of line.matchAll(pattern)) {
					errors.push({
						file,
						line: i + 1,
						found: match[0],
						suggestion: suggest(match[0])
					});
				}
			}
		}
	}

	if (errors.length === 0) {
		console.log('✅ All example hostnames are canonical!');
		process.exit(0);
	}

	console.log(
		`❌ Found ${errors.length} non-canonical example hostname(s):\n`
	);

	for (const {file, line, found, suggestion} of errors) {
		console.log(`   docs/${file}:${line}`);
		console.log(`      found:   ${found}`);
		console.log(`      use:     ${suggestion}\n`);
	}

	console.log(
		`   Use \`${SOURCEGRAPH_HOST}\` for the Sourcegraph instance and \`<service>.example.com\`\n` +
			'   (e.g. github.example.com, gitlab.example.com, bitbucket.example.com) for other hosts.\n'
	);
	process.exit(1);
}

main().catch(err => {
	console.error('Error running hostname checker:', err);
	process.exit(1);
});
