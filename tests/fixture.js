// @ts-check
const fs = require('fs');
const path = require('path');
const base = require('@playwright/test');

const FIXTURE_CONFIG = fs.readFileSync(path.join(__dirname, 'fixtures', 'config.js'), 'utf8');

// Every test sees the page with the fixture SITE_CONFIG instead of the real js/config.js.
// A test can change that data with test.use({ configPatch: '<js run after SITE_CONFIG is defined>' }).
const test = base.test.extend({
    configPatch: ['', { option: true }],
    page: async ({ page, configPatch, baseURL }, use) => {
        // Third-party requests (Google Fonts, osu! avatar) only slow tests down and make them flaky
        const origin = new URL(baseURL || '').origin;
        await page.route((url) => url.origin !== origin, (route) => route.abort());
        await page.route('**/js/config.js', (route) =>
            route.fulfill({ body: `${FIXTURE_CONFIG}\n${configPatch}`, contentType: 'application/javascript' })
        );
        await use(page);
    },
});

module.exports = { test, expect: base.expect };
