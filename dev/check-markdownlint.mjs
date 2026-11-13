#!/usr/bin/env node

/**
 * Reports list style findings in docs/ from markdownlint: bullets are dashes
 * (MD004), nested bullets are indented 2 spaces (MD007) with one space after
 * each list marker (MD030), and ordered lists are numbered 1, 2, 3 (MD029).
 * The rules and the generated pages they skip are in
 * .markdownlint-cli2.jsonc at the repository root, where markdownlint-cli2 and
 * editor markdownlint extensions find them. The pull request workflow
 * (.github/workflows/check-markdownlint.yml) runs this on the pages a PR
 * changes and comments the findings the base branch does not have; it never
 * fails the PR.
 *
 * markdownlint-cli2 is not a project dependency:
 *   npm install --global markdownlint-cli2@0.24
 *   markdownlint-cli2        # every page, from the repository root
 *   markdownlint-cli2 --fix  # and fix them
 *
 * Its fix renumbers an ordered list that restarts after a code block or image
 * that is not indented under the step before it; indent that block to the
 * step's text instead, so the list continues. markdownlint reads pages as
 * CommonMark, not MDX, so it can misread a list indented inside a JSX element;
 * unindent the element's content, which MDX renders the same.
 *
 * Usage: node dev/check-markdownlint.mjs [options]
 *   --diff <file>        Unified diff, e.g. from `git diff -U0 origin/main`;
 *                        only the docs/ pages it changes are checked. Without
 *                        it, every page is checked
 *   --root <dir>         Repository to check (default: this repository)
 *   --baseline <file>    Only report findings absent from this JSON, the
 *                        --format json output of a run on the base branch
 *   --format <name>      Output as text (default), json, or markdown
 *   --link-base <url>    Markdown output links each file path to <url>/<path>,
 *                        e.g. https://github.com/sourcegraph/docs/blob/<branch>
 *   --review <file>      Write a GitHub pull request review (JSON body for
 *                        POST /repos/{owner}/{repo}/pulls/{n}/reviews) with one
 *                        comment per flagged line the diff adds. Requires --diff
 *
 * Exits 1 when any finding is reported.
 */

import {spawnSync} from 'child_process';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {
	fileUrl,
	flagValue,
	groupByFile,
	linkTo,
	parseDiff,
	report,
	withoutBaseline
} from './check-shared.mjs';

// The config beside this script's dev/, also for --root, so a run on the base
// branch uses the same rules. In CI both come from the merge commit
// (.github/actions/pr-check)
const REPOSITORY_DIR = path.dirname(
	path.dirname(fileURLToPath(import.meta.url))
);
const CONFIG = path.join(REPOSITORY_DIR, '.markdownlint-cli2.jsonc');
const ROOT_DIR = path.resolve(flagValue('--root') ?? REPOSITORY_DIR);
const DIFF = parseDiff(flagValue('--diff'));
const BASELINE_FILE = flagValue('--baseline');

if (flagValue('--review') && !DIFF) {
	throw new Error('--review needs --diff, to know which lines were added');
}

// Runs markdownlint-cli2 in ROOT_DIR. Exit codes: 0 clean, 1 findings,
// 2 failure
function markdownlint(args, input) {
	const result = spawnSync(
		'markdownlint-cli2',
		['--config', CONFIG, ...args],
		{cwd: ROOT_DIR, encoding: 'utf-8', input}
	);
	if (result.error) throw result.error;
	if (result.status > 1) throw new Error(result.stderr);
	return result;
}

// One line of markdownlint-cli2's output, e.g.
// docs/foo.mdx:12:1 error MD029/ol-prefix Ordered list item prefix [Expected: 2; Actual: 1; Style: 1/2/3]
const FINDING =
	/^(?<file>.+?):(?<line>\d+)(?::\d+)? \w+ (?<rule>MD\d+)\/\S+ (?<description>.+?)(?: \[(?<detail>(?!Context:)[^\]]+)\])?(?: \[Context: .*\])?$/;

// [{file, line, rule, description, detail, text}] for the pages checked,
// where text is the flagged line
function findIssues() {
	const files = DIFF
		? [...DIFF.keys()].filter(
				file =>
					file.startsWith('docs/') &&
					/\.mdx?$/.test(file) &&
					fs.existsSync(path.join(ROOT_DIR, file))
			)
		: [];
	if (DIFF && files.length === 0) return [];
	const {stderr} = markdownlint(DIFF ? ['--no-globs', ...files] : []);
	const fileLines = new Map();
	const linesOf = file => {
		if (!fileLines.has(file)) {
			fileLines.set(
				file,
				fs.readFileSync(path.join(ROOT_DIR, file), 'utf-8').split('\n')
			);
		}
		return fileLines.get(file);
	};
	return stderr
		.split('\n')
		.map(line => line.match(FINDING)?.groups)
		.filter(Boolean)
		.map(({file, line, rule, description, detail = ''}) => ({
			file,
			line: Number(line),
			rule,
			description,
			detail,
			text: linesOf(file)[line - 1]
		}));
}

