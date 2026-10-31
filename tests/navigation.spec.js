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

test('on tall QHD 2560x1440 screens, scrolling to Overlay marks Overlay instead of leaving Skins active', async ({ page, isMobile }) => {
    test.skip(isMobile, 'desktop QHD viewport');
    await page.setViewportSize({ width: 2560, height: 1440 });
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main Navigation' });

    await nav.getByRole('link', { name: 'Overlay' }).click();

    await expect(nav.getByRole('link', { name: 'Overlay' })).toHaveAttribute('aria-current', 'location');
    await expect(nav.getByRole('link', { name: 'Skins' })).not.toHaveAttribute('aria-current', /.+/);
});

test('mobile hero quick-jump reaches Skins in one tap and mobile controls meet 44x44 touch target size', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile touch targets and quick-jump');
    await page.goto('/');

    for (const selector of ['#osu-profile-link', '#mobile-menu-toggle', '#footer-discord', '#footer-x', '#footer-tiktok']) {
        const box = await page.locator(selector).boundingBox();
        expect(box, selector).not.toBeNull();
        if (box) {
            expect(box.width, `${selector} width`).toBeGreaterThanOrEqual(44);
            expect(box.height, `${selector} height`).toBeGreaterThanOrEqual(44);
        }
    }

    const quickSkins = page.locator('#overview').getByRole('link', { name: 'Skins', exact: true });
    await expect(quickSkins).toBeVisible();
    await quickSkins.click();
    await expect(page.getByRole('heading', { level: 2, name: 'Skins', exact: true })).toBeInViewport();
});

test('toast notification sits clear of the hero Scroll to explore cue', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await page.locator('#dock-discord').click();

    const toast = page.locator('#toast');
    await expect(toast).toContainText('Copied Discord ID');
    const toastBox = await toast.boundingBox();
    const cueBox = await page.locator('#overview').getByText('Scroll to explore').boundingBox();
    expect(toastBox).not.toBeNull();
    expect(cueBox).not.toBeNull();
    if (toastBox && cueBox) {
        const overlapsVertically = toastBox.y < cueBox.y + cueBox.height && toastBox.y + toastBox.height > cueBox.y;
        expect(overlapsVertically).toBe(false);
    }
});
