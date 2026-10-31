// @ts-check
const { test, expect } = require('./fixture');

test('link share preview cards use the live osu! profile avatar in a compact square card', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', 'Znap- osu! Setup Configuration');
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://a.ppy.sh/22919575');
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary');
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', 'https://a.ppy.sh/22919575');
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#131313');
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', 'favicon.svg');
});
