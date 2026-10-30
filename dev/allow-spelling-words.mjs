#!/usr/bin/env node

/**
 * Adds words to cspell-allow-list.txt, in alphabetical order in its "# Words"
 * section. CSpell decides what the words are, as it does when checking a
 * document: it splits hyphenated, snake_case, and camelCase input into parts,
 * and the parts it does not already accept, from its dictionaries or the
 * allow list, are what gets added, so the list only grows by what it needs.
 * Reports what was added and what was already accepted. Needs CSpell on the
 * PATH: npm install --global cspell@10
 *
 * Usage: node dev/allow-spelling-words.mjs <words…>
 *
 * The words may be separated by spaces or commas and wrapped in the backticks
 * the spell check report puts around them. The text may also be the body of a
 * `/spell <words>` or `/spell allow <words>` pull request comment, as sent by
 * .github/workflows/spellcheck-allow.yml; only its first line is read.
 */

import {spawnSync} from 'child_process';
import {readFileSync, writeFileSync} from 'fs';

const ALLOW_LIST = 'cspell-allow-list.txt';
const WORDS_SECTION = '# Words';

// The order dev/check-spelling.mjs enforces, which is also how CSpell matches
const collator = new Intl.Collator('en', {sensitivity: 'base'});

const unique = words =>
	words.filter(
		(word, index) =>
			words.findIndex(other => collator.compare(other, word) === 0) ===
			index
	);

function requestedWords(text) {
	return unique(
		text
			.split('\n')[0]
			.replace(/^\s*\/spell(\s+allow)?(?=\s|$)/, '')
			.split(/[\s,]+/)
			.map(word => word.replace(/^[`'"]+|[`'"]+$/g, ''))
			.filter(Boolean)
	);
}

// The parts CSpell flags in each input, one input per line, under the
// repository's cspell.json. An input with no flagged part is accepted as is.
function flaggedParts(inputs) {
	if (inputs.length === 0) {
		return new Map();
	}
	const result = spawnSync(
		'cspell',
		[
			'--no-progress',
			'--reporter',
			'@cspell/cspell-json-reporter',
			'stdin'
		],
		{encoding: 'utf8', input: inputs.join('\n') + '\n'}
	);
	if (result.error) {
		throw result.error;
	}
	const report = JSON.parse(result.stdout);
	if (![0, 1].includes(result.status) || report.error.length > 0) {
		throw new Error(result.stderr || JSON.stringify(report.error));
	}
	const parts = new Map(inputs.map(input => [input, []]));
	for (const issue of report.issues) {
		parts.get(inputs[issue.row - 1]).push(issue.text);
	}
	return parts;
}

// An entry may carry a trailing comment, e.g. `argjson # jq option`
const entryOf = line => line.replace(/\s*#.*/, '').trim();

// Inserts the words into the "# Words" section, which runs from its heading to
// the next blank or comment line, keeping it sorted. Returns the new lines.
function withWords(lines, words) {
	const start = lines.indexOf(WORDS_SECTION) + 1;
	if (start === 0) {
		throw new Error(`${ALLOW_LIST} has no "${WORDS_SECTION}" section`);
	}
	const result = [...lines];
	for (const word of words) {
		let index = start;
		while (
			index < result.length &&
			!/^\s*(#|$)/.test(result[index]) &&
			collator.compare(entryOf(result[index]), word) < 0
		) {
			index++;
		}
		result.splice(index, 0, word);
	}
	return result;
}

function main() {
	const parts = flaggedParts(requestedWords(process.argv.slice(2).join(' ')));
	const added = unique([...parts.values()].flat());
	const alreadyAccepted = [...parts]
		.filter(([, flagged]) => flagged.length === 0)
		.map(([input]) => input);

	if (added.length > 0) {
		const lines = readFileSync(ALLOW_LIST, 'utf8').split('\n');
		writeFileSync(ALLOW_LIST, withWords(lines, added).join('\n'));
	}

	const report = [
		['Added', added],
		['Already accepted', alreadyAccepted]
	].filter(([, words]) => words.length > 0);
	if (report.length === 0) {
		console.log('No words given.');
	}
	for (const [label, words] of report) {
		console.log(`${label}: ${words.map(word => `\`${word}\``).join(', ')}`);
	}
}

main();
