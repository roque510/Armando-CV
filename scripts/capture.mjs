import { chromium } from "playwright";

const BASE = "http://localhost:3002";
const EMAIL = process.env.FZ_EMAIL;
const PASS = process.env.FZ_PASS;
const OUT = "scripts/_shots";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

await page.goto(BASE + "/login", { waitUntil: "networkidle" });
await page.fill('input[type="email"], input[name="email"]', EMAIL);
await page.fill('input[type="password"], input[name="password"]', PASS);
await page.click('button:has-text("Sign In"), button[type="submit"]');
await page.waitForURL("**/dashboard/**", { timeout: 20000 }).catch(() => {});
await page.waitForTimeout(1500);

await page.goto(BASE + "/dashboard/admin", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
console.log("start url:", page.url());

// Hide the Next.js dev indicator / build-error badge (dev-only overlay).
async function hideDevBadge() {
  await page
    .addStyleTag({
      content: `
        nextjs-portal,
        [data-next-badge-root],
        [data-next-badge],
        [data-nextjs-toast],
        #__next-build-watcher,
        #__next-prerender-indicator { display: none !important; }
      `,
    })
    .catch(() => {});
  await page
    .evaluate(() => {
      document
        .querySelectorAll(
          "nextjs-portal, [data-next-badge-root], #__next-build-watcher"
        )
        .forEach((el) => el.remove());
    })
    .catch(() => {});
}

async function shoot(name) {
  await page.waitForTimeout(1600);
  await hideDevBadge();
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
  console.log(`shot ${name} @ ${page.url()}`);
}

// 1. Dashboard
await shoot("dashboard");

// Helper: click a sidebar label and capture
async function nav(label, name) {
  try {
    await page.getByText(label, { exact: true }).first().click({ timeout: 8000 });
    await page.waitForLoadState("networkidle").catch(() => {});
    await shoot(name);
  } catch (e) {
    console.log(`FAILED ${name}: ${e.message.split("\n")[0]}`);
  }
}

await nav("Classes", "classes");
await nav("Membership Plans", "membership-plans");
await nav("Members", "members");
await nav("Reports", "reports");
await nav("Retention", "retention");

await browser.close();
