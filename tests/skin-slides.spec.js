// @ts-check
const { test, expect } = require('./fixture');

const card = (page, name) => page.locator('#skins-grid').getByRole('article').filter({ hasText: name });

test('a card steps through its screenshots with always-visible controls', async ({ page }) => {
    await page.goto('/');
    const charlie = card(page, 'Charlie Skin');
    const next = charlie.getByRole('button', { name: 'Next screenshot of Charlie Skin' });
    const previous = charlie.getByRole('button', { name: 'Previous screenshot of Charlie Skin' });

    await next.scrollIntoViewIfNeeded();
    await expect(next).toHaveCSS('opacity', '1');
    await expect(charlie.getByRole('img', { name: 'Charlie gameplay' })).toBeVisible();

    await next.click();
    await expect(charlie.getByRole('img', { name: 'Charlie song select' })).toBeInViewport();
    await expect(charlie.getByRole('button', { name: 'Show screenshot 2 of 3 of Charlie Skin' })).toHaveAttribute('aria-current', 'true');

    await previous.click();
    await previous.click();
    await expect(charlie.getByRole('img', { name: 'Charlie results' })).toBeInViewport();
    await expect(charlie.getByRole('button', { name: 'Show screenshot 3 of 3 of Charlie Skin' })).toHaveAttribute('aria-current', 'true');
});

test('a card indicator dot jumps straight to that screenshot', async ({ page }) => {
    await page.goto('/');
    const alpha = card(page, 'Alpha Skin');

    await alpha.getByRole('button', { name: 'Show screenshot 3 of 3 of Alpha Skin' }).click();

    await expect(alpha.getByRole('img', { name: 'Alpha results' })).toBeInViewport();
    await expect(alpha.getByRole('img', { name: 'Alpha gameplay' })).toHaveCount(0);
});

test('swiping a card on a touch screen changes the screenshot', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'touch only');
    await page.goto('/');
    const alpha = card(page, 'Alpha Skin');
    const image = alpha.getByRole('img', { name: 'Alpha gameplay' });
    await image.scrollIntoViewIfNeeded();
    const box = await image.boundingBox();
    if (!box) throw new Error('no image box');

    const y = box.y + box.height / 2;
    await swipe(page, image, { fromX: box.x + box.width * 0.8, toX: box.x + box.width * 0.2, y });
    await expect(alpha.getByRole('img', { name: 'Alpha song select' })).toBeInViewport();

    await swipe(page, alpha.getByRole('img', { name: 'Alpha song select' }), { fromX: box.x + box.width * 0.2, toX: box.x + box.width * 0.8, y });
    await expect(alpha.getByRole('img', { name: 'Alpha gameplay' })).toBeInViewport();
});

test('card screenshots change without sliding when reduced motion is preferred', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const alpha = card(page, 'Alpha Skin');
    const track = alpha.locator('[data-skin-slider]');

    const animates = await track.evaluate((el) => {
        const style = getComputedStyle(el);
        return style.transitionProperty !== 'none' && style.transitionDuration !== '0s';
    });
    expect(animates).toBe(false);
});

// Dispatches a horizontal touch swipe on `target`
async function swipe(page, target, { fromX, toX, y }) {
    await target.evaluate((el, { fromX, toX, y }) => {
        const touch = (x) => new Touch({ identifier: 1, target: el, clientX: x, clientY: y });
        el.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, touches: [touch(fromX)], changedTouches: [touch(fromX)] }));
        el.dispatchEvent(new TouchEvent('touchmove', { bubbles: true, touches: [touch(toX)], changedTouches: [touch(toX)] }));
        el.dispatchEvent(new TouchEvent('touchend', { bubbles: true, touches: [], changedTouches: [touch(toX)] }));
    }, { fromX, toX, y });
}
