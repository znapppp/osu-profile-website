// @ts-check
const { test, expect } = require('./fixture');

const featuredSkin = (page) =>
    page.locator('#skins').getByRole('article').filter({ has: page.getByText('Current', { exact: true }) });
const card = (page, name) => page.locator('#skins-grid').getByRole('article').filter({ hasText: name });

test.describe('skin controls with the keyboard', () => {
    test.skip(({ isMobile }) => isMobile, 'keyboard interaction is checked on desktop');

    test('a card arrow changes the screenshot with Enter', async ({ page }) => {
        await page.goto('/');
        const alpha = card(page, 'Alpha Skin');
        await alpha.getByRole('button', { name: 'Next screenshot of Alpha Skin' }).focus();

        await page.keyboard.press('Enter');

        await expect(alpha.getByRole('img', { name: 'Alpha song select' })).toBeInViewport();
        await expect(alpha.getByRole('img', { name: 'Alpha gameplay' })).toHaveCount(0);
    });

    test('a card indicator dot shows its screenshot with Space', async ({ page }) => {
        await page.goto('/');
        const alpha = card(page, 'Alpha Skin');
        await alpha.getByRole('button', { name: 'Show screenshot 3 of 3 of Alpha Skin' }).focus();

        await page.keyboard.press('Space');

        await expect(alpha.getByRole('img', { name: 'Alpha results' })).toBeInViewport();
    });

    test('a featured thumbnail changes the banner with Enter', async ({ page }) => {
        await page.goto('/');
        const featured = featuredSkin(page);
        await expect(featured.getByRole('img', { name: 'Bravo gameplay' })).toBeVisible();
        await featured.getByRole('button', { name: 'Show Song Select screenshot of Bravo Skin (Test edit)' }).focus();

        await page.keyboard.press('Enter');

        await expect(featured.getByRole('img', { name: 'Bravo song select' })).toBeVisible();
    });

    test('the featured zoom button opens the lightbox with Enter and Escape closes it', async ({ page }) => {
        await page.goto('/');
        const zoom = featuredSkin(page).getByRole('button', { name: 'View Bravo Skin (Test edit) screenshot full size' });
        await zoom.focus();

        await page.keyboard.press('Enter');

        const lightbox = page.getByRole('dialog');
        await expect(lightbox).toBeVisible();
        await expect(lightbox).toContainText('Bravo Skin (Test edit)');

        await page.keyboard.press('Escape');
        await expect(lightbox).toBeHidden();
    });

    test('Tab reaches the controls of a skin card', async ({ page }) => {
        await page.goto('/');
        const alpha = card(page, 'Alpha Skin');
        const next = alpha.getByRole('button', { name: 'Next screenshot of Alpha Skin' });
        await alpha.getByRole('button', { name: 'Previous screenshot of Alpha Skin' }).focus();

        for (let i = 0; i < 4; i++) await page.keyboard.press('Tab');

        await expect(next).toBeFocused();
    });
});
