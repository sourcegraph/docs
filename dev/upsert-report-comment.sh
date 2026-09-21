#!/usr/bin/env sh
# Post a check's report as the PR's status comment for that check, or update
# the one it posted earlier (found by the marker on its first line). Below the
# report's first line, the comment keeps a table the check's history can be read
# from, since inline comments are deleted once fixed and the report is replaced:
#
#   | Total findings | Remediated |
#   | --- | --- |
#   | 12 | 8 |
#
# Total findings is the most any revision of the PR had; Remediated is how many
# of those the current revision no longer has, so a merged PR's comment says
# how many it was merged with. The report's first line must contain the
# current count as its first integer, or no integer when there are none.
#
# Nothing is posted for a PR that never had findings, to spare its author the
# notification; updating an existing comment sends none.
#
# Usage: dev/upsert-report-comment.sh '<!-- check-links-report -->' report.md
#        dev/upsert-report-comment.sh '<!-- check-links-report -->' notice.md --crashed
#
# With --crashed, the report says the check could not run; the table carries
# over from the previous comment, if there was one.
# Needs GH_TOKEN, GITHUB_REPOSITORY, and PR_NUMBER.
set -eu
marker=$1
report=$2
crashed=${3:-}
comments="repos/$GITHUB_REPOSITORY/issues/$PR_NUMBER/comments"

existing=$(gh api "$comments" --paginate \
    --jq ".[] | select(.body | startswith(\"$marker\")) | {id, body}" | jq -c . | head -n 1)
# "total remediated" from the previous comment's table row, or "0 0"
previous=$(printf '%s' "$existing" | jq -r '.body // ""' \
    | sed -n 's/^| \([0-9]*\) | \([0-9]*\) |$/\1 \2/p' | head -n 1)
previous=${previous:-0 0}
previous_total=${previous%% *}
previous_remediated=${previous##* }

if [ "$crashed" = --crashed ]; then
    total=$previous_total
    remediated=$previous_remediated
else
    current=$(head -n 1 "$report" | sed -n 's/^[^0-9]*\([0-9][0-9]*\).*/\1/p')
    current=${current:-0}
    total=$(( current > previous_total ? current : previous_total ))
    remediated=$(( total - current ))
    [ -n "$existing" ] || [ "$total" -gt 0 ] || exit 0
fi

body=$(mktemp)
{
    echo "$marker"
    head -n 1 "$report"
    if [ -n "$existing" ] || [ "$crashed" != --crashed ]; then
        printf '\n| Total findings | Remediated |\n| --- | --- |\n| %s | %s |\n' "$total" "$remediated"
    fi
    tail -n +2 "$report"
} > "$body"

if [ -n "$existing" ]; then
    gh api --method PATCH "repos/$GITHUB_REPOSITORY/issues/comments/$(printf '%s' "$existing" | jq -r .id)" \
        --field body=@"$body" > /dev/null
else
    gh pr comment "$PR_NUMBER" --body-file "$body"
fi
