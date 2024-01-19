import { test, expect } from "@playwright/test";

// NOTE: FOR TESTING AUDIO MAKE SURE CHROMIUM AUDIO FILE IS SUPPORTED E.G. MP3 (M4A isn't)


test("play button changes to pause when clicked", async ({ page }) => {
  await page.goto('/track/10');
  await page.getByLabel('play').click();
  await expect(page.getByLabel('pause')).toBeVisible();
});

test("on play analyzer is displayed", async ({ page }) => {
  await page.goto('/track/10');
  await page.getByLabel('play').click();
  await expect(page.locator('canvas')).toBeVisible();
});

test("progress bar updates accordingly when forward seek button is clicked", async ({ page }) => {
  await page.goto('/track/10');  
  let bar = page.getByLabel('progress bar');

  let getBarWidth = async () => {
    let width = await bar.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('width');
    });
    return width;
  };

  let barWidth = await getBarWidth();
  expect(barWidth).toMatch('0px');

  await page.getByLabel('skip forward').click();

  barWidth = await getBarWidth();
  expect(barWidth).not.toMatch('0px');
});

test("time updates accordingly when forward button clicked", async ({ page }) => {
  await page.goto('/track/10');
  await page.getByLabel('skip forward').click();
  const currentTime = await page.getByLabel('time elapsed').evaluate(el => el.innerText);
  expect(currentTime).toMatch('00:10');
});

test('time and progress bar resets to initial value when reload button is clicked', async ({ page }) => {
  await page.goto('/track/10');
  await page.getByLabel('skip forward').click();
  await page.getByLabel('reload').click();

  const currentTime = await page.getByLabel('time elapsed').evaluate(el => el.innerText);
  expect(currentTime).toMatch('00:00');

  const bar = page.getByLabel('progress bar');
  const barWidth = await bar.evaluate((el) => {
    return window.getComputedStyle(el).getPropertyValue('width');
  });
  expect(barWidth).toMatch('0px');
})