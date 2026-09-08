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
  await expect(page.locator('#services')).toHaveCount(0);
  await expect(page.getByText('Photography services in Costa Rica')).toHaveCount(0);
  await expect(page.locator('#contactForm')).toBeVisible();
});

test('presents the MOVA film as a static preview that links to its watch page', async ({ page }) => {
  const card = page.locator('[data-mova-card]');
  await expect(card).toHaveAttribute('href', '/film/mova-made-to-move/');
  await expect(card.locator('img')).toHaveAttribute('src', 'assets/instagram/mova-made-to-move-poster.jpg');
  await expect(card.locator('.play-badge')).toBeVisible();
  await expect(card.locator('video')).toHaveCount(0);
});

for (const film of [
  ['brand-content-production', 'Brand content'],
  ['dias-de-lluvia-music-video', 'Días de Lluvia'],
  ['pop-run-beats-aleste', 'Pop & Run Beats'],
  ['mova-made-to-move', 'Made to Move'],
  ['baby-shower-highlight', 'Baby shower'],
]) {
  test(`publishes the ${film[0]} video on a dedicated watch page`, async ({ page }) => {
    await page.goto(`/film/${film[0]}/`);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(film[1]);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://santiagomadriz.com/film/${film[0]}/`);
    await expect(page.locator('.player video')).toHaveAttribute('controls', '');
    await expect(page.locator('.player video')).not.toHaveAttribute('autoplay', '');
    const video = await page.locator('script[type="application/ld+json"]').evaluate((element) => JSON.parse(element.textContent || '{}')) as Record<string, unknown>;
    expect(video['@type']).toBe('VideoObject');
    expect(video.thumbnailUrl).toBeTruthy();
    expect(video.contentUrl).toBeTruthy();
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    const blocking = results.violations.filter(({ impact }) => impact === 'critical' || impact === 'serious');
    expect(blocking).toEqual([]);
  });
}

test('presents the MOVA sportswear campaign as a six-image brand carousel', async ({ page }) => {
  const campaign = page.locator('[data-mova-sports]');
  await expect(campaign).toHaveAttribute('data-cat', 'brands');
  await expect(campaign.locator('.sports-slide')).toHaveCount(6);
  await expect(campaign.locator('.sports-slide--pink img')).toHaveCSS('object-position', '50% 32%');
  await expect(campaign.getByRole('heading')).toContainText('MOVA');
});

test('uses the Miami portrait as the portrait cover and first carousel image', async ({ page }) => {
  const portraitImages = page.locator('.portrait-track .portrait-slide img');
  await expect(portraitImages).toHaveCount(7);
  await expect(portraitImages.first()).toHaveAttribute('src', 'assets/portraits/miami-colorful-lifeguard-portrait.webp');
  await page.goto('/services/professional-portraits-costa-rica/');
  await expect(page.locator('.hero-media')).toHaveAttribute('src', '/assets/portraits/miami-colorful-lifeguard-portrait.webp');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://santiagomadriz.com/assets/portraits/miami-colorful-lifeguard-portrait.webp');
});

test('keeps the requested off-road image sequence', async ({ page }) => {
  const images = page.locator('.moto-track .moto-slide img');
  await expect(images).toHaveCount(8);
  await expect(images.nth(0)).toHaveAttribute('src', 'assets/motos/kinsee-media-moto-01.webp');
  await expect(images.nth(1)).toHaveAttribute('src', 'assets/motos/kinsee-media-moto-04.webp');
  await expect(images.nth(2)).toHaveAttribute('src', 'assets/motos/kinsee-media-moto-06.webp');
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

test('links to focused commercial service pages without adding a homepage service block', async ({ page }) => {
  const links = page.locator('.footer-service-links a');
  await expect(links).toHaveCount(5);
  await expect(links.nth(0)).toHaveAttribute('href', '/services/product-photography-costa-rica/');
  await expect(page.locator('a[href="#services"]')).toHaveCount(0);
});

for (const service of [
  ['product-photography-costa-rica', 'Fotografía de producto'],
  ['event-photographer-costa-rica', 'Fotógrafo para eventos'],
  ['professional-portraits-costa-rica', 'Retratos profesionales'],
  ['brand-video-production-costa-rica', 'Producción audiovisual para marcas'],
  ['social-media-content-costa-rica', 'Contenido para redes sociales'],
]) {
  test(`publishes the ${service[0]} service page with useful SEO content`, async ({ page }) => {
    await page.goto(`/services/${service[0]}/`);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(service[1]);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://santiagomadriz.com/services/${service[0]}/`);
    await expect(page.locator('.gallery .shot')).toHaveCount(3);
    await expect(page.locator('.steps .step')).toHaveCount(3);
    await expect(page.locator('.faq-list details')).toHaveCount(3);
    const graph = await page.locator('script[type="application/ld+json"]').evaluate((element) => JSON.parse(element.textContent || '{}')) as { '@graph': Array<Record<string, unknown>> };
    expect(graph['@graph'].some((entry) => entry['@type'] === 'Service')).toBeTruthy();
    expect(graph['@graph'].some((entry) => entry['@type'] === 'FAQPage')).toBeTruthy();
  });
}

test('offers a direct WhatsApp quote action', async ({ page }) => {
  const whatsapp = page.locator('.contact-whatsapp');
  await expect(whatsapp).toHaveAttribute('href', 'https://wa.me/50684574355');
  await expect(whatsapp).toHaveAttribute('target', '_blank');
  await expect(whatsapp).toBeVisible();
  await expect(page.locator('#copyEmailButton')).toHaveCount(0);
  const emailFallback = page.locator('.contact-email-fallback a');
  await expect(emailFallback).toHaveAttribute('href', 'mailto:santiagomadrizc@gmail.com');
  await expect(emailFallback).toBeVisible();
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
  expect(sitemapBody).toContain('/services/product-photography-costa-rica/');
  expect(sitemapBody).toContain('/services/social-media-content-costa-rica/');
  expect(sitemapBody).toContain('/film/mova-made-to-move/');
  expect((sitemapBody.match(/<video:video>/g) || []).length).toBe(5);
});

test('has no automatically detectable serious accessibility violations', async ({ page }) => {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  const blocking = results.violations.filter(({ impact }) => impact === 'critical' || impact === 'serious');
  expect(blocking).toEqual([]);
});
