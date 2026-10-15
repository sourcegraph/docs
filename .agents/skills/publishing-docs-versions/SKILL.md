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
- Legacy branches are named `v<major>_<minor>` with an underscore: `v5_2`, `v6_12`, `v7_7`, etc.
- Legacy branches are pushed directly to the `legacy` remote.
- `origin/main` is protected; direct pushes are rejected. Make a branch on `origin` and open a PR.
- The files that control latest/previous versions are:
  - `docs.config.js`
  - `src/data/versions.ts`
- `src/data/versions.ts` on `origin/main` is the canonical dropdown list. The
  current site exposes it through `/docs/api/versions`, and legacy selectors
  load that manifest at runtime.
- A legacy branch's bundled `src/data/versions.ts` is only a fallback. Its first
  entry identifies the archived site and must not have the `latest` label.

## Standard workflow for a new release

For a new release `X.Y`:

1. Archive the previous docs version `P.Q` in the `legacy` remote.
2. Ensure the legacy branch’s own config says it is version `P.Q`, marks it as
   selected rather than latest, and lists older fallback versions only.
3. Update `origin` so `X.Y` is latest and `P.Q` appears as a previous version.

Example: when 7.4 is released, archive 7.3 as `legacy/v7_3`, then update `origin` with `DOCS_LATEST_VERSION: '7.4'` and add 7.3 to previous-version lists.

## Finding the cut point for a legacy branch

The archive for `P.Q` must not contain anything merged at or after the public
release of `X.Y`. The publish time is a hard ceiling, not a target: an earlier
hand-picked cut is fine when the reason is stated at the confirmation step.
Never default to the `origin/main` tip.

1. Get the publish time of `X.Y.0` in UTC. Use the GitHub release; fall back to
   the changelog API. Do not use the tag or `created_at`: the tag exists before
   the release is public (7.7.0 was tagged 28 hours before it was published).
   Also record when the `X.Y.x` release branch was cut from `main`.

```bash
gh api repos/sourcegraph/sourcegraph/releases/tags/vX.Y.0 --jq '{published_at, created_at}'
curl -s 'https://sourcegraph.com/changelog/.api/search?q=X.Y.0' \
  | jq '.results[] | select(.type=="release-page" and .slug=="X.Y.0") | .release.sourcegraph | {promotedAt, gitSha}'
gh api repos/sourcegraph/sourcegraph/compare/main...X.Y.x --jq '.merge_base_commit.commit.committer.date'
```

2. Find the ceiling commit and the docs PRs the archive must exclude. Use the
   full ISO timestamp; a date-only value widens the window.

```bash
git fetch --all --prune
PUBLISHED=<published_at, e.g. 2026-01-02T03:04:05Z>
git log -1 --first-parent --before="$PUBLISHED" --date=iso-strict --format='%h %cd %s' origin/main
gh pr list --repo sourcegraph/docs --state merged --search "base:main merged:>=$PUBLISHED" --json number,title,mergedAt,mergeCommit
git for-each-ref refs/remotes/legacy --format='%(refname:short) %(objectname:short) %(committerdate:short)' | sort -V | tail -5
```

   `git merge-base --is-ancestor <mergeCommit> <cut>` must fail for every PR
   that list returns.

3. Flag PRs merged between the release-branch cut date and the ceiling that may
   carry `X.Y` content. Flagging is a signal for the user, not an automatic
   exclusion.

- Bodies or review comments saying "merge after X.Y releases", "hold until", or
  "do not merge":

```bash
gh pr list --repo sourcegraph/docs --state all --search "base:main updated:<branch-cut-date>..<published + 7 days>" --json number,title,state,mergedAt,body
gh api repos/sourcegraph/docs/pulls/<n>/comments --jq '.[].body'
```

- `🤖 Sync generated docs` PRs whose sync commit is dated after the release-branch
  cut: their pages come from `main`, which is already the next version.
- PRs that link a `sourcegraph/sourcegraph` PR. If that PR's merge commit is on
  `X.Y.x`, the docs PR documents an `X.Y` feature:

```bash
gh api repos/sourcegraph/sourcegraph/compare/X.Y.x...<merge_commit_sha> --jq .status
```

  `behind` means included. For `diverged`, search for a `[Backport X.Y.x]` PR
  before concluding it is not.

4. Propose and wait. Post the publish time and its source, the ceiling commit,
   the excluded PRs, each flagged PR with its reason, and the proposed cut. If
   the proposed cut is earlier than the ceiling, say why. Stop until the user
   confirms the commit. Do not create or push the legacy branch before that.

Example: `v8_0` was first cut from the `origin/main` tip `fb50b82b` (#2090,
"Merge after 8.1 releases", merged six minutes after 8.1.0 was published) and
re-cut from `ddfe8c2`. The ceiling was `5e5bb56`; `ddfe8c2` also left out #2078
(documents sourcegraph#16774, which is on `8.1.x`) and the post-cut sync #2071.

## Creating and pushing the legacy branch

Only after the user confirmed the cut commit. Create the branch from it, add an
empty marker commit, and push to `legacy`:

```bash
git switch --detach <cut-commit>
git switch -c vX_Y
git commit --allow-empty -m "Branch for docs version X.Y"
git push -u legacy vX_Y
```

Then update the legacy branch so it identifies itself as `X.Y` and lists only
older fallback versions. The runtime manifest supplies the current canonical
list when the current docs site is available.

For `v7_3`, for example:

- `docs.config.js`: `DOCS_LATEST_VERSION: '7.3'`
- `src/data/versions.ts`: first entry identifies `v7.3` without a `latest`
  label; fallback entries should include `v7.2`, `v7.1`, `v7.0`, then 6.x.

Commit and push:

```bash
git add docs.config.js src/data/versions.ts
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

Commit, push the branch, and open a PR:

```bash
git add docs.config.js src/data/versions.ts
git commit -m "Update docs latest version to X.Y"
git push -u origin eg-update-docs-to-X-Y
gh pr create --base main --head eg-update-docs-to-X-Y --title "Update docs latest version to X.Y" --body "## Summary
- Set DOCS_LATEST_VERSION to X.Y
- Add previous 7.x versions to the version selector

## Test plan
- Not run (config/navigation content change only)"
```

## Verification

Use lightweight verification for this content/config change:

```bash
git diff -- docs.config.js src/data/versions.ts
git status --short --branch
git ls-remote --heads legacy 'v7_*'
```

Confirm:

- The legacy branch points to the pushed commit.
- No docs PR merged at or after the `X.Y.0` publish time is an ancestor of the
  legacy branch.
- The legacy branch identifies itself without claiming to be latest and lists
  only older fallback versions.
- The origin PR branch sets the new latest version and includes the archived version in previous-version lists.
- The current manifest lists the new latest version first, and its URL points to
  `https://sourcegraph.com/docs`.
- Return the local workspace to clean `main` unless the user asked to stay on a release branch.
