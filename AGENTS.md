# Sourcegraph Docs - Agent Instructions

## Build Commands

- **Type Check**: `npx tsc --noEmit`
- **Build**: `npm run build`
- **Dev**: `npm run dev`
- **Lint**: `npm run lint` (ESLint 9 flat config in `eslint.config.mjs`; React
  Compiler rules are warnings until the vendored
  `src/components/search/docsearch` code is rewritten)
- **Framework**: Next.js 16 with `--webpack` (`next-contentlayer2` has no
  Turbopack plugin); the request rewrite lives in `src/proxy.ts`;
  `/api/releases` and `/api/versions` opt into static caching with
  `export const dynamic = 'force-static'`
- **Checks**: `npm run check` runs every `dev/check-*.mjs` (links, filenames,
  images); `npm run build` runs filenames and images first, so a finding from
  those fails a deploy. Links is not in the build: it runs as its own PR check
  (`.github/workflows/check-links.yml`)
- **Check redirects**: `node dev/check-redirects.mjs` reports broken entries in
  `src/data/redirects.ts` (CI comments on PRs that break redirects; see the
  script header for what it checks). Not part of `npm run check`: main has
  hundreds of pre-existing findings, and CI only reports the ones a PR adds
- **Prove changed links resolve on a deploy**:
  `node dev/verify-links-live.mjs --site <vercel-preview-url>` prints a
  Markdown table for the PR description

### Links

- `npm run check -- links --check-anchors --check-self-links`. CI comments on
  PRs that break links and fails the `Broken links introduced by this PR`
  check; see `dev/check-links.mjs`.
- When moving a page or renaming a heading, update every link to it; a
  redirect in `src/data/redirects.ts` does not satisfy the check.
- Link to this site with relative paths (`/admin/config/site-config`), never
  `https://sourcegraph.com/docs/…` or `https://docs.sourcegraph.com/…`.
- To also probe the external links you added:

```sh
npm run check -- links --check-anchors --check-self-links \
  --check-external --diff <(git diff -U0 origin/main)
```

### PR check comments

The spelling, links, and redirects checks comment on the PR: a summary
comment per check, plus an inline review comment with a `suggestion` block on
each flagged line. After pushing, read them and follow the instructions they
give (fix the spelling, the link, or the redirect); do not work around a
finding, and add a word to `cspell-allow-list.txt` only when it is correct.

```sh
gh pr checks <pr>
gh api repos/sourcegraph/docs/issues/<pr>/comments --paginate --jq '.[].body'
gh api repos/sourcegraph/docs/pulls/<pr>/comments --paginate \
    --jq '.[] | "\(.path):\(.line)\n\(.body)\n"'
```

Fork PRs get no comments; the findings are in the job log
(`gh run view <run-id> --log`). The checks resolve their own comments on the
next run.

### Vercel build failures

- Vercel shows build logs only to its team members, so
  `.github/workflows/vercel-build-report.yml` attaches the log to the Vercel
  Slack app's "failed to deploy" post in `#alerts-vercel-doc-site` and comments
  a link to it on the PR (see `dev/report-vercel-build.mjs`). The log itself
  never goes on the PR, since the repository is public.
- It reads Vercel with the `VERCEL_TOKEN` repo secret, a token scoped to the
  `sourcegraph-docs` project that expires 2026-12-10; mint a new one with
  `POST /v3/user/tokens?teamId=<team>` and `projectId` in the body.
- Slack needs the `SLACK_BOT_TOKEN` repo secret and `SLACK_CHANNEL_ID` repo
  variable. The bot is the Slack app in `dev/slack-app-vercel-build-report.json`;
  to recreate it, paste that manifest at
  <https://api.slack.com/apps?new_app=1> (From a manifest), install it, copy its
  Bot User OAuth Token into the secret, and `/invite @Vercel build log` to the
  channel.
