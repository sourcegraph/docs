# TODO

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
