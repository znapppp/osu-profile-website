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

for (const [label, id] of [['Skins', 'skins'], ['Overlay', 'overlays']]) {
    test(`the ${label} link is marked and underlined while its section is in view`, async ({ page, isMobile }) => {
        test.skip(isMobile, 'desktop header nav');
        await page.goto('/');
        const nav = page.getByRole('navigation', { name: 'Main Navigation' });
        await expect(nav.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', /.+/);
        await page.locator(`#${id}`).evaluate((el) => window.scrollTo(0, el.offsetTop - 60));
        const link = nav.getByRole('link', { name: label });
        await expect(link).toHaveAttribute('aria-current', /.+/);
        await expect(nav.getByRole('link', { name: 'Gear' })).not.toHaveAttribute('aria-current', /.+/);
        await expect(nav.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current', /.+/);
        await expect.poll(() => link.evaluate((el) => {
            const after = getComputedStyle(el, '::after');
            return parseFloat(after.height) >= 2 && new DOMMatrix(after.transform).a > 0.99;
        })).toBe(true);
    });
}

test('the mobile menu underlines the section in view, marked straight away from a #section link', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile menu');
    await page.goto('/#skins');
    await page.getByRole('button', { name: /menu/i }).click();
    const link = page.getByRole('navigation', { name: 'Mobile Navigation' }).getByRole('link', { name: 'Skins', exact: true });
    await expect(link).toHaveAttribute('aria-current', /.+/);
    await expect.poll(() => link.getByText('Skins', { exact: true }).evaluate((el) => {
        const style = getComputedStyle(el);
        return style.textDecorationLine === 'underline' && parseFloat(style.textDecorationThickness) >= 2;
    })).toBe(true);
});
