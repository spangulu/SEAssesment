import { Page } from '@playwright/test';

export class BBCHomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.bbc.com/sport', { waitUntil: 'domcontentloaded' });
  }

  async search(term: string) {
      const query = encodeURIComponent(term);
    const url = `https://www.bbc.co.uk/search?q=${query}&scope=sport`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }
  async getResultCount(): Promise<number> {
    const results = this.page.locator('a[href*="/sport/"]');
    return results.count();
  } 
}
