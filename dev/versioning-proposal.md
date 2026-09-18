# Proposal: automate the monthly docs version bump

Status: draft for review. Replaces the manual runbook in Notion
("Deploying a New Version of Sourcegraph Docs") and the
`publishing-docs-versions` skill once implemented.

## Today

Each Sourcegraph minor `X.Y` retires the previous minor `P.Q` to a frozen
copy at `https://P.Q.sourcegraph.com`. Five hand steps across four systems:

1. Add `"P.Q"` to `local.major_versions` in `sourcegraph/infrastructure`
   `dns/sourcegraph.vercel.tf`: Entitle grant, PR, wait for Terraform.
2. Branch `vP_Q` from a hand-picked cut commit and push it to
   `sourcegraph/docs-legacy-versions`.
3. On that branch, set `P.Q` in `docs.config.js`, `src/data/versions.ts`
   and `docs/legacy.mdx`.
4. In `sourcegraph/docs`, bump the same three files to `X.Y` and add `P.Q`
   to the two lists; PR, review, merge.
5. In the Vercel dashboard, map `P.Q.sourcegraph.com` to preview branch
   `vP_Q` of the `docs-legacy-versions` project.

`git log -- docs.config.js` shows this ran five times since June 2026
(#1782, #1814, #1831, #1845, #2006), each with a matching infrastructure PR
(#7351, #7468, #7507, #7534). The three docs files carry the same fact
three times, and every other system already knows the answer: the release
registry knows which minors exist, Terraform knows which hosts exist, and
the legacy repo knows which snapshots exist.

The cut commit is not really a judgment call either: `v7_7` was branched
from `924aec3c`, the parent of the 8.0 bump commit `04482a08`. "Everything
on `main` before the bump documents `P.Q`" is the rule the process already
follows.

## Proposal

One hand-maintained fact, written by a bot and reviewed by a human:

```diff
 // docs.config.js: newest first; entry 0 is the version this deploy documents
 const DOCS_VERSIONS = [
+    '8.0',
     '7.7',
     '7.6',
```

Everything else derives from it or from the merge of that change.

### 1. One list instead of three files (docs repo only, no new secrets)

- `docs.config.js` holds `DOCS_VERSIONS` (all minors back to 3.21) and
  exports `DOCS_LATEST_VERSION = DOCS_VERSIONS[0]`, so `src/proxy.ts`,
  `src/app/layout.tsx` and `PreCodeBlock.tsx` keep working unchanged.
- `src/data/versions.ts` maps the list to `{name, url}`:
  `https://X.Y.sourcegraph.com` from 5.2 up, `https://docs.sourcegraph.com/@X.Y/`
  below. The selector and `/api/versions` show the current and previous
  major; the rest is on `/legacy`.
- `docs/legacy.mdx` renders a `<LegacyVersions />` component that groups the
  same list by major, instead of a hand-typed list of 60 links.
- The first entry gets the `latest` label unless Vercel's
  `VERCEL_GIT_REPO_SLUG` is `docs-legacy-versions`. A frozen branch then
  needs no metadata commit at all: cut from the parent of the bump, its list
  already ends at `P.Q`.

Why the list stays in the repo instead of being fetched from the release
registry at build time: `/v1/releases/sourcegraph` returns the newest 50
releases and ignores `limit`, `page` and `offset`, so it reaches 6.4 today
and loses a minor every few patch releases. A frozen host also has to pin
its own version, which the registry cannot tell it.

### 2. Archive the previous version on merge (docs repo, two secrets)

`.github/workflows/archive-previous-version.yml`, on `push` to `main` with
`paths: [docs.config.js]`:

1. Read `DOCS_LATEST_VERSION` from `HEAD^` (`P.Q`) and `HEAD` (`X.Y`); exit
   if equal.
2. Push `HEAD^` to `docs-legacy-versions` as branch `vP_Q`; refuse if the
   branch already exists. `workflow_dispatch` with an explicit cut commit
   covers the exceptions.
3. `POST /v10/projects/docs-legacy-versions/domains`
   `{"name": "P.Q.sourcegraph.com", "gitBranch": "vP_Q"}`.
4. Poll until `https://P.Q.sourcegraph.com/api/versions` (preview deploys
   have no `/docs` base path) reports `vP.Q` first, then post the result to
   `#alerts-vercel-doc-site` through the existing Slack app
   (`dev/report-vercel-build.mjs`). A missing DNS record, or a build Vercel
   skipped because the cut commit only touched files
   `dev/vercel-ignore-build.sh` excludes, shows up here as a failure instead
   of a broken link a week later.

Secrets: a deploy key with write access to `docs-legacy-versions`, and a
Vercel token scoped to that project (same shape as the existing
`VERCEL_TOKEN`, which is scoped to `sourcegraph-docs`).

### 3. Open the bump PR from the release registry (docs repo, no secrets)

`.github/workflows/open-version-bump-pr.yml`, daily and on
`workflow_dispatch`: fetch `/v1/releases/sourcegraph/latest`; if its minor is
not `DOCS_VERSIONS[0]` and no bump PR is open, insert it, open the PR with
the usual title, and request review from Support Engineering. Merging it
triggers step 2.

### 4. DNS: one infrastructure PR per major, not per minor

Add the whole next major to `local.major_versions` at once (`8.0` … `8.12`).
An unclaimed CNAME to `cname.vercel-dns.com` serves Vercel's 404 until step
2 maps it. The `versioned-docs-robots` Cloudflare worker reads the same
list, so the robots rule is covered too. This turns an Entitle grant plus PR
every month into one per year; a bot with standing write access to
`infrastructure` is the alternative and probably not worth the access.

## Result

Monthly: read one bot-opened PR, merge it, check one Slack message.
Yearly: one DNS PR. The Notion runbook and the skill shrink to those two
paragraphs plus the `workflow_dispatch` override for a non-standard cut.

Order: 1 is a self-contained cleanup and can ship now. 2 builds on 1 and
needs the two secrets. 3 and 4 are independent of each other and of 2.

## Considered and dropped

- Serve frozen versions under `/docs/v/P.Q/` by rewriting to the Vercel
  branch URL, removing DNS and domain mapping entirely: the frozen build's
  absolute `/_next/...` asset paths would hit the live site.
- A wildcard `*.sourcegraph.com` record: too broad for the zone.

## Open questions

- Selector scope: current and previous major (today 8.0 plus 7.x), or keep
  the current 14 entries (adds 6.7 to 6.12)?
- Cut rule: is "parent of the bump commit" acceptable as the default, with
  `workflow_dispatch` for exceptions?
- Who owns the two new secrets and their rotation?
