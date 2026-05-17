const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('--- Desktop Verification ---');
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://localhost:8000');
  await page.waitForSelector('#content h1');
  await page.screenshot({ path: 'desktop_home_v2.png' });
  console.log('Saved desktop_home_v2.png');

  await page.click('a[data-target="shop"]');
  await page.waitForSelector('#shop-container', { timeout: 10000 });
  // Wait for images or transition
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'desktop_shop_v2.png' });
  console.log('Saved desktop_shop_v2.png');

  console.log('--- Mobile Verification ---');
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://localhost:8000');
  await page.waitForSelector('#content h1');

  // Check if navbar is visible
  const isNavbarVisible = await page.isVisible('.navbar-container');
  console.log('Is navbar visible on mobile?', isNavbarVisible);

  await page.screenshot({ path: 'mobile_home_v2.png' });
  console.log('Saved mobile_home_v2.png');

  // Try to open mobile menu
  const toggle = await page.$('.mobile-menu-toggle');
  if (toggle) {
    console.log('Clicking mobile menu toggle...');
    await toggle.click();
    await page.waitForTimeout(500); // wait for animation
    await page.screenshot({ path: 'mobile_menu_v2.png' });
    console.log('Saved mobile_menu_v2.png');

    // Check if nav is active
    const isNavActive = await page.evaluate(() => document.querySelector('nav').classList.contains('active'));
    console.log('Is nav active after click?', isNavActive);
  } else {
    console.log('Mobile menu toggle NOT found!');
  }

  await browser.close();
})();
