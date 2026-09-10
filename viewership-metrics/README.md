# Viewership metrics

Page view, redirect and error counts for `/docs`, `/changelog` and `/blog` on
sourcegraph.com, from Cloudflare's GraphQL Analytics API.

## Run

Needs a Cloudflare API token with **Zone > Analytics > Read** on the
sourcegraph.com zone.

```sh
CLOUDFLARE_API_TOKEN=... npm run page-views-report            # last 90 days
CLOUDFLARE_API_TOKEN=... npm run page-views-report -- --days 30
```

Cloudflare keeps 90 days of history, so `--days` maxes out at 90.

## Reports

Written to `reports/`, committed so the numbers can be read without a
token. Every page report has the same rows,
sorted differently:

| File                         | Sorted by                                |
| ---------------------------- | ---------------------------------------- |
| `page-views-by-path.md`      | path                                     |
| `page-views-by-count.md`     | requests                                 |
| `page-views-by-redirects.md` | 3xx count                                |
| `page-views-by-errors.md`    | 404 + 5xx count                          |
| `redirect-rules.md`          | hits per rule in `src/data/redirects.ts` |

Page report columns: Requests and Visits count HTML 200 responses; Visits
is the subset whose referrer is not sourcegraph.com, Cloudflare's page-view
proxy. 3xx, 404 and 5xx are response counts for the path. Sitemap is `yes`
when the path is listed in <https://sourcegraph.com/sitemap.xml> (an index
over `sitemap-main.xml` for blog and changelog, and `docs/sitemap.xml`). A
`no` on `/docs` is a deleted page or probe path; the blog sitemap only lists
recent posts, so `no` on `/blog` is normal for old posts.

`redirect-rules.md` matches each rule's source against `/docs` 3xx counts.
Rules are first-match-wins, like `src/middleware.ts`, so a rule whose source
repeats an earlier one is flagged `shadowed`. The Chain column shows how
many more redirects a browser follows when a rule's destination is itself
another rule's source, and where the user finally lands. Its Sitemap column
says whether the rule's destination is in the sitemap, blank when the
redirect leaves the site. A `no` with an empty Chain means the rule sends
people to a 404; a `no` with a Chain is an intermediate hop.

## Redirect probe

`npm run probe-redirects` requests every rule's source on the live site,
follows the redirects like a browser, and writes `reports/redirect-probe.json`
with, per rule: every hop, the final URL and status, whether the first
redirect is the one the rule promises (`outcome`), and the Cloudflare rows
for the source, destination and final page from `page-views-by-path.md`
(run `page-views-report` first). Needs no token; about a minute.

Fragments: browsers never send `#fragment`, so a rule whose source has one
can only ever match as its bare path (`bareSourceRuleLine` is the rule that
actually fires, if any). The browser keeps the user's fragment across
redirects unless a `Location` header carries its own, so `final.fragment`
is what the address bar shows, `final.fragmentFrom` says where it came from
(`request` or `redirect`), and `final.anchorFound` whether the page has an
element with that id. `summary.byFragmentCase` totals all of this for the
four source/destination fragment combinations.

## Filters

- Bot Management decision `likely_human`, GET requests only
- Excluding ASN `Hetzner Online GmbH` (one hosting provider that dwarfs
  real German traffic) and country `CN`
- Page views (Requests, Visits) also require `jsDetectionPassed: Passed`:
  the browser ran Cloudflare's JS detection. `likely_human` alone lets
  through scrapers with spoofed browser user agents and ASNs (one fleet
  labelled Cox Communications, all with referer google.com and a single
  Linux Chrome user agent, was 30% of `/docs` page views). The first
  response of a visit only sets the detection cookie, so this counts
  visitors who load a second page and undercounts single-page visits.
  Redirects and errors are mostly first requests from stale external
  links, so they keep the looser filter and still include some scrapers.
- Skipped as noise: `/_next`, `__data.json` and static assets, paths with characters
  outside `[A-Za-z0-9/_.~@'-]` (scanner probes), and trailing-slash
  redirects. Trailing-slash variants of a page are merged.

## Known caveats

