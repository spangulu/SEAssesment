import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { Browser, Page, chromium } from "playwright";

export class TestContext extends World {
  browser?: Browser;
  page?: Page;

  constructor(opts: IWorldOptions) {
    super(opts);
  }

  async launchBrowser() {
    this.browser = await chromium.launch({ headless: true });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
  }
}

setWorldConstructor(TestContext);
