// @ts-check
const { test, expect } = require('./fixture');

const featuredSkin = (page) =>
    page.locator('#skins').getByRole('article').filter({ has: page.getByText('Current', { exact: true }) });
const card = (page, name) => page.locator('#skins-grid').getByRole('article').filter({ hasText: name });

test('tapping the featured banner opens the screen it shows at full size', async ({ page }) => {
    await page.goto('/');
    const featured = featuredSkin(page);
    await featured.getByRole('button', { name: 'Show Results UI' }).click();

    await featured.getByRole('img', { name: 'Bravo results' }).click();

    const lightbox = page.getByRole('dialog');
    await expect(lightbox).toBeVisible();
    await expect(lightbox).toContainText('Bravo Skin (Test edit) — Results UI');
    await expect(lightbox.getByRole('img', { name: 'Bravo results' })).toBeVisible();
});

test('a card opens its current screenshot full size and Escape returns focus', async ({ page }) => {
    await page.goto('/');
    const charlie = card(page, 'Charlie Skin');
    await charlie.getByRole('button', { name: 'Next screenshot of Charlie Skin' }).click();

    const zoom = charlie.getByRole('button', { name: 'View Charlie Skin screenshot full size' });
    await expect(zoom).toHaveCSS('opacity', '1');
    await zoom.click();

    const lightbox = page.getByRole('dialog');
    await expect(lightbox).toContainText('Charlie Skin — Song Select');
    await expect(lightbox.getByRole('img', { name: 'Charlie song select' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(lightbox).toBeHidden();
    await expect(zoom).toBeFocused();
});

test('tapping a card screenshot opens it full size', async ({ page }) => {
    await page.goto('/');
    const alpha = card(page, 'Alpha Skin');

    await alpha.getByRole('img', { name: 'Alpha gameplay' }).click();

    await expect(page.getByRole('dialog').getByRole('img', { name: 'Alpha gameplay' })).toBeVisible();
});
