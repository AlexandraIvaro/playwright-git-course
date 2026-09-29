import { test, expect } from '@playwright/test';

test('Search for Pliers', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  const searchInput = page.getByRole('textbox', { name: 'Search' });
  await searchInput.dblclick();
  await searchInput.fill('Pliers');
  await expect(searchInput).toHaveValue('Pliers');
  await page.getByRole('button', { name: 'Search' }).click();
  const productTitles = page.locator('.card-title');
  await expect(productTitles).toHaveCount(4);
});




test('Filter the catalog to hammers', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  const hammerCheckbox = page.getByRole('checkbox', { name: 'Hammer' });
  await hammerCheckbox.check();
  await expect(hammerCheckbox).toBeChecked();
  const productTitles = page.locator('.card-title');
  await expect(productTitles).toHaveCount(7);
  await hammerCheckbox.uncheck();
  await expect(hammerCheckbox).not.toBeChecked();
});




test('Sort products by name A-Z', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  const sortDropdown = page.getByRole('combobox', { name: 'Sort' });

  await sortDropdown.selectOption({ label: 'Name (A - Z)' });
  const productTitles = page.locator('.card-title');
  await expect(productTitles).toHaveCount(9);
  await expect(productTitles.first()).toContainText('Adjustable Wrench');
  await expect(productTitles.first()).toHaveClass(/card-title/);
});




test('Inspect Combination Pliers and add two items to cart', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByText('Combination Pliers', { exact: true }).click();
  const productHeading = page.getByRole('heading', {
    level: 1,
    name: 'Combination Pliers',
  });
  await expect(productHeading).toBeVisible();
  const quantityInput = page.getByRole('spinbutton', {
    name: 'Quantity',
  });
  await expect(quantityInput).toHaveValue('1');
  await page.getByRole('button', {
    name: 'Increase quantity',
  }).click();
  await expect(quantityInput).toHaveValue('2');
  await page.getByRole('button', {
    name: 'Add to cart',
  }).click();
  const alert = page.getByRole('alert');
  await expect(alert).toContainText('Product added to shopping cart');
  const cartLink = page.getByRole('link', { name: /cart/i });
  await expect(cartLink).toBeVisible();
  await expect(cartLink).toContainText('2');
});

