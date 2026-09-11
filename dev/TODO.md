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
(`7180-*.js`: 24.4 MB raw, 2.78 MB gzip; First Load JS 2.95 MB). Its hash
changes on every deploy, so the CDN and every browser re-download it.
Confirmed in Chrome DevTools: 51 requests, 3.4 MB transferred, 28.0 MB
resources for one page; 2,539 kB of that is this chunk.
Fix: compute what those components need on the server
(`src/app/[...slug]/page.tsx`) and pass it as props.

## 3. Pin the toolchain

PR #1906. Watch the preview build log for `Using pnpm@10`.

## 4. Dead Langbase secrets

`NEXT_LB_PIPE_API_KEY` and `LANGBASE_PIPE_ASK_SG_API_KEY` are set in all
three environments. No other team project, no repo in the org, and no
current code references them (Langbase was removed in #1898). Delete
them from the Vercel project and rotate at Langbase.

## 5. Runtime

- a./b. PR #1912 (stacked on #1901): prerender `/api/md/[...slug]`,
  enable Fluid compute. After the preview deploys, compare `.md` and
  `/api/og` latency and `x-vercel-cache` against production.
- c. Draft PR #1907: static redirects moved to `next.config.js`;
  middleware kept for `.md` rewrites and version patterns. Conflicts with
  #1908 on `next.config.js`; merge one, rebase the other.

## 6. Build

- a. Draft PR #1908: run `dev/check-*.mjs` once from the `build` script.
- b. Draft PR #1909: caniuse-lite bump, lint warnings to zero.
- c. Build cache is ~880 MB because `node_modules` is ~894 MB and
  `.next/cache` ~303 MB (`@next/swc` 110 MB, `next` 101 MB, `mermaid`
  65 MB, `@effect-ts/system` 45 MB via contentlayer, `typescript` 38 MB,
  `lucide-react` 30 MB). No quick win; revisit after task 1 replaces
  contentlayer and if `mermaid` can be loaded client-side only.
- d. Web Analytics and Speed Insights: disabled 2026-09-11 via API.

## 7. Doubled base path 404s

Source found via `vercel.com/api/logs/request-logs` (the `vercel logs`
CLI drops referer/user-agent): 98 % are bingbot with referer
`https://docs.sourcegraph.com/<page>`. Cloudflare answers
`docs.sourcegraph.com/*` with a **302** to `sourcegraph.com/docs/*`, and
Bing resolves the page's `/docs/_next/...` asset URLs against the
pre-redirect host, so they come back as `docs.sourcegraph.com/docs/_next/...`
→ 302 → `sourcegraph.com/docs/docs/_next/...` → 404.

Fix (Cloudflare, not this repo):
- Make the `docs.sourcegraph.com` redirect a **301** so Bing drops the old
  URLs from its index and stops crawling them.
- Add a rule so `docs.sourcegraph.com/docs/*` redirects to
  `sourcegraph.com/docs/$1` without doubling the prefix.

Fix (this repo):
- Every page sets `<link rel="canonical" href="https://sourcegraph.com/docs">`
  (`src/app/layout.tsx` `alternates.canonical: '/docs'`, never
  overridden). Set a per-page canonical in `src/app/[...slug]/page.tsx`
  `generateMetadata` so crawlers consolidate on the real URL.
- Optional guard in `next.config.js#redirects()`:
  `{source: '/docs/:path*', destination: '/:path*', permanent: true}`
  (Next prepends `basePath`, so this matches `/docs/docs/*`).