- Until 2026-09-09 ([#1860](https://github.com/sourcegraph/docs/pull/1860))
  the docs site returned 200 for unknown paths, so in any window that
  reaches back before then, deleted docs pages and probe paths like
  `/docs/.zshrc` count as page views rather than 404s.
- Counts are adaptive-sampled estimates from `httpRequestsAdaptiveGroups`,
  not exact totals.
- Blog and changelog pages are served from `github.com/sourcegraph/sourcegraph`
  (`blog/`, `changelog/`, `cmd/docs/`), not this repo, so `redirect-rules.md`
  only covers `/docs`. That site's only redirects are the `REDIRECTS` map in
  `cmd/docs/src/hooks.server.ts` (30 exact-match 301s, mostly marketing
  paths) plus a 302 in `changelog/pagination.ts` for out-of-range `?page=`.
  Two rules touch our prefixes, and both show in the page reports as 3xx:
  `/blog/rss.xml → /blog/feed.rss` (21,790 hits in 90 days, 94% of all
  blog + changelog redirects) and
  `/changelog/self-hosted/server → /changelog/self-hosted/kubernetes` (110).
  Cloudflare's path dimension drops the query string, so pagination
  redirects land on the bare `/changelog` and `/changelog/releases` rows.

## Problems found

From the first 90-day run, September 2026
([thread](https://ampcode.com/threads/T-01a08479-a4c8-72ad-8f31-fe7ecc43bf34)):

- **Docs soft-404s** (fixed in #1860). `/docs/<anything>` returned 200, so
  deleted pages such as
  `/docs/code_intelligence/tutorials/indexing_go_repo` (830 requests) and
  probes such as `/docs/.zshrc` (660), `/docs/id_dsa` (480) and
  `/docs/__data.json` (990) count as page views and never surface as errors.
  1,441 of 1,958 docs paths with traffic (40,690 of 277,670 docs requests)
  are not in the docs sitemap.
- **Redirect chains.** 269 of 962 live rules in `src/data/redirects.ts`
  redirect to another rule's source; the longest chain adds 5 hops. 11,640
  of 35,740 matched redirects landed on a chaining rule. Worst case is
  `/code_navigation/explanations/precise_code_navigation`, 3 redirects to
  reach `/code-navigation/precise-code-navigation`; the three
  `precise_code_navigation` rules alone send about 5,500 visitors through
  2 or 3 redirects.
- **Shadowed and dead redirect rules.** 362 rules repeat an earlier rule's
  source and can never match; 689 live rules had zero hits.
- **Redirects to soft 404s.** 512 live rules have a destination that is not
  in the sitemap (12,100 hits). 269 of those are chain hops into another
  rule; the rest are dead ends: 172 point at a `/docs` page that does not
  exist (280 hits) and 71 at unlisted `sourcegraph.com` paths such as
  `/handbook/...` and `/retrospectives/...` (180 hits). Docs examples:
  `/admin/external_services/postgres → /self-hosted/external_services/postgres`
  and `/integration/google_gsuite → /integration/google_workspace`, which
  both return 200 with the generic "Sourcegraph docs" title and have no
  `.mdx` in the repo.
- **Changelog pages missing from the sitemap.** `/changelog/releases/7.6`
  (780 requests), `/changelog/releases/7.0` (750) and dated posts such as
  `/changelog/2026-06-22` (330) serve real pages but are not in
  `sitemap-main.xml`.
- **Changelog API 5xx.**
  `/changelog/.api/changelog.v1.ChangelogService/ListReleasePosts` returned
  1,880 5xx responses. `/docs` itself returned 260.
- **Missing blog feed redirects.** `/blog/feed.atom` (3,410) and
  `/blog/feed.xml` (1,000) 404, while `/blog/rss.xml` redirects 21,790
  times. Feed readers are still polling the old URLs.
- **Old versioned docs paths.** 75 `/docs/@vX.Y/...` paths still receive
  traffic.
- **Redirect rule added mid-window.** `/changelog/self-hosted/server` shows
  150 requests served as 200 alongside 110 redirects, so the rule likely
  landed partway through the 90 days.
