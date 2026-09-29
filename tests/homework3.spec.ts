import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

test.describe('Toolshop shopping cart', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    const email = 'customer@practicesoftwaretesting.com';
    const password = 'welcome01';

    await loginPage.goto();
    await loginPage.login(email, password);
  });

  test('Adding item', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    await homePage.addItemToCart('Combination Pliers');
    await homePage.goto();

    await homePage.addItemToCart('Bolt Cutters');
    await homePage.goToCart();

    await expect(homePage.cartBadge).toHaveText('2');
  });

  test('Removing item', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();

  await homePage.addItemToCart('Combination Pliers');

  await homePage.goto();

  await homePage.addItemToCart('Bolt Cutters');

  await homePage.goToCart();

  const productsBefore = await page.locator('tbody tr').count();

  expect(productsBefore).toBe(6);

  await homePage.removeItemFromCart();

  const productsAfter = await page.locator('tbody tr').count();

  expect(productsAfter).toBe(1);
});
});