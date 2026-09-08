# ADR 001: Keep the production site static

- Status: Accepted
- Date: 2026-09-07

## Context

The portfolio serves curated media, bilingual copy, client-side filters, and a contact form. It does not require authenticated content, server rendering, or private data access.

## Decision

Keep the production runtime as standards-based HTML, CSS, and JavaScript on GitHub Pages. Use Node tooling only for development and automated quality checks.

## Consequences

- Fast, inexpensive, low-maintenance deployment with no application server.
- Minimal production dependency and security surface.
- Content and styles remain concentrated in one large HTML file; split modules only when the maintenance cost clearly outweighs the simplicity.
- Responsive image generation and stronger asset optimization will require a future build step or a media service.
