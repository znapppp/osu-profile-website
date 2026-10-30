// @ts-check
const { test, expect } = require('./fixture');


test('the gear section lists every device', async ({ page }) => {
    await page.goto('/');
    const gear = page.locator('#hardware');
    for (const name of [
        'Fixture Tablet T1',
        'Fixture Keyboard K1',
        'Fixture Monitor M1',
        'Fixture Headphones H1',
    ]) {
        await expect(gear.getByRole('heading', { name })).toBeAttached();
    }
});

test('gear screenshots are shown in full colour', async ({ page }) => {
    await page.goto('/');
    const looks = await page.locator('#hardware img').evaluateAll((imgs) =>
        imgs.map((img) => [img.alt, getComputedStyle(img).filter, getComputedStyle(img).opacity])
    );
    expect(looks.length).toBe(2);
    for (const [alt, filter, opacity] of looks) {
        expect([alt, filter, opacity]).toEqual([alt, 'none', '1']);
    }
});

test('a single-number setting shows a large number with a monospace unit', async ({ page }) => {
    await page.goto('/');
    const monitor = page.locator('#hardware').getByRole('article').filter({ hasText: 'Fixture Monitor M1' });
    const number = monitor.getByText('240', { exact: true });
    const unit = monitor.getByText('Hz', { exact: true });

    await expect(number).toHaveCSS('font-family', /^"?Zen Maru Gothic/);
    await expect(unit).toHaveCSS('font-family', /^"?Geist Mono/);
    await expect(monitor).toContainText('Refresh rate');
});

test('every setting value from the config is shown', async ({ page }) => {
    await page.goto('/');
    const gear = page.locator('#hardware');
    for (const text of ['Fixture Driver v1', '2560 x 1440', '3.5 mm', 'Over-ear']) {
        await expect(gear).toContainText(text);
    }
});

test.describe('equal spec cells', () => {
    test('the monitor and audio boxes and every cell line up', async ({ page, isMobile }) => {
        test.skip(isMobile, 'side by side only on desktop');
        await page.goto('/');
        const gear = page.locator('#hardware');
        const box = async (label) => {
            const cell = gear.locator('div').filter({ has: page.getByText(label, { exact: true }) }).last();
            return cell.boundingBox();
        };
        const refresh = await box('Refresh rate');
        const resolution = await box('Resolution');
        const connection = await box('Connection');
        const type = await box('Type');

        expect(Math.abs(resolution.height - refresh.height)).toBeLessThan(1);
        // the frame around the audio cells is as tall as the frame around the monitor cells
        expect(Math.abs(connection.height - refresh.height)).toBeLessThan(1);
        expect(Math.abs(type.y - connection.y)).toBeLessThan(1);
        expect(Math.abs(connection.y - refresh.y)).toBeLessThan(1);
    });

    test('cells hold the same height whatever kind of value they show', async ({ page }) => {
        await page.goto('/');
        const gear = page.locator('#hardware');
        const heights = [];
        for (const label of ['Active area', 'Driver', 'Actuation', 'Refresh rate', 'Connection']) {
            const cell = gear.locator('div').filter({ has: page.getByText(label, { exact: true }) }).last();
            heights.push((await cell.boundingBox()).height);
        }
        expect(Math.min(...heights)).toBeGreaterThanOrEqual(104);
    });
});

test('each device is labelled with what kind of device it is', async ({ page }) => {
    await page.goto('/');
    const gear = page.locator('#hardware');
    const kinds = {
        'Fixture Tablet T1': 'Tablet',
        'Fixture Keyboard K1': 'Keyboard',
        'Fixture Monitor M1': 'Monitor',
        'Fixture Headphones H1': 'Earphones',
    };
    for (const [name, kind] of Object.entries(kinds)) {
        const device = gear.getByRole('article').filter({ has: page.getByRole('heading', { name }) });
        await expect(device.getByText(kind, { exact: true })).toBeVisible();
    }
});

test('the category label is quiet: small, muted, normal case', async ({ page }) => {
    await page.goto('/');
    const label = page.locator('#hardware').getByText('Tablet', { exact: true });
    await expect(label).toHaveCSS('font-size', '14px');
    await expect(label).toHaveCSS('text-transform', 'none');
    await expect(label).toHaveCSS('letter-spacing', 'normal');
    await expect(label).toHaveCSS('color', 'rgb(154, 154, 154)');
});
