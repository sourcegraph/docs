#!/usr/bin/env sh
# Report a check's findings on a PR: a summary comment, plus one review
# comment per finding in the review JSON. Both are found again on the next
# run by the marker on their first line, so each run leaves the PR showing
# the findings of the current revision and nothing else.
#
# Usage: dev/report-check.sh <name> <clean|found|crashed> report.md review.json
#   name    the marker prefix: `check-links` marks the summary
#           `<!-- check-links-report -->` and each review comment
#           `<!-- check-links-finding: ... -->`
#   report  the Markdown the check script wrote, the summary body for clean
#           and found; crashed gets a message linking the job log instead
#   review  {comments: [{path, line, start_line?, body}]} from the script's
#           --review, not read when crashed
#
# The summary is posted or reopened for findings and a crash; a clean result
# only updates and minimizes the summary of an earlier run, so a PR that
# never had findings never gets a comment. Review comments are posted for the
# new findings, updated when their text changed, and deleted when their
# finding is gone or GitHub could not carry them to the new revision (line is
# null). Needs GH_TOKEN, GITHUB_REPOSITORY, GITHUB_WORKFLOW, PR_NUMBER, and
# RUN_URL.
set -eu
name=$1
result=$2
report=$3
review=$4
repository="repos/$GITHUB_REPOSITORY"

# Summary comment

marker="<!-- $name-report -->"
existing=$(gh api "$repository/issues/$PR_NUMBER/comments" --paginate \
    --jq ".[] | select(.body | startswith(\"$marker\")) | \"\(.id) \(.node_id)\"" | head -n 1)

if [ "$result" = crashed ]; then
    body=$(printf '%s\n### ⚠️ %s could not run on this revision\n\nThis is a problem with the check, not with this PR; see the [job log](%s).\n' \
        "$marker" "$GITHUB_WORKFLOW" "$RUN_URL")
else
    body=$(printf '%s\n' "$marker"; cat "$report")
fi

if [ -z "$existing" ]; then
    [ "$result" = clean ] || gh api --method POST "$repository/issues/$PR_NUMBER/comments" --raw-field body="$body" --silent
else
    gh api --method PATCH "$repository/issues/comments/${existing% *}" --raw-field body="$body" --silent
    # Minimizing is GraphQL-only. Both mutations are idempotent
    if [ "$result" = clean ]; then
        mutation="minimizeComment(input: {subjectId: \$id, classifier: RESOLVED})"
    else
        mutation="unminimizeComment(input: {subjectId: \$id})"
    fi
    gh api graphql --raw-field id="${existing#* }" \
        --raw-field query="mutation(\$id: ID!) { $mutation { clientMutationId } }" --silent
fi

[ "$result" != crashed ] || exit 0

# Review comments, matched to the findings by file, line, and marker line

marker="<!-- $name-finding:"
key='(.path + ":" + (.line | tostring) + ":" + (.body | split("\n")[0]))'
pulls="$repository/pulls"

posted=$(gh api "$pulls/$PR_NUMBER/comments" --paginate \
    --jq ".[] | select(.body | startswith(\"$marker\")) | {id, body, key: $key}" | jq -s .)

printf '%s' "$posted" | jq -c --slurpfile review "$review" ".[]
    | .key as \$key
    | (\$review[0].comments | map(select($key == \$key)) | first) as \$wanted
    | if \$wanted == null then {id, method: \"DELETE\"}
      elif \$wanted.body != .body then {id, method: \"PATCH\", body: \$wanted.body}
      else empty end" \
| while read -r change; do
    comment="$pulls/comments/$(printf '%s' "$change" | jq -r .id)"
    if [ "$(printf '%s' "$change" | jq -r .method)" = DELETE ]; then
        gh api --method DELETE "$comment" < /dev/null
    else
        printf '%s' "$change" | jq '{body}' | gh api --method PATCH "$comment" --input - > /dev/null
    fi
done

fresh=$(jq --argjson posted "$posted" \
    ".comments |= map(select($key as \$key | \$posted | any(.key == \$key) | not))" "$review")
if [ "$(printf '%s' "$fresh" | jq '.comments | length')" -gt 0 ]; then
    printf '%s' "$fresh" | gh api --method POST "$pulls/$PR_NUMBER/reviews" --input - > /dev/null \
        || echo "::warning::Could not post the suggested fixes; they are in the report above"
fi
