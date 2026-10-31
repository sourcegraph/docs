#!/usr/bin/env sh
# Vercel's ignoreCommand (vercel.json): exit 0 to skip the build when the
# commit only touches files the site build never reads. Anything dev/ that
# `pnpm run build` runs (checks.mjs, check-*.mjs, generate-mermaid-icons.mjs)
# must stay out of this list.
# Keep this list sorted alphabetically
exec git diff --quiet HEAD^ HEAD -- . \
	':(exclude).agents' \
	':(exclude).amp' \
	':(exclude).github' \
	':(exclude).gitignore' \
	':(exclude).vscode' \
	':(exclude)AGENTS.md' \
	':(exclude)cspell*' \
	':(exclude)dev/check-duplicates.mjs' \
	':(exclude)dev/check-hostnames.mjs' \
	':(exclude)dev/check-redirects.mjs' \
	':(exclude)dev/check-spelling.mjs' \
	':(exclude)dev/example-hostnames.json' \
	':(exclude)dev/post-check-comment.sh' \
	':(exclude)dev/sync-review-comments.sh' \
	':(exclude)dev/vercel-build-log-slack-app-manifest.json' \
	':(exclude)dev/vercel-build-log.mjs' \
	':(exclude)dev/vercel-ignore-build.sh' \
	':(exclude)dev/verify-links-live.mjs' \
	':(exclude)README.md' \
	':(exclude)renovate.json'
