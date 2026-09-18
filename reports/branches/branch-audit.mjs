#!/usr/bin/env node

/**
 * Branch and pull request audit for sourcegraph/docs.
 *
 * Lists every branch on GitHub with its age, tip author, whether that author
 * is still in the sourcegraph GitHub org, how far it is ahead of and behind
 * main, the pull request it belongs to, and a suggested action. Open pull
 * requests from forks get a row too. Writes branches-and-prs.tsv next to
 * this script.
 *
 * Needs the `gh` CLI, logged in as a member of the sourcegraph org
 * (membership checks return "no" for everyone otherwise).
 *
 * Usage: npm run branch-audit
 */

import {execFileSync} from 'child_process';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const OWNER = 'sourcegraph';
const REPO = 'docs';
const DEFAULT_BRANCH = 'main';
const REPOSITORY_URL = `https://github.com/${OWNER}/${REPO}`;

const PAGE_SIZE = 100;
// Each branch drags its pull requests along, so smaller pages keep GitHub
// from timing out.
const BRANCH_PAGE_SIZE = 40;
const COMPARE_BATCH_SIZE = 50;
const RETRIES = 3;
const DAY_MS = 24 * 60 * 60 * 1000;

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_FILE = path.join(SCRIPT_DIR, 'branches-and-prs.tsv');

const COLUMNS = [
	'branch',
	'branch_url',
	'first_commit',
	'last_commit',
	'days_idle',
	'tip_author',
	'author_in_sourcegraph_org',
	'ahead_of_main',
	'behind_main',
	'pr_number',
	'pr_url',
	'pr_opened',
	'pr_author',
	'pr_author_in_sourcegraph_org',
	'pr_status',
	'assessment'
];

const PULL_REQUEST_FIELDS = `
	number url state isDraft createdAt updatedAt mergedAt closedAt
	author { login }
	headRefName headRepository { nameWithOwner }
`;

// Review and check state only matter for open pull requests.
const OPEN_PULL_REQUEST_FIELDS = `
	${PULL_REQUEST_FIELDS}
	reviewDecision mergeStateStatus
	commits(last: 1) { nodes { commit { statusCheckRollup { state } } } }
`;

function graphql(query, variables = {}) {
	const args = ['api', 'graphql', '-f', `query=${query}`];
	for (const [name, value] of Object.entries(variables)) {
		if (value !== null && value !== undefined) {
			args.push('-F', `${name}=${value}`);
		}
	}
	let lastError;
	for (let attempt = 1; attempt <= RETRIES; attempt++) {
		try {
			const response = JSON.parse(
				execFileSync('gh', args, {
					encoding: 'utf8',
					stdio: ['ignore', 'pipe', 'pipe'],
					maxBuffer: 64 * 1024 * 1024
				})
			);
			if (response.errors) {
				throw new Error(
					response.errors.map(error => error.message).join('; ')
				);
			}
			return response.data;
		} catch (error) {
			lastError = error;
			console.error(
				`⚠️  GitHub request failed (attempt ${attempt}/${RETRIES})`
			);
		}
	}
	throw lastError;
}

// Follows a Relay connection until hasNextPage is false.
function paginate(query, selectConnection) {
	const nodes = [];
	let cursor = null;
	do {
		const connection = selectConnection(graphql(query, {cursor}));
		nodes.push(...connection.nodes);
		cursor = connection.pageInfo.hasNextPage
			? connection.pageInfo.endCursor
			: null;
	} while (cursor);
	return nodes;
}

function fetchOrganizationMembers() {
	const members = paginate(
		`query($cursor: String) {
			organization(login: "${OWNER}") {
				membersWithRole(first: ${PAGE_SIZE}, after: $cursor) {
					pageInfo { hasNextPage endCursor }
					nodes { login }
				}
			}
		}`,
		data => data.organization.membersWithRole
	);
	return new Set(members.map(member => member.login));
}

function fetchBranches() {
	return paginate(
		`query($cursor: String) {
			repository(owner: "${OWNER}", name: "${REPO}") {
				refs(refPrefix: "refs/heads/", first: ${BRANCH_PAGE_SIZE}, after: $cursor,
					orderBy: {field: ALPHABETICAL, direction: ASC}) {
					pageInfo { hasNextPage endCursor }
					nodes {
						name
						target {
							... on Commit {
								committedDate
								author { user { login } }
							}
						}
						associatedPullRequests(first: 10) {
							nodes { ${PULL_REQUEST_FIELDS} }
						}
					}
				}
			}
		}`,
		data => data.repository.refs
	);
}

