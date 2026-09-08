import { AxeBuilder } from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('renders the primary portfolio landmarks', async ({ page }) => {
  await expect(page).toHaveTitle(/Costa Rica Photographer.*Santiago Madriz/i);
  await expect(page.locator('main')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Photography and Film Production');
  await expect(page.locator('#work')).toBeVisible();
  await expect(page.locator('#about')).toBeVisible();
  await expect(page.locator('#services')).toBeVisible();
  await expect(page.locator('#contactForm')).toBeVisible();
});

test('includes the MOVA brand reel and its local preview', async ({ page }) => {
  const card = page.locator('[data-mova-card]');
  await expect(card).toHaveAttribute('href', 'https://www.instagram.com/p/Dcw8GgWpXtE/');
  await expect(card.locator('source')).toHaveAttribute('src', 'assets/instagram/reel-mova-made-to-move.mp4?v=2');
  expect(await card.locator('video').evaluate((element) => (element as HTMLVideoElement).canPlayType('video/mp4; codecs="avc1.4D401F"'))).not.toBe('');
});

test('presents the MOVA sportswear campaign as a six-image brand carousel', async ({ page }) => {
  const campaign = page.locator('[data-mova-sports]');
  await expect(campaign).toHaveAttribute('data-cat', 'brands');
  await expect(campaign.locator('.sports-slide')).toHaveCount(6);
  await expect(campaign.locator('.sports-slide--pink img')).toHaveCSS('object-position', '50% 32%');
  await expect(campaign.getByRole('heading')).toContainText('MOVA');
});

test('filters work and translates the interface', async ({ page }) => {
  await page.getByRole('button', { name: 'Portraits' }).click();
  await expect(page.getByRole('button', { name: 'Portraits' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#work [data-cat]:not(.is-hidden)')).toHaveCount(1);

  await page.getByRole('button', { name: 'Ver en español' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Fotografía y Producción Audiovisual');
});

test('links subtly to the development portfolio from the footer', async ({ page }) => {
  const developmentLink = page.locator('.footer-dev-note a');
  await expect(developmentLink).toHaveAttribute('href', '/dev/');
  await expect(developmentLink).toBeVisible();
});

test('offers a direct WhatsApp quote action', async ({ page }) => {
  const whatsapp = page.locator('.contact-whatsapp');
  await expect(whatsapp).toHaveAttribute('href', 'https://wa.me/50684574355');
  await expect(whatsapp).toHaveAttribute('target', '_blank');
  await expect(whatsapp).toBeVisible();
});

test('collects qualified quote details and defines a dedicated conversion URL', async ({ page }) => {
  const form = page.locator('#contactForm');
  await expect(form.locator('[name="_next"]')).toHaveValue('https://santiagomadriz.com/quote-requested/');
  await expect(form.locator('[name="name"]')).toHaveAttribute('required', '');
  await expect(form.locator('[name="email"]')).toHaveAttribute('type', 'email');
  await expect(form.locator('[name="phone"]')).toHaveAttribute('required', '');
  await expect(form.locator('[name="service"]')).toHaveAttribute('required', '');
  await expect(form.locator('[name="category"]')).toHaveAttribute('required', '');
});

test('redirects a successful quote request to the conversion page', async ({ page }) => {
  await page.route('https://formsubmit.co/ajax/**', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
  });
  const form = page.locator('#contactForm');
  await form.locator('[name="name"]').fill('Test Lead');
  await form.locator('[name="email"]').fill('lead@example.com');
  await form.locator('[name="phone"]').fill('+506 8000 0000');
  await form.locator('[name="service"]').selectOption('Photography');
  await form.locator('[name="category"]').selectOption('Brand / Product');
  await form.locator('[name="message"]').fill('Commercial product session.');
  await form.getByRole('button', { name: /Request a quote|Solicitar cotización/ }).click();
  await expect(page).toHaveURL(/\/quote-requested\/$/);
});

test('keeps the quote confirmation page out of search results', async ({ page }) => {
  await page.goto('/quote-requested/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: /portfolio|portafolio/i })).toHaveAttribute('href', '/');
});

test('exposes local-search metadata and structured services', async ({ page, request }) => {
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /max-image-preview:large/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://santiagomadriz.com/');
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/favicon.svg');
  const graph = await page.locator('script[type="application/ld+json"]').evaluate((element) => JSON.parse(element.textContent || '{}')) as { '@graph': Array<Record<string, unknown>> };
  expect(graph['@graph'].some((entry) => entry['@type'] === 'ProfessionalService' && entry.telephone === '+50684574355')).toBeTruthy();
  const sitemap = await request.get('/sitemap.xml');
  const sitemapBody = await sitemap.text();
  expect(sitemapBody).toContain('xmlns:image=');
  expect(sitemapBody).toContain('xmlns:video=');
});

test('has no automatically detectable serious accessibility violations', async ({ page }) => {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  const blocking = results.violations.filter(({ impact }) => impact === 'critical' || impact === 'serious');
  expect(blocking).toEqual([]);
});
