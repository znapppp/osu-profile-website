// @ts-check
const { test, expect } = require('./fixture');

const featuredSkin = (page) =>
    page.locator('#skins').getByRole('article').filter({ has: page.getByText('Current', { exact: true }) });

test.describe('featured skin', () => {
    test('the skin flagged current is featured with its note and details', async ({ page }) => {
        await page.goto('/');
        const featured = featuredSkin(page);

        await expect(featured).toHaveCount(1);
        await expect(featured.getByRole('heading')).toHaveText('Bravo Skin (Test edit)');
        await expect(featured).toContainText('Bravo is the one I always come back to.');
        await expect(featured).toContainText('Bravo Original');
        await expect(featured).toContainText('Instafade');
    });

    test('choosing a screenshot thumbnail shows that screen in the banner', async ({ page }) => {
        await page.goto('/');
        const featured = featuredSkin(page);
        await expect(featured.getByRole('img', { name: 'Bravo gameplay' })).toBeVisible();

        await featured.getByRole('button', { name: 'Show Song Select screenshot of Bravo Skin (Test edit)' }).click();

        await expect(featured.getByRole('img', { name: 'Bravo song select' })).toBeVisible();
        await expect(featured.getByRole('button', { name: 'Show Song Select screenshot of Bravo Skin (Test edit)' })).toHaveAttribute('aria-pressed', 'true');
        await expect(featured.getByRole('button', { name: 'Show Gameplay screenshot of Bravo Skin (Test edit)' })).toHaveAttribute('aria-pressed', 'false');
    });
});

test.describe('without a current flag', () => {
    test.use({ configPatch: 'SITE_CONFIG.skins.items.forEach((item) => delete item.current);' });

    test('the first skin is featured', async ({ page }) => {
        await page.goto('/');
        await expect(featuredSkin(page).getByRole('heading')).toHaveText('Alpha Skin');
    });
});

test('the other skins appear as cards in config order, without placeholders', async ({ page }) => {
    await page.goto('/');
    const skins = page.locator('#skins');

    await expect(skins.getByRole('article').getByRole('heading')).toHaveText([
        'Bravo Skin (Test edit)',
        'Alpha Skin',
        'Charlie Skin',
    ]);
    await expect(skins).not.toContainText('Placeholder Skin');
    await expect(skins).toContainText('3 skins');
    await expect(skins.getByRole('article').filter({ hasText: 'Charlie Skin' })).toContainText('High AR');
});

test('every skin has a visible download link without hovering', async ({ page }) => {
    await page.goto('/');
    const expected = {
        'Alpha Skin': 'https://drive.example/alpha',
        'Bravo Skin (Test edit)': 'https://drive.example/bravo',
        'Charlie Skin': 'https://drive.example/charlie',
    };
    for (const [name, href] of Object.entries(expected)) {
        const link = page.getByRole('link', { name: `Download ${name}` });
        await link.scrollIntoViewIfNeeded();
        await expect(link).toBeVisible();
        await expect(link).toHaveCSS('opacity', '1');
        await expect(link).toHaveAttribute('href', href);
    }
});

test('the older skins archive stays linked', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#skins').getByRole('link', { name: /archive/i })).toHaveAttribute(
        'href',
        'https://drive.example/folder/archive'
    );
});

test('slide controls name the skin they belong to', async ({ page }) => {
    await page.goto('/');
    const featured = featuredSkin(page);
    const thumbnails = featured.getByRole('group').getByRole('button');
    await expect(thumbnails).toHaveCount(3);
    for (const thumbnail of await thumbnails.all()) {
        await expect(thumbnail).toHaveAccessibleName(/Bravo Skin \(Test edit\)/);
    }

    const alpha = page.locator('#skins-grid').getByRole('article').filter({ hasText: 'Alpha Skin' });
    const dots = alpha.getByRole('button', { name: /^Show screenshot \d of \d/ });
    await expect(dots).toHaveCount(3);
    for (const dot of await dots.all()) {
        await expect(dot).toHaveAccessibleName(/Alpha Skin/);
    }
});

test.describe('whole screenshots', () => {
    test('the featured banner is 16:9 and shows the whole screenshot', async ({ page }) => {
        await page.goto('/');
        const img = featuredSkin(page).getByRole('img', { name: 'Bravo gameplay' });
        await expect(img).toHaveCSS('object-fit', 'contain');
        const box = await img.boundingBox();
        expect(Math.abs(box.width / box.height - 16 / 9)).toBeLessThan(0.02);
    });

    test('skin card screenshots are never cropped', async ({ page }) => {
        await page.goto('/');
        const card = page.locator('#skins').getByRole('article').filter({ hasText: 'Alpha Skin' });
        await expect(card.getByRole('img').first()).toHaveCSS('object-fit', 'contain');
    });
});

test.describe('button corners', () => {
    test('download and archive links have softly rounded corners', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('link', { name: /^Download Bravo Skin/ })).toHaveCSS('border-radius', '6px');
        await expect(page.getByRole('link', { name: /older skins archive/i })).toHaveCSS('border-radius', '6px');
    });
});

test('the featured skin name sits below the banner screenshot, not over it', async ({ page }) => {
    await page.goto('/');
    const featured = featuredSkin(page);
    const image = await featured.getByRole('img', { name: 'Bravo gameplay' }).boundingBox();
    const name = await featured.getByRole('heading').boundingBox();

    expect(image).not.toBeNull();
    expect(name).not.toBeNull();
    expect(name.y).toBeGreaterThanOrEqual(image.y + image.height - 1);
});
