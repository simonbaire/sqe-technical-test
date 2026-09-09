import { defineConfig, devices } from '@playwright/test';

// Dev-only convenience config: runs the UI suite in the real, installed
// Google Chrome (not Playwright's bundled Chromium build), headed and
// slowed down, so a human can watch it run. This is not part of the
// reviewed test suite - see playwright.config.ts for that.
//
// Usage: npm run test:ui:chrome  (or: npx playwright test --config=playwright.chrome.config.ts)
export default defineConfig({
  testDir: './tests/ui',
  reporter: [['list']],
  use: {
    ...devices['Desktop Chrome'],
    channel: 'chrome',
    baseURL: 'https://www.saucedemo.com',
    headless: false,
    launchOptions: {
      slowMo: 500,
    },
  },
});
