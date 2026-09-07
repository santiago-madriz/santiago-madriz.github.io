# Santiago Madriz - Photo and Film

[![Site quality](https://github.com/santiago-madriz/santiago-madriz.github.io/actions/workflows/quality.yml/badge.svg)](https://github.com/santiago-madriz/santiago-madriz.github.io/actions/workflows/quality.yml)

Source for [santiagomadriz.com](https://santiagomadriz.com), my bilingual photography and audiovisual portfolio based in Costa Rica. The same GitHub Pages deployment publishes my [engineering portfolio](https://santiagomadriz.com/dev/) under `/dev/`.

## Product highlights

- Responsive photo and video portfolio
- English and Spanish interface with local language preference
- Keyboard-accessible work filters and media carousels
- Reduced-motion behavior
- Secure contact flow with client-side validation and a honeypot field
- Content Security Policy and restrictive referrer policy
- Engineering portfolio deployment at `/dev/`

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

See [Quality approach](docs/QUALITY.md) for scope and limitations.

## Security and privacy

- There are no server-side secrets in this static repository.
- The contact endpoint is never exercised by automated tests.
- Analytics remains disabled unless configured explicitly.
- Public contact details in the site are intentional; do not add private client information or image metadata.

## Content rights

Site code may be studied and adapted with attribution. Photographs, video, branding, and other media remain copyright Santiago Madriz and their respective collaborators unless stated otherwise. See [CONTENT_LICENSE.md](CONTENT_LICENSE.md).
