import { AxeBuilder } from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('renders the primary portfolio landmarks', async ({ page }) => {
  await expect(page).toHaveTitle(/Santiago Madriz.*Costa Rica/i);
  await expect(page.locator('main')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Photo and Film');
  await expect(page.locator('#work')).toBeVisible();
  await expect(page.locator('#about')).toBeVisible();
  await expect(page.locator('#contactForm')).toBeVisible();
});

test('includes the MOVA brand reel and its local preview', async ({ page }) => {
  const card = page.locator('[data-mova-card]');
  await expect(card).toHaveAttribute('href', 'https://www.instagram.com/p/Dcw8GgWpXtE/');
  await expect(card.locator('source')).toHaveAttribute('src', 'assets/instagram/reel-mova-made-to-move.mp4?v=2');
  expect(await card.locator('video').evaluate((element) => element.canPlayType('video/mp4; codecs="avc1.4D401F"'))).not.toBe('');
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
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Foto y Producción');
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

test('has no automatically detectable serious accessibility violations', async ({ page }) => {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  const blocking = results.violations.filter(({ impact }) => impact === 'critical' || impact === 'serious');
  expect(blocking).toEqual([]);
});
