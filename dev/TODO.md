# TODO

Vercel project `sourcegraph-docs`. One PR per task; delete a task when
its PR merges.

## 1. Node 20 build image is deprecated (separate thread)

Node 20.x deployments fail after 2026-10-01. `contentlayer` 0.3.4 emits
`assert { type: 'json' }`, which Node ≥ 22 rejects. Migrate to
`contentlayer2` / `next-contentlayer2` ≥ 0.5.0, then set Node 22 in
`.tool-versions` and `package.json#engines`.

## 2. 24 MB shared JS chunk on every page

`src/components/Toc.tsx` and `src/components/ContentTabs.jsx` are
`'use client'` and import `allPosts`, so every post's raw and compiled
body ships in one client chunk (`7180-*.js`: 24.4 MB raw, 2.78 MB gzip,
re-downloaded after every deploy). Fix: resolve the post on the server
in `src/app/[...slug]/page.tsx` and pass only what each component needs
as props (`Toc`: the post `_id`; `ContentTabs`: the rendered fallback
tab), then drop the `allPosts` imports.

## 5. Runtime

- Skip builds for non-site changes: #1901.
- Prerender `/api/md/[...slug]`, enable Fluid compute: #1912 (stacked on
  #1901; retarget to `main` after it merges).
- Static redirects out of middleware: draft #1907 (rebase on `main` now
  that #1908 merged).

## 6. Build

- Lint warnings and stale `caniuse-lite`: draft #1909.

## 7. Doubled base path 404s and wrong canonical

`sourcegraph.com/docs/docs/_next/...` 404s are bingbot following the
Cloudflare **302** from `docs.sourcegraph.com/<page>` and resolving the
page's `/docs/_next/...` asset URLs against the old host.

- Cloudflare: make the `docs.sourcegraph.com` redirect a 301, and
  redirect `docs.sourcegraph.com/docs/*` to `sourcegraph.com/docs/$1`
  without doubling the prefix.
- Repo: every page emits `<link rel="canonical" href="https://sourcegraph.com/docs">`
  (`src/app/layout.tsx` `alternates.canonical: '/docs'`). Set a per-page
  canonical in `src/app/[...slug]/page.tsx#generateMetadata`.
