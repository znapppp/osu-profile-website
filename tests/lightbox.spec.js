// @ts-check
const { test, expect } = require('./fixture');

test('visitor can open a gear screenshot full size and close it with Escape', async ({ page }) => {
    await page.goto('/');

    const trigger = page.locator('button', { has: page.getByAltText('Fixture tablet area screenshot') });
    await trigger.click();

    const lightbox = page.getByRole('dialog');
    await expect(lightbox).toBeVisible();
    await expect(lightbox).toContainText('Fixture tablet area screenshot');

    await page.keyboard.press('Escape');
    await expect(lightbox).toBeHidden();
    await expect(trigger).toBeFocused();
});

test('lightbox shows Tap outside to close on mobile instead of ESC keyboard hint', async ({ page, isMobile }) => {
    await page.goto('/');
    await page.locator('button', { has: page.getByAltText('Fixture tablet area screenshot') }).click();
    const lightbox = page.getByRole('dialog');
    await expect(lightbox).toBeVisible();

    if (isMobile) {
        await expect(lightbox.getByText('Tap outside to close')).toBeVisible();
        await expect(lightbox.locator('kbd')).toBeHidden();
    } else {
        await expect(lightbox.locator('kbd')).toBeVisible();
    }
});
