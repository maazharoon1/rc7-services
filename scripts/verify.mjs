import { chromium } from "playwright";
(async () => {
  const browser = await chromium.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ["/", "/about", "/services", "/gallery", "/contact"]) {
      await page.goto("http://localhost:3000" + route, {
        waitUntil: "networkidle",
      });
      const info = await page.evaluate(() => ({
        title: document.title,
        overflow: document.documentElement.scrollWidth > innerWidth,
        h1: document.querySelector("h1")?.textContent,
      }));
      console.log(width, route, JSON.stringify(info));
      if (info.overflow) throw Error("Overflow " + width + route);
    }
  }
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  if (
    (await page
      .locator("#mobile-menu")
      .evaluate((el) => el.getBoundingClientRect().height)) !== 1000
  )
    throw Error("Menu height");
  await page.keyboard.press("Escape");
  if (
    !(await page
      .getByRole("button", { name: "Open navigation" })
      .evaluate((el) => el === document.activeElement))
  )
    throw Error("Menu focus restore");
  console.log("Mobile menu Escape, focus return, viewport height passed");
  if (await page.locator("video").getAttribute("src"))
    throw Error("Reduced motion video downloaded");
  console.log("Reduced motion poster and no video download passed");
  await page.goto(
    "http://localhost:3000/contact?service=Interior%20%26%20Exterior%20Remodeling",
  );
  if (
    (await page.locator("select").inputValue()) !==
    "Interior & Exterior Remodeling"
  )
    throw Error("Preselect");
  await page.getByRole("button", { name: "Prepare My Estimate Email" }).click();
  if ((await page.locator("[aria-invalid=true]").count()) !== 3)
    throw Error("Validation");
  await page.locator("[name=name]").fill("Alex & Sam");
  await page.locator("[name=phone]").fill("6822033923");
  await page
    .locator("[name=details]")
    .fill("Paint & flooring\nBudget discussion? #home");
  await page.getByRole("button", { name: "Prepare My Estimate Email" }).click();
  const draft = await page
    .getByRole("link", { name: "Open the draft again" })
    .getAttribute("href");
  const url = new URL(draft);
  if (
    !url.searchParams.get("body").includes("Alex & Sam") ||
    !url.searchParams.get("body").includes("\nBudget discussion? #home")
  )
    throw Error("Encoding");
  console.log("Preselection, validation and email encoding passed");
  await page.goto("http://localhost:3000/gallery");
  const image = page.getByRole("button", { name: /Enlarge image 1/ });
  await image.click();
  await page.keyboard.press("ArrowRight");
  if (
    !(await page
      .locator(".lightbox-top")
      .innerText()
      .then((t) => t.includes("02")))
  )
    throw Error("Gallery next");
  await page.keyboard.press("Escape");
  if (!(await image.evaluate((el) => el === document.activeElement)))
    throw Error("Gallery focus");
  console.log("Lightbox next, Escape and focus passed");
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Next reviews" }).click();
  if (
    !(await page
      .getByRole("button", { name: "Show review group 2" })
      .getAttribute("aria-current"))
  )
    throw Error("Reviews");
  console.log("Carousel next and pagination passed");
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
    await page.screenshot({
      path: `artifacts/home-${width}.png`,
      fullPage: true,
    });
  }
  console.log("Browser errors:", errors);
  await browser.close();
  if (errors.length) process.exitCode = 1;
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
