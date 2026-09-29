import * as fs from 'fs';

import { test, expect } from '../fixtures';

// ============================================================
// TASK 1 - Logged-in fixture
// ============================================================

test('authenticated user can open the account page', async ({
  loggedInPage,
}) => {
  await loggedInPage.goto(
    'https://practicesoftwaretesting.com/account'
  );

  await expect(loggedInPage).toHaveURL(/\/account/);
});

// ============================================================
// TASK 2 - All Playwright hooks
// ============================================================

test.describe('catalog hooks', () => {
  let suiteStartTime: number;

  test.beforeAll(() => {
    suiteStartTime = Date.now();

    console.log(
      `Catalog suite started at ${new Date(suiteStartTime).toISOString()}`
    );
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(
      'https://practicesoftwaretesting.com/'
    );
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await testInfo.attach('failure-screenshot', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    }
  });

  test.afterAll(() => {
    console.log(
      `Catalog suite finished at ${new Date().toISOString()}`
    );
  });

  test('catalog page loaded', async ({ page }) => {
    await expect(page).toHaveURL(
      'https://practicesoftwaretesting.com/'
    );
  });
});

// ============================================================
// TASK 3 - Login tests from CSV
// ============================================================

type LoginCase = {
  name: string;
  email: string;
  password: string;
  expectedResult: string;
};

// Read the CSV file.
const csv = fs.readFileSync(
  'test-data/login-cases.csv',
  'utf-8'
);

const lines = csv.trim().split('\n');

const [, ...dataRows] = lines;

const loginCases: LoginCase[] = dataRows.map((row) => {
  const [name, email, password, expectedResult] =
    row.split(',');

  return {
    name: name.trim(),
    email: email.trim(),
    password: password.trim(),
    expectedResult: expectedResult.trim(),
  };
});

for (const loginCase of loginCases) {
  test(
    `login - ${loginCase.name}`,
    async ({ page }) => {
      await page.goto(
        'https://practicesoftwaretesting.com/auth/login'
      );

      await page
        .locator('[data-test="email"]')
        .fill(loginCase.email);

      await page
        .locator('[data-test="password"]')
        .fill(loginCase.password);

      await page
        .locator('[data-test="login-submit"]')
        .click();

      if (loginCase.expectedResult === 'My account') {
        await expect(page).toHaveURL(/\/account/);
      } else {
        await expect(
          page.getByText('Invalid email or password')
        ).toBeVisible();
      }
    }
  );
}
