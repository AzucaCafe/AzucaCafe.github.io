const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Desktop Home
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://localhost:8000/#home');
  await page.waitForTimeout(2000); // Wait for animations
  await page.screenshot({ path: 'desktop_home.png' });

  // Desktop Shop
  await page.goto('http://localhost:8000/#shop');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'desktop_shop.png' });

  // Mobile Home
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:8000/#home');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'mobile_home.png' });

  // Mobile Menu
  await page.click('.menu-toggle');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'mobile_menu.png' });

  await browser.close();
})();
