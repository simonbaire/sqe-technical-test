import { test as base, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';

const test = base.extend<{
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
}>({
  loginPage: ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: ({ page }, use) => use(new InventoryPage(page)),
  cartPage: ({ page }, use) => use(new CartPage(page)),
  checkoutPage: ({ page }, use) => use(new CheckoutPage(page)),
});

/**
 * Scenario under test: standard checkout flow on Sauce Demo.
 * See ../../TEST_DESIGN.md for rationale and the additional scenarios
 * that would be automated with more time.
 */
test.describe('Sauce Demo - checkout flow', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(inventoryPage.inventoryList).toBeVisible();
  });

  test('standard user can add an item and complete checkout', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    // Add item
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // Go to cart
    await inventoryPage.goToCart();

    // Checkout
    await cartPage.checkout();
    await checkoutPage.fillInfo('John', 'Doe', '12345');

    // Complete order
    await checkoutPage.finish();

    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
});

test.describe('Sauce Demo - login', () => {
  // TODO
  // Negative Scenario
  // Approach: log in with an invalid username/password, expect the error message to show.
  // Rationale: Verifies correct credentials are used and appropriate error message is displayed.
  test.fixme('shows an error message for invalid credentials', async () => {});

  // TODO
  // Negative Scenario
  // Approach: log in as locked_out_user, expect the "locked out" error message to show.
  // Rationale: Verifies locked users cant log in and ensures correct error is displayed.
  test.fixme('blocks a locked out user from logging in', async () => {});
});
