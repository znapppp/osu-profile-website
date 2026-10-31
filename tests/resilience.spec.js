// @ts-check
const { test, expect } = require('./fixture');

test.describe('URL sanitization against unsafe schemes', () => {
    test.use({
        configPatch: `
            SITE_CONFIG.profile.socials.osuProfileUrl = 'javascript:alert(1)';
            SITE_CONFIG.profile.socials.tiktokUrl = 'javascript:alert(2)';
            SITE_CONFIG.tablet.driverDownloadUrl = 'javascript:alert(3)';
            SITE_CONFIG.skins.driveFolderUrl = 'javascript:alert(4)';
            SITE_CONFIG.skins.items[1].downloadUrl = 'javascript:alert(5)';
            SITE_CONFIG.overlays.items[0].downloadUrl = 'data:text/html,<script>alert(6)</script>';
            SITE_CONFIG.overlays.items[0].sourceRefUrl = 'vbscript:msgbox(1)';
        `,
    });

    test('blocks javascript:, data:, and vbscript: URLs across all rendered links', async ({ page }) => {
        /** @type {Error[]} */
        const errors = [];
        page.on('pageerror', (err) => errors.push(err));

        await page.goto('/');

        await expect(page.locator('#osu-profile-link')).toHaveAttribute('href', '#');
        await expect(page.locator('#dock-tiktok')).toHaveAttribute('href', '#');
        await expect(page.locator('#tablet-driver a')).toHaveCount(0);
        await expect(page.locator('#skins-drive-link')).toBeHidden();
        await expect(page.getByRole('link', { name: 'Download Bravo Skin (Test edit)' })).toHaveAttribute('href', '#');
        await expect(page.getByRole('link', { name: /Download overlay/i })).toHaveCount(0);
        await expect(page.locator('#overlays').getByText('Forked from:')).toHaveCount(0);

        const unsafeHrefs = await page.locator('a[href]').evaluateAll((anchors) =>
            anchors
                .map((a) => a.getAttribute('href') || '')
                .filter((href) => /^(javascript|data|vbscript):/i.test(href.trim()))
        );
        expect(unsafeHrefs).toEqual([]);
        expect(errors).toEqual([]);
    });
});

test.describe('skin slide edge cases', () => {
    test.use({
        configPatch: `
            SITE_CONFIG.skins.items[1].slides = [];
            SITE_CONFIG.skins.items[0].slides = [];
            SITE_CONFIG.skins.items[2].slides = [SITE_CONFIG.skins.items[2].slides[0]];
        `,
    });

    test('skins with zero or one screenshot render cleanly without runtime errors', async ({ page }) => {
        /** @type {Error[]} */
        const errors = [];
        page.on('pageerror', (err) => errors.push(err));

        await page.goto('/');

        const featured = page.locator('#skins-featured article');
        await expect(featured).toContainText('No screenshot available');
        await expect(featured.locator('[data-featured-slide]')).toHaveCount(0);
        await expect(featured.getByRole('link', { name: 'Download Bravo Skin (Test edit)' })).toBeVisible();

        const alphaCard = page.locator('#skins-grid article').filter({ hasText: 'Alpha Skin' });
        await expect(alphaCard).toContainText('No screenshot available');
        await expect(alphaCard.locator('[data-slide-step]')).toHaveCount(0);

        const charlieCard = page.locator('#skins-grid article').filter({ hasText: 'Charlie Skin' });
        await expect(charlieCard.getByRole('img', { name: 'Charlie gameplay' })).toBeVisible();
        await expect(charlieCard.locator('[data-slide-step]')).toHaveCount(0);

        expect(errors).toEqual([]);
    });
});

test.describe('gear accessibility sync from config', () => {
    test.use({
        configPatch: `
            SITE_CONFIG.tablet.previewAlt = 'Updated Wacom Area 62x40';
            SITE_CONFIG.keyboard.previewImage = '';
        `,
    });

    test('updates lightbox button aria-label from config and hides button when previewImage is empty', async ({ page }) => {
        await page.goto('/');

        const tabletZoom = page.getByRole('button', { name: 'Expand Updated Wacom Area 62x40 image' });
        await expect(tabletZoom).toBeVisible();
        await tabletZoom.click();

        const dialog = page.getByRole('dialog');
        await expect(dialog).toBeVisible();
        await expect(page.locator('#lightbox-title')).toHaveText('Updated Wacom Area 62x40');

        const keyboardBtn = page.locator('#keyboard-img').locator('..');
        await expect(keyboardBtn).toBeHidden();
    });
});

test.describe('avatar fallback loop protection', () => {
    test.use({
        configPatch: `
            SITE_CONFIG.profile.avatarUrl = 'missing-primary-avatar.png';
            SITE_CONFIG.profile.avatarFallback = 'missing-fallback-avatar.png';
        `,
    });

    test('attempts avatarFallback at most once when both primary and fallback fail', async ({ page }) => {
        let primaryRequests = 0;
        let fallbackRequests = 0;

        await page.route('**/missing-primary-avatar.png', (route) => {
            primaryRequests += 1;
            return route.fulfill({ status: 404, body: 'Not found' });
        });
        await page.route('**/missing-fallback-avatar.png', (route) => {
            fallbackRequests += 1;
            return route.fulfill({ status: 404, body: 'Not found' });
        });

        await page.goto('/');
        await expect.poll(() => fallbackRequests).toBe(1);
        await page.waitForTimeout(250);

        expect(primaryRequests).toBe(1);
        expect(fallbackRequests).toBe(1);
    });
});

test('enforces strict script-src CSP and contains zero inline event handlers', async ({ page }) => {
    /** @type {Error[]} */
    const errors = [];
    page.on('pageerror', (err) => errors.push(err));

    await page.goto('/');

    const csp = await page.locator('meta[http-equiv="Content-Security-Policy"]').getAttribute('content');
    expect(csp).toBeTruthy();
    expect(csp).toContain("script-src 'self'");
    expect(csp).not.toMatch(/script-src[^;]*'unsafe-inline'/);

    const inlineHandlerCount = await page.evaluate(() => {
        let count = 0;
        for (const el of document.querySelectorAll('*')) {
            for (const attr of el.getAttributeNames()) {
                if (attr.toLowerCase().startsWith('on')) count += 1;
            }
        }
        return count;
    });
    expect(inlineHandlerCount).toBe(0);
    expect(errors).toEqual([]);
});
