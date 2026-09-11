#!/usr/bin/env sh
# Make a check's suggested-change review comments on a PR match a review.json
# ({comments: [{path, line, start_line?, body}]}): post the new ones, update
# the ones whose text changed, and delete the ones whose finding is gone.
# GitHub sets line to null on comments it could not carry to the new revision,
# so those are deleted too. Comments are matched by file, line, and the
# marker comment on their first line, e.g. "<!-- check-links-finding: <url> -->".
#
# Usage: dev/sync-review-comments.sh '<!-- check-links-finding:' review.json
# Needs GH_TOKEN, GITHUB_REPOSITORY, and PR_NUMBER.
set -eu
marker=$1
review=$2
key='(.path + ":" + (.line | tostring) + ":" + (.body | split("\n")[0]))'
pulls="repos/$GITHUB_REPOSITORY/pulls"

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
