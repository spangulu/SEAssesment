import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90_000,
  retries: 1,
reporter: [
  ['list'],
  ['html', { outputFolder: 'playwright-report', open: 'never' }]
],

  use: {
    baseURL: process.env.BASE_URL || 'https://www.bbc.com/sport',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
  ]
});
