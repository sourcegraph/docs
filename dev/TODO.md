# TODO

- Rewrite `src/components/search/docsearch/` (vendored Algolia DocSearch) so the
  React Compiler ESLint rules `react-hooks/refs`, `react-hooks/set-state-in-effect`
  and `react-hooks/static-components` can go back to `error` in `eslint.config.mjs`
  (31 of the 39 warnings from `pnpm run lint` are in that directory)

## Docs site audit leftovers

Findings from the crawl of all 502 pages
(<https://ampcode.com/threads/T-01a0ae50-f7f0-779c-aa66-3887c9953e33>)
with no PR yet. Fixes with PRs: #1998–#2004.

- Cloudflare AI Labyrinth injects a hidden `<a href="/cdn-cgi/content?id=…">`
  as the first child of `<body>` for suspected bots, so React hydration fails
  (#418) on 102 of 502 pages. Cloudflare setting: exclude
  `sourcegraph.com/docs/*` from AI Labyrinth.
- Every page has the same `<meta name="description">`
  (`src/app/layout.tsx`); `generateMetadata` in `src/app/[...slug]/page.tsx`
  never sets one. Derive it from the first paragraph.
- Duplicate `<title>`s: the title is the first heading only, so 4 pages are
  "How-to guides", 3 "FAQs", 3 "How-tos", … Suffix with the parent section.
- `src/app/sitemap.ts`: the last-modified time is the build time for every
  page, and both `/docs` and `/docs/` are listed.
- `docs/self-hosted/postgresql-collation-version-mismatch-resolution.mdx`
  renders 10 `<h1>`s; demote all but the first.
- `docs/integration/gitlab.mdx:29` embeds `img/gitlab-code-intel.gif`, but
  nothing serves `docs/**/img` (404); move it to `public/` after #1977 lands.
  The other ~50 files in `docs/integration/img/` are orphaned.
- Code-comment color in the syntax theme is `#B362FF` on `#2d2b55` (3.84:1,
  below WCAG AA); the rest of the contrast findings landed in #1995.
- `/admin/config/site-config#<key>` anchors (19 inbound links) do not exist:
  the schema renderer emits no per-key ids. Deferred by #1925.
- `/self-hosted/observability/dashboards` is generated from the
  sourcegraph/sourcegraph sync (#1971) and is a giant page; fix upstream.
