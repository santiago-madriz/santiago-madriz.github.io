# Quality approach

## Co-located release signal

The site repository owns a small deterministic suite that runs against a local server. It checks the main visitor experience, semantic structure, work filtering, localization, and serious automated accessibility findings. It does not call the external contact endpoint.

## External system checks

The separate Playwright Quality Engineering repository treats the deployed site as a black box and adds browser compatibility, HTTP and asset contracts, performance guardrails, and failure-triage documentation. Keeping the layers separate makes ownership and failure classification clearer.

## Manual review

Before a meaningful visual release:

- Navigate by keyboard at desktop and mobile widths.
- Check focus visibility and filter state.
- Review English and Spanish copy.
- Confirm reduced-motion behavior.
- Inspect image crops, video playback, and layout shift.
- Send one deliberate contact-form test outside automation when the endpoint changes.

Automated accessibility checks supplement this review and do not represent certification.

