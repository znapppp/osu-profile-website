// @ts-check
const { test, expect } = require('./fixture');

test('the page never scrolls sideways', async ({ page }) => {
    await page.goto('/');
    for (const y of [0, 800, 2000, 100000]) {
        await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(0);
    }
});

test.describe('hero', () => {
    test('stays pinned while the content below slides over it', async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }));
        await expect.poll(async () => (await page.locator('#overview').boundingBox())?.y).toBe(0);
    });

    test('stops painting once the page covers it and comes back on the way up', async ({ page }) => {
        await page.goto('/');
        const hero = page.locator('#overview');
        await expect(hero).toBeVisible();

        await page.evaluate(() => window.scrollTo({ top: document.getElementById('skins').offsetTop, behavior: 'instant' }));
        await expect(hero).toBeHidden();

        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await expect(hero).toBeVisible();
        await expect(page.locator('[data-hero-content]')).toHaveCSS('opacity', '1');
    });
});

test('the header has no bar over the hero and a solid one after scrolling', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('#site-header');
    await expect(header).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');

    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'instant' }));
    await expect(header).toHaveCSS('background-color', 'rgb(19, 19, 19)');
});

test.describe('featured skin screenshots', () => {
    const featured = (page) => page.locator('#skins-featured article');

    test('the wipe copy of the old screenshot cleans up after itself and never reaches assistive tech', async ({ page }) => {
        await page.goto('/');
        await featured(page).scrollIntoViewIfNeeded();
        await featured(page).getByRole('button', { name: /Show Results UI screenshot/ }).click();

        await expect(featured(page).getByRole('img', { name: 'Bravo results' })).toBeVisible();
        await expect(featured(page).getByRole('img', { name: 'Bravo gameplay' })).toHaveCount(0);
        await expect(featured(page).locator('.skin-ghost')).toHaveCount(0);
    });

    test('choosing the thumbnail already shown does nothing', async ({ page }) => {
        await page.goto('/');
        await featured(page).scrollIntoViewIfNeeded();
        await featured(page).getByRole('button', { name: /Show Gameplay screenshot/ }).click();
        await expect(featured(page).locator('.skin-ghost')).toHaveCount(0);
    });
});

test.describe('overlay video', () => {
    test.use({ configPatch: `SITE_CONFIG.overlays.items[0].previewVideo = 'picture/overlay/vdo/preview_vdo.mp4';` });

    test('has settled at full size by the time the section is in view', async ({ page }) => {
        await page.goto('/');
        const frame = page.locator('[data-scroll-zoom]');
        await page.evaluate(() => document.querySelector('#overlays h2').scrollIntoView({ behavior: 'instant' }));
        await expect.poll(() => frame.evaluate((el) => getComputedStyle(el).transform)).toBe('none');
    });
});

test.describe('nothing runs off the screen on short windows', () => {
    test.skip(({ isMobile }) => isMobile, 'desktop window sizes');

    for (const [width, height] of [[1685, 762], [1366, 650], [1920, 950]]) {
        test.describe(`at ${width}x${height}`, () => {
            test.use({
                viewport: { width, height },
                configPatch: `SITE_CONFIG.overlays.items[0].previewVideo = 'picture/overlay/vdo/preview_vdo.mp4';`,
            });

            test('the Skins link lands with the heading clear of the header and the whole current skin on screen', async ({ page }) => {
                await page.goto('/');
                await page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('link', { name: 'Skins' }).click();

                const heading = page.getByRole('heading', { level: 2, name: 'Skins' });
                const header = page.locator('#site-header');
                const download = page.getByRole('link', { name: 'Download Bravo Skin (Test edit)' });
                await expect(page.locator('#skins-featured article')).toHaveCSS('opacity', '1');
                // Sections can sit on a fraction of a pixel, so "at the top" means within a pixel
                await expect.poll(async () => Math.abs((await page.locator('#skins').boundingBox())?.y ?? 999)).toBeLessThan(1);

                const headingBox = await heading.boundingBox();
                const headerBox = await header.boundingBox();
                const downloadBox = await download.boundingBox();
                if (!headingBox || !headerBox || !downloadBox) throw new Error('missing box');
                expect(headingBox.y).toBeGreaterThanOrEqual(headerBox.y + headerBox.height);
                expect(downloadBox.y + downloadBox.height).toBeLessThanOrEqual(height);
            });

            test('the overlay video is never taller than the screen below the header', async ({ page }) => {
                await page.goto('/');
                const box = await page.locator('.overlay-frame').boundingBox();
                const headerBox = await page.locator('#site-header').boundingBox();
                if (!box || !headerBox) throw new Error('missing box');
                expect(box.height).toBeLessThanOrEqual(height - headerBox.height);
            });
        });
    }
});

test('the footer wordmark is decoration and stays out of the way of the links', async ({ page }) => {
    await page.goto('/');
    const mark = page.locator('.footer-mark');
    await expect(mark).toHaveAttribute('aria-hidden', 'true');
    const links = await page.locator('footer nav').boundingBox();
    const box = await mark.boundingBox();
    expect(links && box && links.y + links.height).toBeLessThanOrEqual(box?.y ?? 0);
});
