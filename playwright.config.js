// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const PORT = 4173;

module.exports = defineConfig({
    testDir: './tests',
    fullyParallel: true,
    // More parallel Chrome instances than this starve each other and push page loads past the timeout
    workers: 2,
    reporter: 'list',
    use: {
        baseURL: `http://localhost:${PORT}`,
        trace: 'retain-on-failure',
    },
    // Runs against the locally installed Google Chrome, so no browser download is needed
    projects: [
        { name: 'desktop', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
        { name: 'mobile', use: { ...devices['Pixel 7'], channel: 'chrome' } },
        // Chrome with "Use graphics acceleration when available" turned off draws everything in software
        {
            name: 'desktop-no-gpu',
            testMatch: 'motion.spec.js',
            use: { ...devices['Desktop Chrome'], channel: 'chrome', launchOptions: { args: ['--disable-gpu'] } },
        },
    ],
    webServer: {
        command: `npm run build && npx serve . -l ${PORT} --no-clipboard`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: !process.env.CI,
    },
});
