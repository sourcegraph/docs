# TODO

- Rewrite `src/components/search/docsearch/` (vendored Algolia DocSearch) so the
  React Compiler ESLint rules `react-hooks/refs`, `react-hooks/set-state-in-effect`
  and `react-hooks/static-components` can go back to `error` in `eslint.config.mjs`
  (31 of the 39 warnings from `pnpm run lint` are in that directory)
- `pnpm run dev` (`next dev --webpack`) fails to serve pages on main since the
  Next 16 upgrade: `ReferenceError: require is not defined` from
  `next/src/build/webpack/loaders/postcss-loader`. Fix it, or move dev to
  Turbopack by running `contentlayer2 dev` alongside `next dev` and dropping
  the `next-contentlayer2` plugin from `next.config.js` entirely
- Faster Vercel static generation: the 505 `/api/og` images are ~40% of the
  "Generating static pages" time (locally 6.6s with them, 3.6s without).
  Options: hoist the font and logo reads in `src/app/api/og/[...path]/route.tsx`
  to module scope, or render one image per top-level section instead of per page
