# FlightRefund

A landing page with a live EU 261/2004 compensation calculator. Enter a departure airport, arrival airport, and delay duration — see the EUR amount you may be entitled to.

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS
- `next-intl` for Czech / English
- Static export (`output: 'export'`) — deployable to any static host

## Local development

```bash
npm install
npm run dev
# open http://localhost:3000 (redirects to /cs or /en)
```

## Build

```bash
npm run build
# static site in ./out
```

## Deploying to GitHub Pages (free)

A workflow is included at `.github/workflows/deploy.yml`. To enable:

1. Push this branch to GitHub.
2. Go to the repo's **Settings → Pages** and set **Source** to **GitHub Actions**.
3. The next push to `claude/flights-claims-website-2LZIs` or `main` deploys automatically. The site appears at `https://<user>.github.io/claim-cermatej/`.

`next.config.ts` sets `basePath` and `assetPrefix` to `/claim-cermatej` when `GITHUB_PAGES=true`. If you fork or rename the repo, update the `repo` constant in `next.config.ts`.

## Other free hosts

- **Vercel**: import the repo; build command `npm run build`, output `out`. Remove `basePath`/`assetPrefix` for custom domains.
- **Cloudflare Pages** / **Netlify**: same — build command `npm run build`, publish directory `out`.

## Structure

```
app/
  layout.tsx              # root <html>
  page.tsx                # redirects / to /cs or /en
  [locale]/layout.tsx     # next-intl provider
  [locale]/page.tsx       # landing page
components/               # Header, Hero, ClaimForm, etc.
lib/
  airports.json           # bundled IATA airports (~95)
  airports.ts
  distance.ts             # haversine
  eu261.ts                # compensation rules
i18n/messages/{cs,en}.json
```

## Disclaimer

The calculator is a non-binding estimate based on EU Regulation 261/2004. Actual eligibility depends on the specific circumstances of the flight (extraordinary circumstances, notice period, rerouting, etc.).
