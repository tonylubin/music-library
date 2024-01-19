import { test, expect } from '@playwright/test';

  
test.beforeEach(async ({ page }) => {
  await page.goto('/playlists/example')
})

test('displays playlist name', async ({ page }) => {
  await expect(page.getByText('example')).toBeVisible()
});

test('displays correct number of tracks in playlist', async ({ page }) => {
  let trackNumbers = await page.getByTestId('track').all();
  expect(trackNumbers).toHaveLength(4);
});

test('on hover track is highlighted red and displays play button', async ({ page }) => {
  let track = page.getByTestId('track').nth(0);
  await track.hover();
  await expect(track).toHaveCSS('background-color', 'rgb(214, 55, 74)');
  await expect(page.getByRole('button', { name: 'Play', exact: true }).nth(0)).toBeVisible();
});

test('clicking on track info play button displays pause button', async ({ page }) => {
  let trackArray = await page.getByTestId('track').all();
  let track = trackArray[0];
  await track.hover();
  await track.getByRole('button', { name: 'Play', exact: true }).click();
  await expect(track.getByRole('button', { name: 'Pause', exact: true })).toBeVisible();
});

test('clicking on track info play should only change to pause on clicked track', async ({page}) => {
  const track = page.getByTestId('track').nth(0);
  await track.hover();
  await track.getByRole('button', { name: 'Play', exact: true }).click();
  await expect(track.getByRole('button', { name: 'Pause', exact: true })).toBeVisible();
  // Checking rest of tracks on hover
  const tracks = await page.getByTestId('track').all();
  for (let i = 1; i < tracks.length; i++) {
    await tracks[i].hover();
    await expect(tracks[i].getByRole('button', {name: 'Pause'})).not.toBeVisible();
  }
});

test('clicking play loads track in mini player', async ({ page }) => {
  const track = page.getByTestId('track').nth(0);
  await track.hover();
  await track.getByRole('button', { name: 'Play', exact: true }).click();
  expect(await page.getByRole('button', {name: 'Pause'}).all()).toHaveLength(2);
  expect(await page.getByText('alabama blues').all()).toHaveLength(2);
});

test("clicking 'next track'/'prev track' plays following/preceeding playlist track", async ({ page }) => {
  const track = page.getByTestId('track');
  // next track
  await track.nth(0).hover();
  await track.nth(0).getByRole('button', { name: 'Play', exact: true }).click();
  await page.getByRole('button', {name: 'next track', exact: true }).click();
  await expect(track.nth(1)).toHaveCSS('background-color', 'rgba(214, 55, 74, 0.6)');
  // previous track
  await page.getByRole('button', {name: 'previous track', exact: true }).click();
  await expect(track.nth(0)).toHaveCSS('background-color', 'rgba(214, 55, 74, 0.6)');
  await expect(track.nth(1)).not.toHaveCSS('background-color', 'rgba(214, 55, 74, 0.6)');
})