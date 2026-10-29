// @ts-check
const path = require('path');
const base = require('@playwright/test');

const FIXTURE_CONFIG = path.join(__dirname, 'fixtures', 'config.js');

// Every test sees the page with the fixture SITE_CONFIG instead of the real js/config.js
const test = base.test.extend({
    page: async ({ page }, use) => {
        await page.route('**/js/config.js', (route) =>
            route.fulfill({ path: FIXTURE_CONFIG, contentType: 'application/javascript' })
        );
        await use(page);
    },
});

module.exports = { test, expect: base.expect };
