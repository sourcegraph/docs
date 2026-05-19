---
name: publishing-docs-versions
description: "Archives Sourcegraph docs release branches and updates latest-version metadata. Use when a new Sourcegraph docs version is released, when creating docs legacy branches, or when updating DOCS_LATEST_VERSION and previous-version lists."
---

# Publishing Sourcegraph Docs Versions

Use this skill for the Sourcegraph docs repo release-version workflow: cutting legacy branches in the `legacy` remote and updating `origin` so the newest version becomes `latest`.

## Repository conventions

- Remotes:
  - `origin` = `sourcegraph/docs`
  - `legacy` = `sourcegraph/docs-legacy-versions`
- 7.x legacy branches use underscores: `v7_0`, `v7_1`, `v7_2`, etc.
- Legacy branches are pushed directly to the `legacy` remote.
- `origin/main` is protected; direct pushes are rejected. Make a branch on `origin` and open a PR.
- The files that control latest/previous versions are:
  - `docs.config.js`
  - `src/data/versions.ts`
  - `docs/legacy.mdx`

## Standard workflow for a new release

For a new release `X.Y`:

1. Archive the previous docs version `P.Q` in the `legacy` remote.
2. Ensure the legacy branch’s own config says it is version `P.Q` and lists older versions only.
3. Update `origin` so `X.Y` is latest and `P.Q` appears as a previous version.

Example: when 7.4 is released, archive 7.3 as `legacy/v7_3`, then update `origin` with `DOCS_LATEST_VERSION: '7.4'` and add 7.3 to previous-version lists.

## Finding the cut point for a legacy branch

Always inspect history instead of guessing:

```bash
git fetch --all --prune
git log --date=short --pretty=format:'%h %ad %s' origin/main --since='<release date - 1 week>' --until='<release date + 2 weeks>' --reverse
git for-each-ref refs/remotes/legacy --format='%(refname:short) %(objectname:short) %(committerdate:short) %(subject)' | sort -V | tail -50
```

Pick the commit the user considers the correct snapshot for the previous version. If the user gives a release date but not a commit, use the repo’s existing pattern:

- Choose a hand-picked `origin/main` commit near the release cut.
- Prefer the last relevant docs commit on the release date when obvious.
- If no version-bump commit exists yet and the user wants the just-current docs archived, use the current `origin/main` tip.

For reference, recent historical decisions:

- `legacy/v7_0` was cut from `a5d80e5e` and then got empty no-op marker commits.
- `legacy/v7_1` was cut from `6b8ae421` for the Apr 24 release-date snapshot.
- `legacy/v7_2` was cut from `fccceac6`, then updated with a version metadata commit.

## Creating and pushing the legacy branch

Create the branch from the selected cut commit, add an empty marker commit, and push to `legacy`:

```bash
git switch --detach <cut-commit>
git switch -c vX_Y
git commit --allow-empty -m "Branch for docs version X.Y"
git push -u legacy vX_Y
```

Then update the legacy branch so it identifies itself as `X.Y` and lists only older versions.

For `v7_3`, for example:

- `docs.config.js`: `DOCS_LATEST_VERSION: '7.3'`
- `src/data/versions.ts`: first entry remains `latest`; previous entries should include `v7.2`, `v7.1`, `v7.0`, then 6.x.
- `docs/legacy.mdx`: `Sourcegraph 7.X` should include `7.2`, `7.1`, `7.0` (not 7.3 itself).

Commit and push:

```bash
git add docs.config.js src/data/versions.ts docs/legacy.mdx
git commit -m "Update docs latest version to X.Y"
git push legacy vX_Y
```

## Updating origin for the newly released version

Work on a branch from `origin/main`:

```bash
git switch main
git pull --ff-only origin main
git switch -c eg-update-docs-to-X-Y
```

Apply the same version metadata pattern, but for the new latest version.

For `7.4`, for example:

- `docs.config.js`: `DOCS_LATEST_VERSION: '7.4'`
- `src/data/versions.ts`: add previous versions in descending order: `v7.3`, `v7.2`, `v7.1`, `v7.0`, then 6.x.
- `docs/legacy.mdx`: add/update `Sourcegraph 7.X` with `7.3`, `7.2`, `7.1`, `7.0`.

Commit, push the branch, and open a PR:

```bash
git add docs.config.js src/data/versions.ts docs/legacy.mdx
git commit -m "Update docs latest version to X.Y"
git push -u origin eg-update-docs-to-X-Y
gh pr create --base main --head eg-update-docs-to-X-Y --title "Update docs latest version to X.Y" --body "## Summary
- Set DOCS_LATEST_VERSION to X.Y
- Add previous 7.x versions to the version selector
- Update the legacy versions page

## Test plan
- Not run (config/navigation content change only)"
```

## Verification

Use lightweight verification for this content/config change:

```bash
git diff -- docs.config.js src/data/versions.ts docs/legacy.mdx
git status --short --branch
git ls-remote --heads legacy 'v7_*'
```

Confirm:

- The legacy branch points to the pushed commit.
- The legacy branch lists only older previous versions.
- The origin PR branch sets the new latest version and includes the archived version in previous-version lists.
- Return the local workspace to clean `main` unless the user asked to stay on a release branch.