// A list that starts after 1 is one that restarts after content not indented
// under the step before it; renumbering it would restart the steps at 1
function isRestartedList({rule, detail}) {
	const match = detail.match(/^Expected: 1; Actual: (\d+)/);
	return rule === 'MD029' && match && Number(match[1]) > 1;
}

const RESTARTED_LIST =
	'This list restarts here because the content above this line is not ' +
	'indented under the step before it. Indent that content to the text of ' +
	'the step, so the list continues, instead of renumbering this step.';

function formatText(findings) {
	if (findings.length === 0) {
		return 'No issues found.\n';
	}
	const lines = [`Found ${findings.length} list style issue(s):`];
	for (const {file, line, rule, description, detail} of findings) {
		lines.push(`${file}:${line} ${rule} ${description} [${detail}]`);
	}
	return lines.join('\n') + '\n';
}

// Body for a pull request comment
function formatMarkdown(findings) {
	if (findings.length === 0) {
		return '### ✅ This revision adds no list style issues\n';
	}
	const lines = [
		`### ⚠️ This PR adds ${findings.length} list style issue(s)`,
		'',
		'The pages this PR changes are checked; issues the base branch already ' +
			'has are left out. Each flagged line this PR adds also has an inline comment.',
		''
	];
	for (const [file, fileFindings] of groupByFile(findings)) {
		const url = fileUrl(file);
		lines.push(linkTo(`**\`${file}\`**`, url));
		for (const {line, rule, description, detail} of fileFindings) {
			lines.push(
				`- ${linkTo(`line ${line}`, url && `${url}#L${line}`)}: ` +
					`${rule} ${description} (${detail})`
			);
		}
		lines.push('');
	}
	lines.push(
		'Docs use dashes for bullets, one space after each list marker, nested ' +
			'bullets indented 2 spaces, and ordered lists numbered 1, 2, 3. A list ' +
			'that restarts after a code block or image needs that block indented ' +
			'under the step before it, not new numbers.',
		'',
		'Reproduce locally with `npm install --global markdownlint-cli2@0.24`, then ' +
			'`markdownlint-cli2` from the repository root; add `--fix` to fix the ' +
			'rest. Editor markdownlint extensions read the same rules from ' +
			'`.markdownlint-cli2.jsonc`. See `dev/check-markdownlint.mjs` for details.'
	);
	return lines.join('\n') + '\n';
}

// First line of a review comment, so the workflow can match the comments it
// posted earlier to the findings still present and delete the rest
const REVIEW_MARKER = '<!-- check-markdownlint-finding:';

// Body for POST /repos/{owner}/{repo}/pulls/{n}/reviews: one comment per
// flagged line the diff adds, with markdownlint's fix of that line as a
// suggested change. No review body: a submitted review cannot be deleted, so a
// body would outlive the comments once the lists are fixed.
function reviewRequest(findings) {
	const added = findings.filter(({file, line}) => DIFF.get(file)?.has(line));
	const comments = [];
	for (const [file, fileFindings] of groupByFile(added)) {
		const content = fs.readFileSync(path.join(ROOT_DIR, file), 'utf-8');
		const fixedLines = markdownlint(['--format'], content).stdout.split(
			'\n'
		);
		for (const line of new Set(fileFindings.map(finding => finding.line))) {
			const lineFindings = fileFindings.filter(
				finding => finding.line === line
			);
			const body = [
				`${REVIEW_MARKER} ${lineFindings.map(({rule, detail}) => `${rule} ${detail}`).join(', ')} -->`,
				...lineFindings.map(
					({rule, description, detail}) =>
						`${rule} ${description}: ${detail}`
				)
			];
			if (lineFindings.some(isRestartedList)) {
				body.push('', RESTARTED_LIST);
			} else {
				// A four-backtick fence so lines containing ``` cannot break out
				body.push('````suggestion', fixedLines[line - 1], '````');
			}
			comments.push({
				path: file,
				line,
				side: 'RIGHT',
				body: body.join('\n')
			});
		}
	}
	return {event: 'COMMENT', body: '', comments};
}

let findings = findIssues();
if (BASELINE_FILE) {
	findings = withoutBaseline(
		findings,
		BASELINE_FILE,
		({file, rule, detail, text}) => [file, rule, detail, text].join('\t')
	);
}
report(findings, {text: formatText, markdown: formatMarkdown}, () =>
	reviewRequest(findings)
);
