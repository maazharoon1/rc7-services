import { chromium } from "playwright";
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
await page
  .waitForFunction(
    () => document.querySelector("video").readyState >= 2,
    null,
    { timeout: 20000 },
  )
  .catch(() => {});
console.log(
  "Video",
  await page
    .locator("video")
    .evaluate((v) => ({
      paused: v.paused,
      ready: v.readyState,
      error: v.error?.message,
      source: v.currentSrc,
    })),
);
const pause = page.getByRole("button", { name: "Pause background video" });
if (await pause.count()) {
  await pause.click();
  if (!(await page.locator("video").evaluate((v) => v.paused)))
    throw Error("Video pause");
  await page.getByRole("button", { name: "Play background video" }).click();
  console.log("Video play/pause passed");
}
await page.locator(".stack-2").scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
console.log(
  "Stack",
  await page
    .locator(".stack-card")
    .evaluateAll((els) =>
      els.map((e) => ({
        top: e.getBoundingClientRect().top,
        scale: e.style.getPropertyValue("--stack-scale"),
      })),
    ),
);
await page.locator(".reviews-section").scrollIntoViewIfNeeded();
await page.mouse.move(0, 0);
const track = page.locator(".reviews-track");
const before = await track.getAttribute("style");
await page.waitForTimeout(7000);
const after = await track.getAttribute("style");
if (before === after) throw Error("Autoplay did not move");
await track.hover();
const hovered = await track.getAttribute("style");
await page.waitForTimeout(7000);
if (hovered !== (await track.getAttribute("style")))
  throw Error("Hover did not pause");
console.log("Carousel autoplay and hover pause passed");
await page.getByRole("button", { name: "Next reviews" }).focus();
const focused = await track.getAttribute("style");
await page.waitForTimeout(7000);
if (focused !== (await track.getAttribute("style"))) throw Error("Focus pause");
console.log("Carousel focus pause passed");
await page.setViewportSize({ width: 390, height: 844 });
await page.getByRole("button", { name: "Open navigation" }).click();
for (let i = 0; i < 10; i++) await page.keyboard.press("Tab");
if (
  !(await page
    .locator("#mobile-menu")
    .evaluate((e) => e.contains(document.activeElement)))
)
  throw Error("Focus trap");
if ((await page.evaluate(() => document.body.style.overflow)) !== "hidden")
  throw Error("Scroll lock");
await page.keyboard.press("Escape");
console.log("Menu focus containment and scroll lock passed");
const data = await browser.newPage();
await data.addInitScript(() =>
  Object.defineProperty(navigator, "connection", {
    value: { saveData: true },
    configurable: true,
  }),
);
await data.goto("http://localhost:3000/");
if (await data.locator("video").getAttribute("src"))
  throw Error("Save data fetched video");
console.log("Data saving poster passed");
await browser.close();