// Compared from main, aheadBy is the branch's own commit count and the
// comparison's first commit is the oldest one on the branch.
function fetchComparisons(branchNames) {
	const comparisons = new Map();
	for (
		let start = 0;
		start < branchNames.length;
		start += COMPARE_BATCH_SIZE
	) {
		const batch = branchNames.slice(start, start + COMPARE_BATCH_SIZE);
		const fields = batch
			.map(
				(name, index) =>
					`b${index}: compare(headRef: ${JSON.stringify(name)}) {
						aheadBy behindBy
						commits(first: 1) { nodes { committedDate } }
					}`
			)
			.join('\n');
		const data = graphql(`{
			repository(owner: "${OWNER}", name: "${REPO}") {
				ref(qualifiedName: "refs/heads/${DEFAULT_BRANCH}") { ${fields} }
			}
		}`);
		batch.forEach((name, index) => {
			const comparison = data.repository.ref[`b${index}`];
			comparisons.set(name, {
				ahead: comparison.aheadBy,
				behind: comparison.behindBy,
				firstCommit: comparison.commits.nodes[0]?.committedDate ?? ''
			});
		});
	}
	return comparisons;
}

function fetchOpenPullRequests() {
	return paginate(
		`query($cursor: String) {
			repository(owner: "${OWNER}", name: "${REPO}") {
				pullRequests(states: OPEN, first: ${PAGE_SIZE}, after: $cursor) {
					pageInfo { hasNextPage endCursor }
					nodes { ${OPEN_PULL_REQUEST_FIELDS} }
				}
			}
		}`,
		data => data.repository.pullRequests
	);
}

function dateOnly(timestamp) {
	return timestamp ? timestamp.slice(0, 10) : '';
}

function daysSince(timestamp) {
	if (!timestamp) return '';
	return Math.floor((Date.now() - Date.parse(timestamp)) / DAY_MS);
}

function memberStatus(login, members) {
	if (!login) return 'unknown (no GitHub login on commit)';
	if (/bot|buildkite/i.test(login)) return 'bot';
	return members.has(login) ? 'yes' : 'no';
}

// A branch can carry several pull requests (reused patch branches); prefer
// the open one, then the newest.
function pickPullRequest(pullRequests) {
	const own = pullRequests.filter(
		pullRequest =>
			pullRequest.headRepository?.nameWithOwner === `${OWNER}/${REPO}`
	);
	const open = own.filter(pullRequest => pullRequest.state === 'OPEN');
	return (open.length ? open : own).sort((a, b) =>
		b.createdAt.localeCompare(a.createdAt)
	)[0];
}

function pullRequestStatus(pullRequest) {
	if (!pullRequest) return 'no PR';
	if (pullRequest.state === 'MERGED') {
		return `merged ${dateOnly(pullRequest.mergedAt)}`;
	}
	if (pullRequest.state === 'CLOSED') {
		return `closed unmerged ${dateOnly(pullRequest.closedAt)}`;
	}
	const parts = [pullRequest.isDraft ? 'draft' : 'open'];
	if (pullRequest.reviewDecision) {
		parts.push(`review=${pullRequest.reviewDecision}`);
	}
	if (pullRequest.mergeStateStatus) {
		parts.push(`merge=${pullRequest.mergeStateStatus}`);
	}
	const checks =
		pullRequest.commits?.nodes[0]?.commit.statusCheckRollup?.state;
	if (checks) parts.push(`checks=${checks}`);
	return parts.join(' ');
}

function assess({ahead, pullRequest, lastCommit, authorMember}) {
	const idleDays = daysSince(lastCommit) || 0;
	let verdict;
	if (ahead === 0) {
		verdict = 'DELETE: no commits beyond main';
	} else if (pullRequest?.state === 'MERGED') {
		verdict = 'DELETE: PR already merged';
	} else if (pullRequest?.state === 'CLOSED') {
		verdict = 'DELETE: PR closed without merge';
	} else if (pullRequest) {
		const pullRequestIdleDays = daysSince(pullRequest.updatedAt);
		if (pullRequest.isDraft) {
			verdict =
				pullRequestIdleDays < 90
					? 'WIP: draft PR'
					: 'STALE WIP: draft PR idle >90d';
		} else if (pullRequestIdleDays < 30) {
			verdict = 'ACTIVE: open PR';
		} else if (pullRequestIdleDays < 90) {
			verdict = 'REVIEW: open PR idle 30-90d';
		} else {
			verdict = 'STALE: open PR idle >90d, ping author or close';
		}
	} else if (idleDays < 30) {
		verdict = 'WIP?: recent commits, no PR yet';
	} else if (idleDays < 180) {
		verdict = 'REVIEW: no PR, idle 30-180d';
	} else {
		verdict = 'DELETE?: no PR, idle >180d';
	}
	if (authorMember === 'no') verdict += '; author left org';
	return verdict;
}

