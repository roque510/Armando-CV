import { chromium } from "playwright";

const OUT = "scripts/_pf";
const TOURNEY = process.env.TOURNEY || "http://localhost:3002/tournament/x93LQgY7B6ZhLEtDe9hI";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

async function hideDevBadge() {
  await page.addStyleTag({
    content: `nextjs-portal,[data-next-badge-root],[data-next-badge],[data-nextjs-toast],#__next-build-watcher{display:none!important;}`,
  }).catch(() => {});
  await page.evaluate(() => {
    document.querySelectorAll("nextjs-portal,[data-next-badge-root],#__next-build-watcher").forEach((e) => e.remove());
  }).catch(() => {});
}

await page.goto(TOURNEY, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3000);

async function tab(label, name) {
  try {
    await page.getByRole("tab", { name }).first().click({ timeout: 4000 });
  } catch {
    try {
      await page.getByText(label, { exact: true }).first().click({ timeout: 4000 });
    } catch (e) {
      console.log(`FAILED click ${name}: ${e.message.split("\n")[0]}`);
    }
  }
  await page.waitForTimeout(1800);
  await hideDevBadge();
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${OUT}/tab-${name}.png`, fullPage: false });
  console.log(`shot tab-${name}`);
}

await hideDevBadge();
await page.screenshot({ path: `${OUT}/tab-overview.png` });
console.log("shot tab-overview");

await tab("Matches", "matches");
await tab("Schedule", "schedule");
await tab("Rankings", "rankings");

await browser.close();
