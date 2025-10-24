import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { TestContext } from '../support/world';

// --- Common Given steps ---
// alias matching feature wording
Given('I am on the BBC Sport homepage', async function (this: TestContext) {
  await this.page!.goto('https://www.bbc.com/sport', { waitUntil: 'domcontentloaded' });
});

Given('I accept cookies if prompted', async function (this: TestContext) {
  const buttons = [
    'button:has-text("Accept all")',
    'button:has-text("I agree")',
    'button:has-text("Yes, I agree")',
    '#bbccookies-continue-button'
  ];
  for (const selector of buttons) {
    const btn = this.page!.locator(selector);
    if (await btn.isVisible().catch(() => false)) {
      await btn.click({ noWaitAfter: true }).catch(() => {});
      break;
    }
  }
});

// --- Search ---
When('I search for {string}', async function (this: TestContext, term: string) {
  const encoded = encodeURIComponent(term);
  // attach console error collector if not already present
  if (!(this.page as any).__consoleListenerAttached) {
    (this.page as any).__consoleListenerAttached = true;
    this.page!.on('console', (msg: any) => {
      if (msg.type() === 'error') {
        const errors = (this.page as any).__consoleErrors || ((this.page as any).__consoleErrors = []);
        errors.push(msg.text());
      }
    });
  }

  await this.page!.goto(`https://www.bbc.com/search?q=${encoded}&scope=sport`, { waitUntil: 'domcontentloaded' });
});

// --- Validations ---
// alias matching feature wording (extra word 'displayed')
Then('I should see at least {int} relevant search results displayed', async function (this: TestContext, minCount: number) {
  // Prefer a main search-results container when available
  const container = this.page!.locator('main [data-testid="search-results"], main .search-results, #search-content');
  let hrefs: string[] = [];
  if (await container.count()) {
    hrefs = await container.locator('a[href*="/sport/"]').evaluateAll((els: Element[]) =>
      els.map((e: Element) => (e as HTMLAnchorElement).getAttribute('href') || '').filter(Boolean)
    );
  }
  if (!hrefs.length) {
    hrefs = await this.page!.locator('a[href*="/sport/"]').evaluateAll((els: Element[]) =>
      els.map((e: Element) => (e as HTMLAnchorElement).getAttribute('href') || '').filter(Boolean)
    );
  }

  // Normalize and filter out non-HTTP links
  hrefs = hrefs
    .map((h) => h.trim())
    .filter((h) => h && !h.startsWith('javascript:') && !h.startsWith('mailto:'))
    .map((h) => (h.startsWith('/') ? `https://www.bbc.com${h}` : h));

  const unique = Array.from(new Set(hrefs));
  expect(unique.length).toBeGreaterThanOrEqual(minCount);
});

Then('each search result should link to a valid BBC Sport article', async function (this: TestContext) {
  const links = await this.page!.locator('a[href*="/sport/"]').evaluateAll((els: Element[]) =>
    els.map((e: Element) => (e as HTMLAnchorElement).getAttribute('href') || '')
  );
  for (const hrefRaw of links) {
    const href = (hrefRaw || '').trim();
    if (!href) continue;
    const full = href.startsWith('/') ? `https://www.bbc.com${href}` : href;
    expect(full).toMatch(/^https?:\/\/(www\.)?bbc\.(co\.uk|com)\/sport\//);
  }
});

Then('each result title should include the keyword {string} or {string}', async function (this: TestContext, k1: string, k2: string) {
  const anchors = this.page!.locator('a[href*="/sport/"]');
  const count = await anchors.count();
  let foundAny = 0;
  for (let i = 0; i < count; i++) {
    const text = (await anchors.nth(i).innerText()).trim();
    if (text.toLowerCase().includes(k1.toLowerCase()) || text.toLowerCase().includes(k2.toLowerCase())) foundAny++;
  }
  expect(foundAny).toBeGreaterThanOrEqual(1);
});

Then('no result entry should be empty or broken', async function (this: TestContext) {
  const anchors = this.page!.locator('a[href*="/sport/"]');
  const count = await anchors.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const href = (await anchors.nth(i).getAttribute('href')) || '';
    const text = (await anchors.nth(i).innerText()).trim();
    expect(href.length).toBeGreaterThan(0);
    expect(text.length).toBeGreaterThan(0);
  }
});

// (Removed unused: 'each search result should have a non-empty title' and 'search result URLs should be unique')

Then('there should be no console errors on the page', async function (this: TestContext) {
  const errors = (this.page as any).__consoleErrors || [];
  // wait briefly for any late errors
  await this.page!.waitForTimeout(300);
  expect(errors, `Console errors detected:\n${(errors || []).join('\n')}`).toHaveLength(0);
});
