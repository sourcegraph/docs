# Sourcegraph Docs - Agent Instructions

## Build Commands

- **Type Check**: `npx tsc --noEmit`
- **Build**: `npm run build`
- **Dev**: `npm run dev`
- **Lint**: `npm run lint`
- **Checks**: `npm run check` runs every `dev/check-*.mjs` (links, filenames,
  images); `npm run build` runs them first, so any finding fails a deploy
- **Prove changed links resolve on a deploy**:
  `node dev/verify-links-live.mjs --site <vercel-preview-url>` prints a
  Markdown table for the PR description

### Links

- `npm run check -- links --check-anchors --check-self-links`. CI comments on
  PRs that break links; see `dev/check-links.mjs`. The build runs it without
  flags, so only dead page links fail a deploy.
- When moving a page or renaming a heading, update every link to it; a
  redirect in `src/data/redirects.ts` does not satisfy the check.
- Link to this site with relative paths (`/admin/config/site-config`), never
  `https://sourcegraph.com/docs/…` or `https://docs.sourcegraph.com/…`.
- To also probe the external links you added:

```sh
npm run check -- links --check-anchors --check-self-links \
  --check-external --diff <(git diff -U0 origin/main)
```
