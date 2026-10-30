// @ts-check
const { test, expect } = require('./fixture');

test('floating crosses never sit over the skins content', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('heading', { name: 'Skins', level: 2 }).scrollIntoViewIfNeeded();
    await page.evaluate(() => document.querySelector('#skins').scrollIntoView());

    const archive = page.getByRole('link', { name: /older skins archive/i });
    const featuredName = page
        .locator('#skins')
        .getByRole('article')
        .filter({ has: page.getByText('Current', { exact: true }) })
        .getByRole('heading');
    await expect(archive).toBeVisible();
    await expect(featuredName).toBeVisible();

    for (const target of [archive, featuredName]) {
        const onTop = await target.evaluate((el) => {
            const r = el.getBoundingClientRect();
            const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
            return !!hit && el.contains(hit);
        });
        expect(onTop).toBe(true);
    }
});
