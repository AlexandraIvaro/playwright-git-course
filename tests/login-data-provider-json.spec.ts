import { test, expect } from '@playwright/test';
import loginData from '../test-data/login.json';

test('login using data from JSON', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');

  await page
      .locator('[data-test="email"]')
      .fill(loginData[0].email);

    await page
      .locator('[data-test="password"]')
      .fill(loginData[0].password);

    await page
      .locator('[data-test="login-submit"]')
      .click();

  await expect(page).toHaveURL(/\/account/);
});
