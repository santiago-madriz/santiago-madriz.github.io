# Security

## Data handled

The site stores a language preference in the visitor's browser. Contact submissions include the entered name, email, project details, message, and source URL and are sent to FormSubmit.

## Controls

- Content Security Policy restricts scripts, media, connections, frames, and form destinations.
- External links use `rel="noopener"`.
- The contact form uses native validation, a honeypot, and a known HTTPS destination.
- The repository requires no environment secrets.
- The workflow receives read-only repository contents permission.

## Review procedure

Before publishing history or changing repository visibility, scan the full Git history for credentials, private URLs, customer data, certificates, and employer or Techy material. Rotate any exposed credential before attempting history cleanup.

Vulnerability reports can follow the contact instructions in `.well-known/security.txt`.
