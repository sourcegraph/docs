# TODO

- Rewrite `src/components/search/docsearch/` (vendored Algolia DocSearch) so the
  React Compiler ESLint rules `react-hooks/refs`, `react-hooks/set-state-in-effect`
  and `react-hooks/static-components` can go back to `error` in `eslint.config.mjs`
  (39 of the 47 warnings from `npm run lint` are in that directory)
