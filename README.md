# Santiago Madriz - Photo and Film

[![Site quality](https://github.com/santiago-madriz/santiago-madriz.github.io/actions/workflows/quality.yml/badge.svg)](https://github.com/santiago-madriz/santiago-madriz.github.io/actions/workflows/quality.yml)

Source for [santiagomadriz.com](https://santiagomadriz.com), my bilingual photography and audiovisual portfolio based in Costa Rica. The same GitHub Pages deployment publishes my [engineering portfolio](https://santiagomadriz.com/dev/) under `/dev/`.

## Product highlights

- Editorial film showcase with one featured production, five static posters, category filters, and a single on-demand modal player
- Five dedicated film watch pages with accessible controls, unique metadata, stable posters, and `VideoObject` structured data
- MOVA “Made to Move” brand film with an iPhone-compatible H.264 source and original-post link
- Six-image MOVA sportswear campaign carousel with responsive, optimized WebP photography and art-directed portrait framing
- Five-image Suzuki Samurai automotive series photographed on Costa Rican forest trails, with its own filter and optimized WebP delivery
- Portrait collection with an optimized Miami Beach environmental portrait used across the carousel and portrait-service cover
- English and Spanish interface with local language preference
- Subtle bilingual footer path to the companion engineering portfolio
- Keyboard-accessible work filters and media carousels
- Reduced-motion behavior
- Bilingual quote-request flow with qualified project fields, secure delivery, a dedicated no-index Google Ads conversion page, and direct WhatsApp quotes
- Content Security Policy and restrictive referrer policy
- Engineering portfolio deployment at `/dev/`
- Five image-led service landing pages for product photography, events, portraits, brand video, and social content
- Local-service SEO for Costa Rica with unique titles, Service, FAQ, ProfessionalService, and VideoObject structured data, crawlable internal links, descriptive media, canonical URLs, and image/video sitemap coverage

## Local development

```bash
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173`.

## Quality checks

```bash
npm ci
npx playwright install chromium
npm test
```

The co-located checks protect semantic landmarks, filtering, localization, and serious accessibility regressions. A separate [Playwright Quality Engineering](https://github.com/santiago-madriz/playwright-quality-engineering) project adds cross-browser, HTTP-contract, media, and performance coverage as a portfolio case study.

The homepage intentionally remains portfolio-led. Search-oriented service pages live under `/services/`, stay visually concise, and use real work rather than hidden keyword text.

See [Quality approach](docs/QUALITY.md) for scope and limitations.

## Engineering portfolio deployment

The `/dev/` directory is a generated production build from the separate [engineering-portfolio](https://github.com/santiago-madriz/engineering-portfolio) repository. Update experience, credentials, or project previews in that source repository and rebuild before publishing; do not edit generated files here directly.

## Security and privacy

- There are no server-side secrets in this static repository.
- The contact endpoint is never exercised by automated tests.
- Analytics remains disabled unless configured explicitly.
- Public contact details in the site are intentional; do not add private client information or image metadata.

## Content rights

Site code may be studied and adapted with attribution. Photographs, video, branding, and other media remain copyright Santiago Madriz and their respective collaborators unless stated otherwise. See [CONTENT_LICENSE.md](CONTENT_LICENSE.md).
