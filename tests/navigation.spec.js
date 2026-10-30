// @ts-check
const { test, expect } = require('./fixture');

test('each navigation label matches the heading of the section it opens', async ({ page, isMobile }) => {
    await page.goto('/');
    if (isMobile) await page.getByRole('button', { name: /menu/i }).click();

    const links = page.locator(isMobile ? '#mobile-menu a[data-path]' : 'header nav:not(#mobile-menu) a[data-path]');
    const count = await links.count();
    let checked = 0;
    for (let i = 0; i < count; i++) {
        const link = links.nth(i);
        const target = page.locator(`#${await link.getAttribute('data-path')}`);
        const heading = target.getByRole('heading', { level: 2 });
        if (await heading.count() === 0) continue; // Home has no section heading
        const label = (await link.innerText()).replace(/chevron_right/, '').trim();
        await expect(heading).toHaveText(label);
        checked++;
    }
    expect(checked).toBe(3);
});

test('sections are numbered in page order', async ({ page }) => {
    await page.goto('/');
    for (const [id, number] of [['hardware', '01'], ['skins', '02'], ['overlays', '03']]) {
        await expect(page.locator(`#${id}`).getByText(number, { exact: true })).toBeAttached();
    }
});
