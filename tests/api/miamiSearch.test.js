import { test, expect } from '@playwright/test';
test('Go to http://localhost:3000', async ({ page }) => {

await page.goto('http://localhost:3000/');


  await page.locator('[placeholder="Enter a city"]').click();

  await page.locator('[placeholder="Enter a city"]').fill('Miam');

  await page.locator('text=Miami Florida, United States of America').click();

  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/planner?lat=25.7741728&lon=-80.19362' }*/),
    page.locator('text=Start planning').click()
  ]);

  await page.locator('text=Events Browse all Ride and Dine with Us! Miscellaneous Ride and Dine with Us! Mi >> button').nth(2).click();

  await page.locator('text=Events Browse all Ride and Dine with Us! Miscellaneous Ride and Dine with Us! Mi >> button').nth(2).click();

  await page.locator('button:has-text("Browse all")').click();
});