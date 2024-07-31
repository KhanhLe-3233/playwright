const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.locator('#first-name');
    this.lastNameField = page.locator('#last-name');
    this.postalCodeField = page.locator('#postal-code');
    this.continueButton = page.locator('.cart_button');
    this.finishButton = page.locator('.btn_action.cart_button');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
  }

  async fillCheckoutForm(firstName, lastName, postalCode) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postalCodeField.fill(postalCode);
  }

  async verifyFormValues(firstName, lastName, postalCode) {
    await expect(this.firstNameField).toHaveValue(firstName);
    await expect(this.lastNameField).toHaveValue(lastName);
    await expect(this.postalCodeField).toHaveValue(postalCode);
  }

  async completeCheckout() {
    await this.continueButton.click();
    await this.finishButton.click();
  }

  async verifyThankYouMessage() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  }
}

module.exports = CheckoutPage;