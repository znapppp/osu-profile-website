// @ts-check
const { test, expect } = require('./fixture');

const overlay = (page, name) =>
    page.locator('#overlays').getByRole('article').filter({ has: page.getByRole('heading', { name }) });

test('overlay facts and the fork credit come from the config', async ({ page }) => {
    await page.goto('/');
    const item = overlay(page, 'Fixture Overlay');

    for (const [label, value] of [
        ['Compatible with', 'Fixture Engine'],
        ['Target screen', '800x600 on 1080p'],
        ['Key features', 'Fixture Feature'],
    ]) {
        await expect(item.getByText(label, { exact: true })).toBeVisible();
        await expect(item.getByText(value, { exact: true })).toBeVisible();
    }
    await expect(item.getByRole('link', { name: 'Upstream/Pack' })).toHaveAttribute('href', 'https://github.example/upstream/pack');
});

test.describe('config text with markup characters', () => {
    test.use({
        configPatch: `
            SITE_CONFIG.overlays.items[0].name = 'Fixture <b>Bold</b> "Overlay"';
            SITE_CONFIG.overlays.items[0].description = 'Uses <i>tags</i> & "quotes"';
        `,
    });

    test('overlay text is shown exactly as written', async ({ page }) => {
        await page.goto('/');
        const section = page.locator('#overlays');
        await expect(section.getByRole('heading', { name: 'Fixture <b>Bold</b> "Overlay"', exact: true })).toBeVisible();
        await expect(section.getByText('Uses <i>tags</i> & "quotes"', { exact: true })).toBeVisible();
    });
});
