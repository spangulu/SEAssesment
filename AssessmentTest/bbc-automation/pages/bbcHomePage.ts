import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class BBCHomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private cookieButtons = [
    'button:has-text("Accept all")',
    'button:has-text("I agree")',
    'button:has-text("Yes, I agree")',
    'button[title="OK"]',
    '#bbccookies-continue-button'
  ];

  private resultsSelector = [
    'main [data-testid="search-results"] a[href*="/sport/"]',
    'main a[href*="/sport/"]',
    'a[href*="/sport/"]:has(h1), a[href*="/sport/"]:has(h2), a[href*="/sport/"]:has(h3)'
  ].join(', ');

  async openHomePage() {
    const base = process.env.BASE_URL || 'https://www.bbc.com/sport';
    await this.navigateTo(base, 'domcontentloaded');
    await this.acceptCookiesIfPrompted();
  }

  async acceptCookiesIfPrompted() {
    for (const sel of this.cookieButtons) {
      const btn = this.page.locator(sel).first();
      if (await btn.isVisible().catch(() => false)) {
        await btn.click({ noWaitAfter: true }).catch(() => {});
        await this.page.waitForTimeout(300);
        break;
      }
    }
  }

  async search(term: string) {
    const q = encodeURIComponent(term);
    const url = `https://www.bbc.co.uk/search?q=${q}&scope=sport`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.acceptCookiesIfPrompted();
  }

  async getResultCount(): Promise<number> {
    return this.page.locator(this.resultsSelector).count();
  }

  async getResultLinks(): Promise<string[]> {
    const hrefs = await this.page.locator(this.resultsSelector).evaluateAll((els: Element[]) =>
      els.map((e: Element) => (e as HTMLAnchorElement).getAttribute('href') || '').filter(Boolean)
    );
    return Array.from(new Set(hrefs
      .map((h) => h.trim())
      .filter((h) => h && !h.startsWith('javascript:') && !h.startsWith('mailto:'))
      .map((h) => (h.startsWith('/') ? `https://www.bbc.com${h}` : h))
    ));
  }

  resultsLocator() {
    return this.page.locator(this.resultsSelector);
  }

  async getResultAnchorTexts(): Promise<string[]> {
    const anchors = this.resultsLocator();
    const count = await anchors.count();
    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      texts.push((await anchors.nth(i).innerText()).trim());
    }
    return texts;
  }
}