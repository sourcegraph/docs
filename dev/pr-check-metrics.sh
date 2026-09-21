#!/usr/bin/env sh
# How many findings the PR checks reported on merged PRs, how many were fixed
# before merging, and how many were merged in: summed from the "Total findings"
# and "Remediated" tables in the checks' status comments, which
# dev/upsert-report-comment.sh keeps on each PR. A merged PR without a status
# comment for a check had no findings from it.
#
# Usage: dev/pr-check-metrics.sh [merged-since, e.g. 2026-09-10]
# Needs GH_TOKEN or a logged-in gh.
set -eu
since=${1:-$(date -v-30d +%F 2>/dev/null || date -d '30 days ago' +%F)}
repo=sourcegraph/docs

gh pr list -R "$repo" --state merged --limit 1000 --search "merged:>=$since" --json number --jq '.[].number' \
| while read -r pr; do
    gh api "repos/$repo/issues/$pr/comments" --paginate --jq '.[].body' \
    | awk -v pr="$pr" '
        /^<!-- [a-z-]+-report -->$/ { check = $2; sub(/-report$/, "", check) }
        check && /^\| [0-9]+ \| [0-9]+ \|$/ { print check, pr, $2, $4; check = "" }'
done \
| awk -v since="$since" '
    { prs[$1]++; total[$1] += $3; remediated[$1] += $4; merged_with[$1] += $3 - $4 }
    END {
        print "PRs merged since " since
        printf "%-16s %8s %8s %12s %12s\n", "check", "PRs", "total", "remediated", "merged with"
        for (check in prs)
            printf "%-16s %8d %8d %12d %12d\n", check, prs[check], total[check], remediated[check], merged_with[check]
    }'