function pullRequestColumns(pullRequest, members) {
	return {
		pr_number: pullRequest?.number ?? '',
		pr_url: pullRequest?.url ?? '',
		pr_opened: dateOnly(pullRequest?.createdAt),
		pr_author: pullRequest?.author?.login ?? '',
		pr_author_in_sourcegraph_org: pullRequest
			? memberStatus(pullRequest.author?.login, members)
			: '',
		pr_status: pullRequestStatus(pullRequest)
	};
}

function branchRow(branch, comparison, members, openPullRequests) {
	const login = branch.target.author?.user?.login ?? '';
	const lastCommit = branch.target.committedDate;
	const picked = pickPullRequest(branch.associatedPullRequests.nodes);
	const pullRequest = openPullRequests.get(picked?.number) ?? picked;
	const authorMember = memberStatus(login, members);
	return {
		branch: branch.name,
		branch_url: `${REPOSITORY_URL}/tree/${branch.name}`,
		first_commit: dateOnly(comparison.firstCommit),
		last_commit: dateOnly(lastCommit),
		days_idle: daysSince(lastCommit),
		tip_author: login,
		author_in_sourcegraph_org: authorMember,
		ahead_of_main: comparison.ahead,
		behind_main: comparison.behind,
		...pullRequestColumns(pullRequest, members),
		assessment: assess({
			ahead: comparison.ahead,
			pullRequest,
			lastCommit,
			authorMember
		})
	};
}

function forkPullRequestRow(pullRequest, members) {
	const login = pullRequest.author?.login ?? '';
	const authorMember = memberStatus(login, members);
	const fork = pullRequest.headRepository?.nameWithOwner ?? 'deleted fork';
	return {
		branch: `${fork}:${pullRequest.headRefName} (fork)`,
		branch_url: `https://github.com/${fork}/tree/${pullRequest.headRefName}`,
		first_commit: '',
		last_commit: dateOnly(pullRequest.updatedAt),
		days_idle: daysSince(pullRequest.updatedAt),
		tip_author: login,
		author_in_sourcegraph_org: authorMember,
		ahead_of_main: '',
		behind_main: '',
		...pullRequestColumns(pullRequest, members),
		assessment: assess({
			ahead: 1,
			pullRequest,
			lastCommit: pullRequest.updatedAt,
			authorMember
		})
	};
}

function toTsv(rows) {
	const lines = [COLUMNS.join('\t')];
	for (const row of rows) {
		lines.push(COLUMNS.map(column => String(row[column] ?? '')).join('\t'));
	}
	return lines.join('\n') + '\n';
}

function main() {
	const members = fetchOrganizationMembers();
	console.log(`${members.size} members in the ${OWNER} org`);

	const branches = fetchBranches().filter(
		branch => branch.name !== DEFAULT_BRANCH
	);
	console.log(`${branches.length} branches besides ${DEFAULT_BRANCH}`);
	const comparisons = fetchComparisons(branches.map(branch => branch.name));

	const openPullRequests = new Map(
		fetchOpenPullRequests().map(pullRequest => [
			pullRequest.number,
			pullRequest
		])
	);
	const rows = branches.map(branch =>
		branchRow(
			branch,
			comparisons.get(branch.name),
			members,
			openPullRequests
		)
	);
	const forkPullRequests = [...openPullRequests.values()].filter(
		pullRequest =>
			pullRequest.headRepository?.nameWithOwner !== `${OWNER}/${REPO}`
	);
	console.log(`${forkPullRequests.length} open pull requests from forks`);
	rows.push(
		...forkPullRequests.map(pullRequest =>
			forkPullRequestRow(pullRequest, members)
		)
	);

	fs.writeFileSync(OUTPUT_FILE, toTsv(rows));
	console.log(`✅ Wrote ${path.relative(process.cwd(), OUTPUT_FILE)}\n`);

	const counts = new Map();
	for (const row of rows) {
		const verdict = row.assessment.split(';')[0];
		counts.set(verdict, (counts.get(verdict) ?? 0) + 1);
	}
	for (const [verdict, count] of [...counts].sort((a, b) => b[1] - a[1])) {
		console.log(`${String(count).padStart(4)}  ${verdict}`);
	}
}

try {
	main();
} catch (error) {
	console.error(`❌ ${error.message}`);
	process.exit(1);
}
