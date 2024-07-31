const { expect } = require('@playwright/test');

class ProductsPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('span.title');
    this.addToCartButton = page.locator('//div[@class="inventory_item"][1]//button');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async verifyProductsHeader() {
    await expect(this.title).toHaveText('Products');
  }

  async addFirstItemToCart() {
    await this.addToCartButton.click();
  }

  async verifyItemInCart() {
    await expect(this.cartBadge).toHaveText('1');
    await this.cartLink.click();
  }
}

module.exports = ProductsPage;