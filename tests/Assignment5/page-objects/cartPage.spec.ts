const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('.checkout_button');
    this.itemName = page.locator('.inventory_item_name');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async verifyItemIsVisible() {
    await expect(this.itemName).toBeVisible();
  }
}

module.exports = CartPage;