
export class BasePage {
  protected page: any;
  constructor(page: any) {
    this.page = page;
  }
  async navigateTo(url: string) {
    await this.page.goto(url);
  }
}

export class BBCHomePage extends BasePage {
  // --- Cookie banners / consent fallbacks (BBC has several variants)
  private cookieButtons = [
    'button:has-text("Accept all")',
    'button:has-text("I agree")',
    'button:has-text("Yes, I agree")',
    'button[title="OK"]',
    '#bbccookies-continue-button'
  ];

  // --- Search toggle fallbacks (header changes frequently)
  private searchToggles = [
    '[data-testid="search-icon-button"]',                // previous
    'button[aria-label*="Search" i]',                    // ARIA label
    'button:has(svg[aria-label*="Search" i])',           // icon-based
    'button:has-text("Search")'                          // text fallback
  ];

  // --- Result anchors (works for both site search & sport scope pages)
  private resultLinks = this.page.locator(
    [
      '[data-testid="search-results"] a',
      'main a[href*="/sport/"]',
      'a[href*="/sport/"]:has(h1), a[href*="/sport/"]:has(h2), a[href*="/sport/"]:has(h3)'
    ].join(', ')
  );

  async openHomePage() {
    const base = process.env.BASE_URL || 'https://www.bbc.com/sport';
    await this.navigateTo(base);
    await this.dismissConsentIfPresent();
  }

  private async dismissConsentIfPresent() {
    for (const sel of this.cookieButtons) {
      const btn = this.page.locator(sel);
      if (await btn.first().isVisible().catch(() => false)) {
        await btn.first().click({ noWaitAfter: true }).catch(() => {});
        // give the overlay a moment to disappear
        await this.page.waitForTimeout(300);
        break;
      }
    }
  }

  private async tryOpenSearchUI(): Promise<boolean> {
    for (const sel of this.searchToggles) {
      const el = this.page.locator(sel);
      if (await el.first().isVisible().catch(() => false)) {
        await el.first().click();
        return true;
      }
    }
    return false;
  }

  async search(term: string) {
    // Attempt UI search first
    if (await this.tryOpenSearchUI()) {
      // try common search input patterns
      const inputs = [
        'input[type="search"]',
        'input[aria-label*="Search" i]',
        'input[name="q"]'
      ];
      let filled = false;
      for (const iSel of inputs) {
        const input = this.page.locator(iSel);
        if (await input.first().isVisible().catch(() => false)) {
          await input.fill(term);
          await this.page.keyboard.press('Enter');
          filled = true;
          break;
        }
      }
      if (!filled) {
        // fallback to direct URL if input wasn’t located
        await this.gotoSearchPage(term);
      }
    } else {
      // Header didn’t expose a toggle → go direct to search page
      await this.gotoSearchPage(term);
    }

    await this.page.waitForLoadState('domcontentloaded');
  }

  private async gotoSearchPage(term: string) {
    // BBC search with sport scope (co.uk domain commonly serves search)
    const q = encodeURIComponent(term);
    const url = `https://www.bbc.co.uk/search?q=${q}&scope=sport`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.dismissConsentIfPresent();
  }

  async getResultCount(): Promise<number> {
    return this.resultLinks.count();
  }
}
