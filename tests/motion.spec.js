// @ts-check
const { test, expect } = require('./fixture');

// Windows reports "prefers reduced motion" whenever its animation effects are off, as on many PCs tuned for games,
// where Chrome's hardware acceleration is often off too. The owner wants those visitors to see the hero animate and
// the overlay preview play, so only the skin card slides honour the setting (see skin-slides.spec.js).

// The hero's CSS animations: the entrance ones run once, the floating crosses run forever
const heroAnimations = (page) =>
    page.evaluate(() => {
        const inHero = document.getAnimations().filter((a) => {
            const target = a.effect instanceof KeyframeEffect ? a.effect.target : null;
            return target && target.closest('#overview');
        });
        const forever = (a) => a.effect?.getComputedTiming().iterations === Infinity;
        return {
            entrance: inHero.filter((a) => !forever(a)).length,
            floating: inHero.filter((a) => forever(a) && a.playState === 'running').length,
        };
    });

// Where each floating cross is on screen right now
const floatingCrossPositions = (page) =>
    page.evaluate(() =>
        document.getAnimations()
            .filter((a) => a.playState === 'running' && a.effect?.getComputedTiming().iterations === Infinity)
            .map((a) => (a.effect instanceof KeyframeEffect ? a.effect.target : null))
            .filter((el) => el && el.closest('#overview'))
            .map((el) => {
                const box = el.getBoundingClientRect();
                return `${box.x.toFixed(1)},${box.y.toFixed(1)}`;
            })
    );

// Opacity as seen on screen: the element's own opacity times every ancestor's
const shownOpacity = (locator) =>
    locator.evaluate((el) => {
        let opacity = 1;
        for (let node = el; node; node = node.parentElement) opacity *= Number(getComputedStyle(node).opacity);
        return opacity;
    });

for (const reducedMotion of /** @type {const} */ (['no-preference', 'reduce'])) {
    test.describe(`when the system motion setting is ${reducedMotion}`, () => {
        test.beforeEach(async ({ page }) => {
            await page.emulateMedia({ reducedMotion });
        });

        test('the hero plays its entrance and its crosses keep floating', async ({ page }) => {
            await page.goto('/');
            const hero = page.locator('#overview');

            const animations = await heroAnimations(page);
            expect(animations.entrance).toBeGreaterThan(0);
            expect(animations.floating).toBeGreaterThan(0);
            await expect.poll(() => shownOpacity(hero.getByText('Scroll to explore'))).toBe(1);

            const before = await floatingCrossPositions(page);
            await page.waitForTimeout(1000);
            expect(await floatingCrossPositions(page)).not.toEqual(before);
        });

        test.describe('with a preview video', () => {
            test.use({ configPatch: `SITE_CONFIG.overlays.items[0].previewVideo = 'picture/overlay/vdo/preview_vdo.mp4';` });

            test('the overlay preview plays on its own once it is in view', async ({ page }) => {
                await page.goto('/');
                const video = page.locator('#overlays').getByLabel('Fixture Overlay video preview');
                await video.scrollIntoViewIfNeeded();
                await expect.poll(() => video.evaluate((v) => v instanceof HTMLVideoElement && !v.paused)).toBe(true);
            });
        });
    });
}

test('the no-GPU project really draws without hardware acceleration', async ({ browser }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-no-gpu', 'only meaningful in the no-GPU project');
    const cdp = await browser.newBrowserCDPSession();
    const { gpu } = await cdp.send('SystemInfo.getInfo');
    expect(gpu.featureStatus.gpu_compositing).toBe('disabled_software');
});
