import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  reporter: [
  ['list'],
  ['html', { outputFolder: 'playwright-report', open: 'never' }]
],

  use: {
    baseURL: "https://restcountries.com/v3.1/",
    extraHTTPHeaders: { 
      Accept: "application/json"
    }
  },
  timeout: 60000
});
