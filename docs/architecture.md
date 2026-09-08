# Architecture

## Context

This is a visual portfolio whose primary work is delivering media, simple interactions, and a contact path. The architecture favors predictable static delivery over application complexity.

```text
Visitor
  |
  v
GitHub Pages ──> index.html
                    ├── local photo and poster assets
                    ├── viewport-aware preview videos
                    ├── bilingual content dictionary
                    ├── filters and horizontal galleries
                    └── quote form ──> FormSubmit ──> /quote-requested/
```

## Runtime behavior

The browser selects a saved or preferred language, updates visible copy and accessible labels, and stores only that preference. Media previews play only when sufficiently visible and pause when the page is hidden. If asynchronous contact submission fails, the form falls back to a standard browser submission.

## Boundaries

- GitHub Pages owns static delivery and TLS.
- FormSubmit owns contact-message delivery.
- Instagram and YouTube links open externally and do not run embedded frames.
- No private service, database, authentication, or client-side secret exists.

## Performance model

The hero image is preloaded and high priority. Gallery images load lazily. Videos use posters and preview renditions, and off-screen playback is paused. The remaining major transfer risk is the user-initiated full event video.
