import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  addItemToCart(itemName: string) {
    const slug = itemName.toLowerCase().replace(/\s+/g, '-');
    return this.page.locator(`[data-test="add-to-cart-${slug}"]`).click();
  }

  goToCart() {
    return this.cartLink.click();
  }
}
