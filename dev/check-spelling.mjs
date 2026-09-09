#!/usr/bin/env node

/**
 * Reports CSpell findings on lines added by a Git diff.
 *
 * Usage: node dev/check-spelling.mjs --base <revision> [--format text|json]
 *
 * The json format feeds dev/post-spelling-review.mjs.
 * Exits 1 when spelling issues are found and 2 for operational errors.
 */

import {execFileSync, spawnSync} from 'child_process';
import path from 'path';
import {fileURLToPath} from 'url';

const args = process.argv.slice(2);
const BASE = flagValue('--base');
const FORMAT = flagValue('--format') ?? 'text';

function flagValue(name) {
	const index = args.indexOf(name);
	return index === -1 ? undefined : args[index + 1];
}

function addedLineRanges(base) {
	const diff = execFileSync(
		'git',
		['diff', '--unified=0', '--no-color', '--find-renames', base, '--'],
		{encoding: 'utf8', maxBuffer: 50 * 1024 * 1024}
	);
	const ranges = new Map();
	let file;

	for (const line of diff.split('\n')) {
		const fileMatch = line.match(/^\+\+\+ b\/(.+)$/);
		if (fileMatch) {
			file = fileMatch[1];
			if (!ranges.has(file)) {
				ranges.set(file, []);
			}
			continue;
		}

		const hunkMatch = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/);
		if (file && hunkMatch) {
			const start = Number(hunkMatch[1]);
			const count = hunkMatch[2] === undefined ? 1 : Number(hunkMatch[2]);
			if (count > 0) {
				ranges.get(file).push([start, start + count - 1]);
			}
		}
	}

	return ranges;
}

function runCSpell(files) {
	if (files.length === 0) {
		return [];
	}

	const result = spawnSync(
		'cspell',
		[
			'--no-progress',
			'--show-suggestions',
			'--reporter',
			'@cspell/cspell-json-reporter',
			'--file',
			...files
		],
		{encoding: 'utf8', maxBuffer: 50 * 1024 * 1024}
	);

	if (result.error) {
		throw result.error;
	}

	const report = JSON.parse(result.stdout);
	if (![0, 1].includes(result.status) || report.error.length > 0) {
		throw new Error(result.stderr || JSON.stringify(report.error));
	}

	return report.issues.map(issue => ({
		file: path.relative(process.cwd(), fileURLToPath(issue.uri)),
		line: issue.row,
		column: issue.col,
		word: issue.text,
		suggestions: issue.suggestions?.slice(0, 3) ?? [],
		context: issue.context?.text.trim() ?? issue.line.text.trim()
	}));
}

function findingsOnAddedLines(ranges, issues) {
	return issues.filter(issue =>
		(ranges.get(issue.file) ?? []).some(
			([start, end]) => issue.line >= start && issue.line <= end
		)
	);
}

function formatText(findings) {
	if (findings.length === 0) {
		return 'No spelling errors found in added lines.\n';
	}

	const lines = [
		`Found ${findings.length} spelling error(s) in added lines:`
	];
	for (const finding of findings) {
		lines.push(
			`${finding.file}:${finding.line}:${finding.column} - Unknown word (${finding.word})`
		);
	}
	return lines.join('\n') + '\n';
}

async function main() {
	if (!BASE) {
		throw new Error('Missing required --base <revision>');
	}
	if (!['text', 'json'].includes(FORMAT)) {
		throw new Error(`Unknown --format "${FORMAT}"; use text or json`);
	}

	const ranges = addedLineRanges(BASE);
	const findings = findingsOnAddedLines(
		ranges,
		runCSpell([...ranges.keys()])
	);
	process.stdout.write(
		FORMAT === 'json'
			? JSON.stringify(findings, null, '\t') + '\n'
			: formatText(findings)
	);
	process.exit(findings.length === 0 ? 0 : 1);
}

main().catch(error => {
	console.error(error);
	process.exit(2);
});
