// @ts-check
const { test, expect } = require('./fixture');

test('each navigation label matches the heading of the section it opens', async ({ page, isMobile }) => {
    await page.goto('/');
    const menuButton = page.getByRole('button', { name: /menu/i });
    const navigation = page.getByRole('navigation', { name: isMobile ? 'Mobile Navigation' : 'Main Navigation' });

    for (const label of ['Gear', 'Skins', 'Overlay']) {
        if (isMobile && (await menuButton.getAttribute('aria-expanded')) !== 'true') await menuButton.click();
        await navigation.getByRole('link', { name: label }).click();
        await expect(page.getByRole('heading', { level: 2, name: label, exact: true })).toBeInViewport();
    }
});

test('sections are numbered in page order', async ({ page }) => {
    await page.goto('/');
    const tops = [];
    for (const number of ['01', '02', '03']) {
        const label = page.getByText(number, { exact: true });
        await expect(label).toHaveCount(1);
        tops.push(await label.evaluate((el) => el.getBoundingClientRect().top + window.scrollY));
    }
    expect(tops).toEqual([...tops].sort((a, b) => a - b));
});
