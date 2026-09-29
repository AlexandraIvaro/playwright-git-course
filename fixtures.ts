import { test as base, expect, Page } from '@playwright/test';

class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(
      'https://practicesoftwaretesting.com/auth/login'
    );
  }

  async login(email: string, password: string): Promise<void> {
    await this.page
      .locator('[data-test="email"]')
      .fill(email);

    await this.page
      .locator('[data-test="password"]')
      .fill(password);

    await this.page
      .locator('[data-test="login-submit"]')
      .click();
  }
}

type Fixtures = {
  loggedInPage: Page;
};

export const test = base.extend<Fixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      'customer@practicesoftwaretesting.com',
      'welcome01'
    );

    await use(page);
  },
});

export { expect };
