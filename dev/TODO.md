# TODO

One PR per task; delete a task when its PR merges.

## Site

- Rewrite `src/components/search/docsearch/` (vendored Algolia DocSearch) so the
  React Compiler ESLint rules `react-hooks/refs`, `react-hooks/set-state-in-effect`
  and `react-hooks/static-components` can go back to `error` in `eslint.config.mjs`
  (31 of the 39 warnings from `pnpm run lint` are in that directory)
- Move `pnpm run dev` from webpack to Turbopack, like `pnpm run build`. The only
  thing keeping it on webpack is the `next-contentlayer2` plugin, which
  regenerates `.contentlayer` when an `.mdx` file changes; Turbopack has no
  plugin hook for that. Needs a way to start contentlayer's watcher
  (`contentlayer2 dev`) automatically when `next dev` starts, then the plugin
  and the `PHASE_DEVELOPMENT_SERVER` branch in `next.config.js` can go
- Faster Vercel static generation: the 505 `/api/og` images are ~40% of the
  "Generating static pages" time (locally 6.6s with them, 3.6s without).
  Options: hoist the font and logo reads in `src/app/api/og/[...path]/route.tsx`
  to module scope, or render one image per top-level section instead of per page
- `pnpm-lock.yaml` pins two `caniuse-lite` versions (`1.0.30001769` and
  `1.0.30001810`); dedupe to the newer one so `next build` stops warning that
  Browserslist data is stale. #1909 was closed unmerged

## Docs site audit leftovers

Findings from the crawl of all 502 pages
(<https://ampcode.com/threads/T-01a0ae50-f7f0-779c-aa66-3887c9953e33>)
with no PR yet. Fixes with PRs: #1998–#2004.

- Every page has the same `<meta name="description">`
  (`src/app/layout.tsx`); `generateMetadata` in `src/app/[...slug]/page.tsx`
  never sets one. Derive it from the first paragraph.
- Duplicate `<title>`s: the title is the first heading only, so 4 pages are
  "How-to guides", 3 "FAQs", 3 "How-tos", … Suffix with the parent section.
- `src/app/sitemap.ts`: the last-modified time is the build time for every
  page, and both `/docs` and `/docs/` are listed.
- `docs/self-hosted/postgresql-collation-version-mismatch-resolution.mdx`
  renders 13 `<h1>`s; demote all but the first.
- Code-comment color in `src/styles/shades-of-purple.json` is `#B362FF` on
  `#2d2b55` (3.84:1, below WCAG AA); the rest of the contrast findings landed
  in #1995.
- `/admin/config/site-config#<key>` anchors (19 inbound links) do not exist:
  the schema is rendered as one JSON code block with no per-key ids. Deferred
  by #1925.
- `/self-hosted/observability/dashboards` is generated from the
  sourcegraph/sourcegraph sync (#1971) and is a giant page; fix upstream.

## Cloudflare (needs a Cloudflare admin)

`sourcegraph.com/docs/docs/_next/...` 404s are bingbot following the
`docs.sourcegraph.com/<page>` **302** and resolving the page's
`/docs/_next/...` asset URLs against the old host. Verified 2026-09-25:
`docs.sourcegraph.com/<page>` → 302 `sourcegraph.com/docs/<page>`, and
`docs.sourcegraph.com/docs/<page>` → 302 `sourcegraph.com/docs/docs/<page>`.

- Make the `docs.sourcegraph.com` redirect a 301.
- Redirect `docs.sourcegraph.com/docs/*` to `sourcegraph.com/docs/$1` without
  doubling the prefix.

## GitHub repo settings (needs an org admin)

- Add required status checks to the `main` ruleset: the link check and the
  Vercel build. Today "Broken links introduced by this PR" and "CSpell
  (advisory)" can be red and the PR still merges.
- Restrict the ruleset's `allowed_merge_methods` to `squash`; it still lists
  `merge` and `rebase`, so only the repo-level setting enforces squash.
- Turn off Projects (`has_projects`); Issues are already off.
- Add `CODEOWNERS` and `.github/dependabot.yml`; confirm Actions permissions
  and Dependabot alerts are on (not readable without admin).
