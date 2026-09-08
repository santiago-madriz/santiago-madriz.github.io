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
  await expect(page.locator('#work').getByRole('heading', { level: 2 })).toHaveText('Work.');
  await expect(page.getByText('Selected work', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Selected films', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Choose a production.', { exact: true })).toHaveCount(0);
  await expect(page.locator('#about')).toBeVisible();
  await expect(page.locator('#services')).toHaveCount(0);
  await expect(page.getByText('Photography services in Costa Rica')).toHaveCount(0);
  await expect(page.locator('#contactForm')).toBeVisible();
  await expect(page.locator('.strip-track')).not.toContainText('35mm');
  await expect(page.locator('.strip-track')).not.toContainText('50mm');
  await expect(page.locator('.strip-track')).not.toContainText('16mm');
});

test('presents the MOVA film as a static preview that links to its watch page', async ({ page }) => {
  const card = page.locator('[data-mova-card]');
  await expect(card).toHaveAttribute('href', '/film/mova-made-to-move/');
  await expect(card.locator('img')).toHaveAttribute('src', 'assets/film/posters/mova-made-to-move.webp');
  await expect(card.locator('.film-preview-play')).toBeVisible();
  await expect(card.locator('video')).toHaveCount(0);
});

test('presents five selected film posters and plays every preview on demand in one modal', async ({ page }) => {
  const showcase = page.locator('.film-showcase');
  await expect(showcase.locator('.film-feature')).toHaveCount(0);
  await expect(showcase.locator('.film-preview')).toHaveCount(5);
  await expect(showcase.locator('video')).toHaveCount(0);
  expect(await showcase.locator('.film-preview img').evaluateAll((images) => images.map((image) => image.getAttribute('src')))).toEqual([
    'assets/film/posters/dias-de-lluvia.webp',
    'assets/film/posters/brand-content.webp',
    'assets/film/posters/mova-made-to-move.webp',
    'assets/film/posters/pop-run-aleste.webp',
    'assets/film/posters/baby-shower.webp',
  ]);
  expect(await showcase.locator('.film-preview').evaluateAll((previews) => previews.map((preview) => preview.getAttribute('data-film-orientation')))).toEqual([
    'landscape',
    'portrait',
    'portrait',
    'portrait',
    'landscape',
  ]);

  await showcase.locator('[data-mova-card]').click();
  const dialog = page.locator('#filmDialog');
  await expect(dialog).toHaveAttribute('open', '');
  await expect(dialog).toHaveAttribute('data-orientation', 'portrait');
  await expect(dialog.getByRole('heading')).toContainText('MOVA');
  await expect(dialog.locator('video')).toHaveAttribute('src', /reel-mova-made-to-move\.mp4\?v=3/);
  await expect(page.locator('video')).toHaveCount(1);
  await expect(dialog.locator('video')).toHaveCSS('object-fit', 'contain');
  await page.waitForTimeout(350);
  const portraitStage = await dialog.locator('.film-dialog-stage').boundingBox();
  expect(portraitStage).not.toBeNull();
  expect(portraitStage!.width / portraitStage!.height).toBeCloseTo(9 / 16, 2);
  await expect(page.locator('body')).toHaveClass(/film-modal-open/);
  await expect(page.locator('body')).toHaveCSS('position', 'fixed');

  await dialog.getByRole('button', { name: 'Close video' }).click();
  await expect(dialog).not.toHaveAttribute('open', '');
  await expect(dialog.locator('video')).not.toHaveAttribute('src');
  await expect(page.locator('body')).not.toHaveClass(/film-modal-open/);

  await showcase.locator('.film-preview').first().click();
  await expect(dialog).toHaveAttribute('data-orientation', 'landscape');
  await page.waitForTimeout(350);
  const landscapeStage = await dialog.locator('.film-dialog-stage').boundingBox();
  expect(landscapeStage).not.toBeNull();
  expect(landscapeStage!.width / landscapeStage!.height).toBeCloseTo(16 / 9, 2);
  await dialog.getByRole('button', { name: 'Close video' }).click();
});

