import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly productLinks: Locator;
  readonly productPrices: Locator;

  private readonly baseUrl = 'https://practicesoftwaretesting.com';

  constructor(page: Page) {
    this.page = page;

    this.cartLink = page
      .locator('a')
      .filter({
        has: page.locator('[data-icon="cart-shopping"]')
      });

    this.cartBadge = this.cartLink.locator('.badge');

    this.sortDropdown = page.locator('select');

    this.productLinks = page.locator('a.card-title');
    this.productPrices = page.locator('.card .price');
  }

  async goto(): Promise<void> {
    await this.page.goto(this.baseUrl);
  }

  async addItemToCart(productName: string): Promise<void> {
    const productCard = this.page
      .locator('.card')
      .filter({
        hasText: productName
      })
      .first();

    await productCard.click();

    await this.page
      .locator('[data-test="add-to-cart"]')
      .click();
  }

  async goToCart(): Promise<void> {
    await this.page
      .locator('[data-test="nav-cart"]')
      .click();
  }

  async removeItemFromCart(): Promise<void> {
  const productRows = this.page.locator('tbody tr');

  await productRows.first().locator('[class="btn btn-danger"]').click();
}

}
