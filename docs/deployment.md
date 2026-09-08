# Deployment

The production branch is `main`. GitHub Pages serves the repository root without a static-site generator; `.nojekyll` prevents Jekyll processing and `CNAME` declares `santiagomadriz.com`.

## Release flow

1. Open a pull request.
2. Pass the automated smoke suite.
3. Review the visual result at desktop and mobile widths.
4. Merge to `main`.
5. Confirm the production page, media, language switch, and contact path.

## Rollback

Revert the faulty commit through Git and push the revert to `main`. Do not rewrite published branch history.

DNS, Pages configuration, and TLS are managed outside this repository and must be checked in the hosting account if the custom domain stops resolving.
