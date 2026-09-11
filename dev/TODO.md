# TODO

Vercel project: `sourcegraph-docs` (team `sourcegraph-f8c71130`). Audit
artifacts live in `logs/vercel-audit/` (git-ignored). One PR per task;
link PRs here as they open, delete tasks when they merge.

## 1. Node 20 build image is deprecated (separate thread)

Vercel build log warns that Node 20.x deployments fail after 2026-10-01.
`contentlayer` 0.3.4 emits `assert { type: 'json' }`, which Node ≥ 22
rejects; migrate to `contentlayer2` / `next-contentlayer2` ≥ 0.5.0 first,
then set Node 22 in `.tool-versions` and `package.json#engines`.

## 2. 24 MB shared JS chunk on every page

`src/components/Toc.tsx` and `src/components/ContentTabs.jsx` are
`'use client'` and import `allPosts` from `contentlayer/generated`, so
every post's raw + compiled body lands in one client chunk
(`7180-*.js`: 24.4 MB raw, 2.78 MB gzip; First Load JS 2.95 MB).
Fix: compute what those components need on the server
(`src/app/[...slug]/page.tsx`) and pass it as props.

## 3. Pin the toolchain

Build log picks `pnpm@9` "based on project creation date" while
`.tool-versions` says pnpm 10.25.0 / Node 20.19.6. Add `packageManager`
and `engines` to `package.json`.

## 4. Dead Langbase secrets

`NEXT_LB_PIPE_API_KEY` and `LANGBASE_PIPE_ASK_SG_API_KEY` are set in all
three environments. No other team project, no repo in the org, and no
current code references them (Langbase was removed in #1898). Delete
them from the Vercel project and rotate at Langbase.

## 5. Runtime

- a. `/api/md/[...slug]` (reached via the `*.md` middleware rewrite) is a
  dynamic lambda with `cache-control: max-age=0, must-revalidate`.
  Prerender it (`force-static` + `generateStaticParams`).
- b. Functions run on `standard_legacy` memory with Fluid compute off.
  Enable Fluid in `vercel.json`; validate `/api/og` and `.md` latency on
  the preview before merging.
- c. `src/middleware.ts` runs on every page and linear-scans ~5,900
  redirects from `src/data/redirects.ts`. Move static redirects to
  `next.config.js#redirects()`; keep middleware for `.md` rewrites and
  version patterns.

## 6. Build

- a. `dev/check-*.mjs` and `generate-mermaid-icons.mjs` run twice per
  build because `next.config.js` is evaluated twice. Run them once from
  the `build` script. Fix `generate-mermaid-logos` script, which points
  at a nonexistent file.
- b. `caniuse-lite` is stale and `next lint` warns on `<img>` in
  `Logo.tsx`, `mdx/LinkCards.tsx`, `mdx/ProductCards.tsx`,
  `mdx/ZoomableImage.tsx`, `api/og/[...path]/route.tsx`, plus a hook
  dependency in `ContentTabs.jsx`.
- c. Build cache upload is ~880 MB (~60 s of a ~140 s build). Measure
  what is in it before deciding whether it can shrink.

## 7. Doubled base path 404s

Runtime logs show 404s for `/docs/docs/_next/static/...`, all for the
not-found page's asset set. Find the referer (Observability query API,
log drain, or reproduce in a browser) and fix the source.
