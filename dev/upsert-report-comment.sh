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
# Total findings counts every distinct finding any revision of the PR had;
# Remediated is how many of those the current revision no longer has, so a
# merged PR's comment says how many it was merged with. To tell a fixed finding
# from a new one, the comment ends with a hidden list of every finding seen so
# far, in the form the check writes to its --keys file (one identity per line,
# without line numbers, so the same problem on several lines of a file is one
# finding, and the table can differ from the count in the heading).
#
# Nothing is posted for a PR that never had findings, to spare its author the
# notification; updating an existing comment sends none.
#
# Usage: dev/upsert-report-comment.sh '<!-- check-links-report -->' report.md keys.txt
#        dev/upsert-report-comment.sh '<!-- check-links-report -->' notice.md --crashed
#
# With --crashed, the report says the check could not run; the table and the
# list carry over from the previous comment, if there was one.
# Needs GH_TOKEN, GITHUB_REPOSITORY, and PR_NUMBER.
set -eu
marker=$1
report=$2
keys=$3
comments="repos/$GITHUB_REPOSITORY/issues/$PR_NUMBER/comments"

existing=$(gh api "$comments" --paginate \
    --jq ".[] | select(.body | startswith(\"$marker\")) | {id, body}" | jq -c . | head -n 1)
previous_body=$(printf '%s' "$existing" | jq -r '.body // ""')
previous_seen=$(printf '%s\n' "$previous_body" | sed -n '/^<!-- seen$/,/^-->$/p' | sed '1d;$d')

if [ "$keys" = --crashed ]; then
    seen=$previous_seen
    table=$(printf '%s\n' "$previous_body" | sed -n 's/^| \([0-9]*\) | \([0-9]*\) |$/\1 \2/p' | head -n 1)
else
    seen=$({ printf '%s\n' "$previous_seen"; cat "$keys"; } | grep -v '^$' | sort -u || true)
    total=$(printf '%s\n' "$seen" | grep -c . || true)
    current=$(sort -u "$keys" | grep -c . || true)
    table="$total $((total - current))"
    [ -n "$existing" ] || [ "$total" -gt 0 ] || exit 0
fi

body=$(mktemp)
{
    echo "$marker"
    head -n 1 "$report"
    if [ -n "$table" ]; then
        printf '\n| Total findings | Remediated |\n| --- | --- |\n| %s | %s |\n' "${table% *}" "${table#* }"
    fi
    tail -n +2 "$report"
    if [ -n "$seen" ]; then
        printf '<!-- seen\n%s\n-->\n' "$seen"
    fi
} > "$body"

if [ -n "$existing" ]; then
    gh api --method PATCH "repos/$GITHUB_REPOSITORY/issues/comments/$(printf '%s' "$existing" | jq -r .id)" \
        --field body=@"$body" > /dev/null
else
    gh pr comment "$PR_NUMBER" --body-file "$body"
fi
