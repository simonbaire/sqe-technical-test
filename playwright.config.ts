import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],
  use: {
    // Only captured for failing tests (and discarded for passing ones), so
    // these don't bloat the report on a normal green run; they only
    // apply to UI tests since there's no browser/page for API tests.
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'api',
      testMatch: /tests\/api\/.*\.spec\.ts/,
      use: {
        baseURL: 'https://petstore.swagger.io/v2/',
        extraHTTPHeaders: {
          Accept: 'application/json',
        },
      },
    },
    {
      name: 'ui',
      testMatch: /tests\/ui\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
      },
    },
  ],
});