test('filters film categories without affecting the photography collection', async ({ page }) => {
  await page.getByRole('button', { name: 'Events', exact: true }).first().click();
  await expect(page.locator('.film-preview:not(.is-hidden)')).toHaveCount(2);
  await expect(page.locator('.film-preview:not(.is-hidden)')).toContainText(['Pop & Run Beats at Aleste', 'Baby shower highlight']);
  await expect(page.locator('[data-mova-sports]')).toBeVisible();
  await expect(page.locator('.work-mode-nav a')).toHaveCount(2);
  await expect(page.locator('.work-mode-nav a').nth(0)).toHaveAttribute('href', '#film-work');
  await expect(page.locator('.work-mode-nav a').nth(1)).toHaveAttribute('href', '#photo-work');
});

test('keeps the film showcase and player inside an iPhone-sized viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await expect(page.locator('.film-showcase')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();

  await expect(page.locator('.portrait-viewport')).toHaveCSS('overflow-x', 'auto');
  await expect(page.locator('.portrait-viewport')).toHaveCSS('scroll-snap-type', 'x mandatory');
  await expect(page.locator('.portrait-track')).toHaveCSS('grid-auto-flow', 'column');

  await page.locator('.film-preview').first().click();
  const dialog = page.locator('#filmDialog');
  await expect(dialog).toHaveAttribute('open', '');
  await expect(dialog).toHaveAttribute('data-orientation', 'landscape');
  const box = await dialog.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  expect(box!.y + box!.height).toBeLessThanOrEqual(844);
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

test('presents the MOVA sportswear campaign as a five-image brand carousel', async ({ page }) => {
  const campaign = page.locator('[data-mova-sports]');
  await expect(campaign).toHaveAttribute('data-cat', 'brands');
  await expect(campaign.locator('.sports-slide')).toHaveCount(5);
  await expect(campaign.locator('.sports-slide--pink img')).toHaveCSS('object-position', '50% 32%');
  await expect(campaign.getByRole('heading')).toContainText('MOVA');
});

test('uses the Miami portrait as the portrait cover and fourth carousel image', async ({ page }) => {
  const portraitImages = page.locator('.portrait-track .portrait-slide img');
  await expect(portraitImages).toHaveCount(7);
  await expect(portraitImages.nth(3)).toHaveAttribute('src', 'assets/portraits/miami-colorful-lifeguard-portrait.webp');
  await page.goto('/services/professional-portraits-costa-rica/');
  await expect(page.locator('.hero-media')).toHaveAttribute('src', '/assets/portraits/miami-colorful-lifeguard-portrait.webp');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://santiagomadriz.com/assets/portraits/miami-colorful-lifeguard-portrait.webp');
});

test('keeps the requested off-road image sequence', async ({ page }) => {
  expect(await page.locator('#work [data-group="photo"]').evaluateAll((sections) => sections.slice(0, 4).map((section) => {
    if (section.classList.contains('moto-carousel')) return 'off-road';
    if (section.hasAttribute('data-mova-sports')) return 'mova';
    if (section.hasAttribute('data-samurai-series')) return 'samurai';
    if (section.classList.contains('portrait-carousel')) return 'portraits';
    return 'other';
  }))).toEqual(['off-road', 'mova', 'samurai', 'portraits']);

  const images = page.locator('.moto-track .moto-slide img');
  await expect(images).toHaveCount(7);
  await expect(images.nth(0)).toHaveAttribute('src', 'assets/motos/kinsee-media-moto-01.webp');
  await expect(images.nth(1)).toHaveAttribute('src', 'assets/motos/kinsee-media-moto-04.webp');
  await expect(images.nth(2)).toHaveAttribute('src', 'assets/motos/kinsee-media-moto-06.webp');
  await expect(images.nth(3)).toHaveAttribute('src', 'assets/motos/kinsee-media-moto-03.webp');
});

test('presents the Suzuki Samurai series as a five-image automotive carousel', async ({ page }) => {
  const series = page.locator('[data-samurai-series]');
  await expect(series).toHaveAttribute('data-cat', 'automotive brands');
  await expect(series.getByRole('heading')).toContainText('Suzuki Samurai');

  const images = series.locator('.samurai-slide img');
  await expect(images).toHaveCount(5);
  await expect(images.nth(0)).toHaveAttribute('src', 'assets/automotive/samurai/suzuki-samurai-trail-front-01.webp');
  await expect(images.nth(1)).toHaveAttribute('src', 'assets/automotive/samurai/suzuki-samurai-forest-distance-02.webp');
  await expect(images.nth(2)).toHaveAttribute('src', 'assets/automotive/samurai/suzuki-samurai-rock-crawl-03.webp');
  await expect(images.nth(3)).toHaveAttribute('src', 'assets/automotive/samurai/suzuki-samurai-low-angle-04.webp');
  await expect(images.nth(4)).toHaveAttribute('src', 'assets/automotive/samurai/suzuki-samurai-trail-rear-05.webp');

  await page.getByRole('button', { name: 'Automotive' }).click();
  await expect(series).toBeVisible();
  await expect(page.locator('#work [data-cat]:not(.is-hidden)')).toHaveCount(1);
});

test('filters work and translates the interface', async ({ page }) => {
  await page.getByRole('button', { name: 'Portraits' }).click();
  await expect(page.getByRole('button', { name: 'Portraits' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#work [data-group="photo"][data-cat]:not(.is-hidden)')).toHaveCount(1);
  await expect(page.locator('.film-showcase')).toBeVisible();

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

test('keeps the social content gallery focused on MOVA work', async ({ page }) => {
  await page.goto('/services/social-media-content-costa-rica/');
  const gallery = page.locator('.gallery');
  await expect(gallery.locator('.shot')).toHaveCount(2);
  await expect(gallery.locator('img[src="/assets/brands/techy-cr-product.jpg"]')).toHaveCount(0);
});

for (const service of [
  { slug: 'product-photography-costa-rica', heading: 'Fotografía de producto', galleryCount: 3 },
  { slug: 'event-photographer-costa-rica', heading: 'Fotógrafo para eventos', galleryCount: 3 },
  { slug: 'professional-portraits-costa-rica', heading: 'Retratos profesionales', galleryCount: 3 },
  { slug: 'brand-video-production-costa-rica', heading: 'Producción audiovisual para marcas', galleryCount: 3 },
  { slug: 'social-media-content-costa-rica', heading: 'Contenido para redes sociales', galleryCount: 2 },
]) {
  test(`publishes the ${service.slug} service page with useful SEO content`, async ({ page }) => {
    await page.goto(`/services/${service.slug}/`);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(service.heading);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://santiagomadriz.com/services/${service.slug}/`);
    await expect(page.locator('.gallery .shot')).toHaveCount(service.galleryCount);
    await expect(page.locator('.steps .step')).toHaveCount(3);
    await expect(page.locator('.faq-list details')).toHaveCount(3);
    const graph = await page.locator('script[type="application/ld+json"]').evaluate((element) => JSON.parse(element.textContent || '{}')) as { '@graph': Array<Record<string, unknown>> };
    expect(graph['@graph'].some((entry) => entry['@type'] === 'Service')).toBeTruthy();
    expect(graph['@graph'].some((entry) => entry['@type'] === 'FAQPage')).toBeTruthy();
  });
}

test('keeps the selected language across service and film pages', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/services/product-photography-costa-rica/');
  await page.getByRole('button', { name: 'View in English' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Product photography in Costa Rica.');
  await expect(page).toHaveTitle('Product Photography in Costa Rica | Santiago Madriz');

  await page.goto('/film/mova-made-to-move/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('button', { name: 'Ver en español' }).click();
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('El movimiento como lenguaje visual.');

  await page.goto('/services/professional-portraits-costa-rica/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Retratos profesionales en Costa Rica.');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

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
