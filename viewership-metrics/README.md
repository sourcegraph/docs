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

Written to `reports/` (gitignored). Every page report has the same rows,
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
proxy. 3xx, 404 and 5xx are response counts for the path.

`redirect-rules.md` matches each rule's source against `/docs` 3xx counts.
Rules are first-match-wins, like `src/middleware.ts`, so a rule whose source
repeats an earlier one is flagged `shadowed`. The Chain column shows how
many more redirects a browser follows when a rule's destination is itself
another rule's source, and where the user finally lands.

## Filters

- Bot Management decision `likely_human`
- Excluding ASN `Hetzner Online GmbH` (one hosting provider that dwarfs
  real German traffic) and country `CN`
- Skipped as noise: `/_next` and static assets, paths with characters
  outside `[A-Za-z0-9/_.~@'-]` (scanner probes), and trailing-slash
  redirects. Trailing-slash variants of a page are merged.

## Known caveats

- The docs site returns 200 for unknown paths, so deleted docs pages and
  probe paths like `/docs/.zshrc` show up as page views. Blog and changelog
  return real 404s.
- Counts are adaptive-sampled estimates from `httpRequestsAdaptiveGroups`,
  not exact totals.
- Blog and changelog pages are served from `github.com/sourcegraph/sourcegraph`
  (`blog/`, `changelog/`, `cmd/docs/`), not this repo, so `redirect-rules.md`
  only covers `/docs`.
