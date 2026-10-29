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
