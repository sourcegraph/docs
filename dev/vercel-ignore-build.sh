#!/usr/bin/env sh
# Vercel's ignoreCommand (vercel.json): exit 0 to skip the build when the
# commit only touches files the site build never reads. Anything dev/ that
# `npm run build` runs (checks.mjs, check-*.mjs, generate-mermaid-icons.mjs)
# must stay out of this list.
exec git diff --quiet HEAD^ HEAD -- . \
	':(exclude).github' \
	':(exclude).agents' \
	':(exclude).amp' \
	':(exclude).vscode' \
	':(exclude)AGENTS.md' \
	':(exclude)README.md' \
	':(exclude).gitignore' \
	':(exclude)cspell*' \
	':(exclude)dev/TODO.md' \
	':(exclude)reports' \
	':(exclude)dev/check-spelling.mjs' \
	':(exclude)dev/post-spelling-review.mjs' \
	':(exclude)dev/report-vercel-build.mjs' \
	':(exclude)dev/verify-links-live.mjs' \
	':(exclude)dev/sync-review-comments.sh' \
	':(exclude)dev/slack-app-vercel-build-report.json'
