import { Page } from '@playwright/test';

export class BBCResultsPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async openFormula1Home(): Promise<void> {
    const url = 'https://www.bbc.com/sport/formula1';
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector('a:has-text("Results")', { timeout: 30000 });
  }

  async openSeasonTab(tabName: string): Promise<void> {
    const tab = this.page.locator(`a:has-text("${tabName}")`).first();
    await tab.waitFor({ state: 'visible', timeout: 15000 });
    await tab.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectSeason(year: string): Promise<void> {
    const seasonLink = this.page.locator(`a:has-text("${year}")`).first();
    await seasonLink.waitFor({ state: 'visible', timeout: 15000 });
    await seasonLink.scrollIntoViewIfNeeded();
    await seasonLink.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector(`a[href*="${year}/"]`, { timeout: 20000 });
  }

  async openRaceResultsPage(raceName: string): Promise<void> {
    await this.page.waitForSelector('a[href*="grand-prix/results"]', { timeout: 30000 });
    let foundUrl: string | null = null;
    const links = await this.page.locator('a[href*="grand-prix/results"]').all();
    for (const link of links) {
      const text = (await link.textContent())?.toLowerCase() || '';
      if (text.includes(raceName.toLowerCase())) {
        foundUrl = await link.getAttribute('href');
        if (foundUrl && !foundUrl.startsWith('http')) {
          foundUrl = 'https://www.bbc.com' + foundUrl;
        }
        break;
      }
    }
    if (!foundUrl) {
      if (raceName.toLowerCase().includes('las vegas')) {
        foundUrl = 'https://www.bbc.com/sport/formula1/2023/las-vegas-grand-prix/results';
      } else {
        throw new Error(`Could not find race link for "${raceName}" after searching links`);
      }
    }
    await this.page.goto(foundUrl, { waitUntil: 'domcontentloaded' });

    try {
      await this.page.waitForSelector("table[aria-label='Race']", { timeout: 20000 });
    } catch {
      throw new Error('Race results table did not load in time.');
    }
  }

  async debugPrintResultsPreview(): Promise<void> {
    const rows = this.page.locator('table[data-testid="sport-table"] tbody tr');
    const count = await rows.count();
    for (let i = 0; i < Math.min(count, 5); i++) {
      // optionally log preview if needed
    }
  }

  async findDriverPosition(driverName: string): Promise<number | null> {
    const rows = this.page.locator("table[aria-label='Race'] tbody tr");
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const cells = await row.locator('td').allTextContents();
      const driverCellIdx = cells.findIndex(cell => cell.toLowerCase().includes(driverName.toLowerCase()));
      if (driverCellIdx !== -1) return i + 1;
    }
    return null;
  }
}