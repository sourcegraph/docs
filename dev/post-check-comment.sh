#!/usr/bin/env sh
# Post a check's summary comment on a PR, or update the one it posted earlier,
# found by the marker on its first line. Findings and crashes post the comment
# or reopen it; a clean result only resolves an earlier comment, updating it
# and minimizing it, so a PR that never had findings never gets a comment.
#
# Usage: dev/post-check-comment.sh '<!-- check-links-report -->' <clean|found|crashed> report.md
# The report is the Markdown the check script wrote, used as the comment body
# for clean and found. Needs GH_TOKEN, GITHUB_REPOSITORY, GITHUB_WORKFLOW,
# PR_NUMBER, and RUN_URL.
set -eu
marker=$1
result=$2
report=$3
issues="repos/$GITHUB_REPOSITORY/issues"

existing=$(gh api "$issues/$PR_NUMBER/comments" --paginate \
    --jq ".[] | select(.body | startswith(\"$marker\")) | \"\(.id) \(.node_id)\"" | head -n 1)

if [ "$result" = crashed ]; then
    body=$(printf '%s\n### ⚠️ %s could not run on this revision\n\nThis is a problem with the check, not with this PR; see the [job log](%s).\n' \
        "$marker" "$GITHUB_WORKFLOW" "$RUN_URL")
else
    body=$(printf '%s\n' "$marker"; cat "$report")
fi

if [ -z "$existing" ]; then
    [ "$result" != clean ] || exit 0
    gh api --method POST "$issues/$PR_NUMBER/comments" --raw-field body="$body" --silent
    exit 0
fi

gh api --method PATCH "$issues/comments/${existing% *}" --raw-field body="$body" --silent

# Minimizing is GraphQL-only. Both mutations are idempotent
if [ "$result" = clean ]; then
    mutation="minimizeComment(input: {subjectId: \$id, classifier: RESOLVED})"
else
    mutation="unminimizeComment(input: {subjectId: \$id})"
fi
gh api graphql --raw-field id="${existing#* }" \
    --raw-field query="mutation(\$id: ID!) { $mutation { clientMutationId } }" --silent
