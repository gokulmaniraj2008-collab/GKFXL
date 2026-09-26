import { test, expect } from "@playwright/test";

test("homepage responds and renders a document", async ({ page }) => {
  const response = await page.goto("/");
  expect(response, "homepage should return a response").not.toBeNull();
  expect(response!.status()).toBeLessThan(400);
  await expect(page.locator("body")).toBeVisible();
});

test("homepage fits a narrow mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
});
