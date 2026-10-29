// @ts-check
const { test, expect } = require('./fixture');

// Returns [text, fontSize] for every visible element in `selector` that directly holds text
function smallTextIn(page, selector, minPx) {
    return page.evaluate(([sel, min]) => {
        const root = document.querySelector(sel);
        if (!root) return [['missing section', sel]];
        const found = [];
        for (const el of root.querySelectorAll('*')) {
            const ownText = Array.from(el.childNodes)
                .filter((n) => n.nodeType === Node.TEXT_NODE)
                .map((n) => n.textContent.trim())
                .join('');
            if (!ownText || el.closest('[aria-hidden="true"]')) continue;
            const rect = el.getBoundingClientRect();
            const style = getComputedStyle(el);
            if (rect.width === 0 || rect.height === 0 || style.visibility === 'hidden') continue;
            const size = parseFloat(style.fontSize);
            if (size < min) found.push([ownText, size]);
        }
        return found;
    }, [selector, minPx]);
}

test('section headings use the Zen Maru Gothic display face', async ({ page }) => {
    await page.goto('/');
    for (const id of ['hardware', 'skins', 'overlays']) {
        const family = await page.locator(`#${id} h2`).evaluate((el) => getComputedStyle(el).fontFamily);
        expect(family, `#${id} heading`).toMatch(/^"?Zen Maru Gothic/);
    }
});

test('body copy is set at regular weight, not light', async ({ page }) => {
    await page.goto('/');
    const weights = await page.locator('main p').evaluateAll((els) =>
        els.filter((el) => el.offsetParent !== null).map((el) => [el.textContent.trim().slice(0, 40), getComputedStyle(el).fontWeight])
    );
    expect(weights.length).toBeGreaterThan(0);
    expect(weights.filter(([, w]) => Number(w) < 400)).toEqual([]);
});

test('setting values use Geist Mono', async ({ page }) => {
    await page.goto('/');
    const family = await page.getByText('50 mm x 30 mm').evaluate((el) => getComputedStyle(el).fontFamily);
    expect(family).toMatch(/^"?Geist Mono/);
});

test('no informational text in the gear and skins sections is smaller than 12px', async ({ page }) => {
    await page.goto('/');
    expect(await smallTextIn(page, '#hardware', 12)).toEqual([]);
    expect(await smallTextIn(page, '#skins', 12)).toEqual([]);
});
