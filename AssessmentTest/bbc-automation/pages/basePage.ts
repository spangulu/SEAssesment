import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async navigateTo(url: string, wait: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded') {
    await this.page.goto(url, { waitUntil: wait });
  }
}