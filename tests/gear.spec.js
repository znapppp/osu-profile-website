// @ts-check
const { test, expect } = require('./fixture');


test('the gear section lists every device', async ({ page }) => {
    await page.goto('/');
    const gear = page.locator('#hardware');
    for (const name of [
        'Fixture Tablet T1',
        'Fixture Keyboard K1',
        'Fixture Keypad P1',
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
    expect(looks.length).toBe(3);
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
    for (const text of ['Fixture Driver v1', 'Release: 0.1 mm | Trigger: 0.2 mm', '2560 x 1440', '3.5 mm', 'Over-ear']) {
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
        for (const label of ['Active area', 'Driver', 'Actuation', 'Stroke', 'Refresh rate', 'Connection']) {
            const cell = gear.locator('div').filter({ has: page.getByText(label, { exact: true }) }).last();
            heights.push((await cell.boundingBox()).height);
        }
        expect(Math.min(...heights)).toBeGreaterThanOrEqual(104);
    });
});
