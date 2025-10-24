import { Before, After, AfterStep } from "@cucumber/cucumber";
import { TestContext } from "../support/world";
import fs from "fs";
import path from "path";

Before(async function (this: TestContext) {
  await this.launchBrowser();
});

After(async function (this: TestContext) {
  await this.browser?.close();
});

AfterStep(async function (this: TestContext, { result }) {
  if (result?.status === "FAILED" && this.page) {
    const dir = path.join(process.cwd(), "reports", "screenshots");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const filePath = path.join(dir, `FAILED_${Date.now()}.png`);

    // Save screenshot to file
    const buffer = await this.page.screenshot({ path: filePath, fullPage: true });

    // Attach screenshot to Cucumber JSON report
    this.attach(buffer.toString("base64"), "image/png");
  }
});


