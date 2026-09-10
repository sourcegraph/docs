# TODO

## Dependency security

Baseline after removing `baseai`: `pnpm audit` reports 40 advisories, all pinned by `next` 14 or `contentlayer` 0.3.4.

- Add `.github/dependabot.yml` (weekly, grouped minor/patch) and a CI job that fails on `pnpm audit --audit-level high`
- Add `dev/snapshot-build.mjs`: after `pnpm build`, dump normalized `.contentlayer/generated` JSON and `.next/server/app/**/*.html` to `logs/snapshot/<label>/` so upgrades can be diffed against `main`
- Migrate `contentlayer` / `next-contentlayer` 0.3.4 (unmaintained since 2023, pins `next` to 12/13, pulls in `protobufjs`, `@grpc/grpc-js`, `esbuild`, `toml`) to `contentlayer2` / `next-contentlayer2`; verify with a zero-diff snapshot
- Upgrade `next` 14 → 15 and `react` 18 → 19 (all open `next` advisories are fixed only in 15.5.x); `params` becomes async in `src/app/[...slug]/page.tsx`, `src/app/api/md`, `src/app/api/og`; check `next-themes`, `kbar`, `@headlessui/react` peer ranges; then `eslint` 8 → 9
