// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const PORT = 4173;

module.exports = defineConfig({
    testDir: './tests',
    fullyParallel: true,
    reporter: 'list',
    use: {
        baseURL: `http://localhost:${PORT}`,
        trace: 'retain-on-failure',
    },
    // Runs against the locally installed Google Chrome, so no browser download is needed
    projects: [
        { name: 'desktop', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
        { name: 'mobile', use: { ...devices['Pixel 7'], channel: 'chrome' } },
    ],
    webServer: {
        command: `npm run build && npx serve . -l ${PORT} --no-clipboard`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: !process.env.CI,
    },
});
