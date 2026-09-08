# Testing Strategy

## Risks covered

- A visitor cannot understand or navigate the portfolio.
- Filters hide all work or expose the wrong category.
- Localization changes visible copy but leaves stale accessible labels.
- Contact controls lose required semantics.
- A local media rename creates a broken portfolio tile.
- Mobile layout loses the same essential content as desktop.

## Automated checks

Playwright runs the same smoke behavior in desktop Chromium and an iPhone-sized viewport. CI uses Chromium as a fast release gate; the full local command covers both configured projects. Traces and screenshots are captured when a retry or failure makes them useful.

## Manual release checks

- Review the hero, work grids, horizontal galleries, about section, and contact form at desktop and mobile widths.
- Test keyboard navigation from the skip link through the form.
- Confirm the quote form exposes its required qualification fields and redirects successful submissions to the no-index conversion page.
- Confirm reduced-motion behavior in browser accessibility settings.
- Submit one real contact message after provider or domain changes.
- Check external Instagram and YouTube destinations.

## Out of scope

Automated tests do not send production contact messages. External platforms are not asserted in CI because their availability and markup are outside this repository's control.
