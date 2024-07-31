const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameField = page.locator('//input[@id="user-name"]');
      this.passwordField = page.locator('//input[@id="password"]');
      this.loginButton = page.locator('//input[@id="login-button"]');
      this.errorMessage = page.locator('h3[data-test="error"]');
    }

    async login(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
      }
    
      async verifyErrorMessage(expectedMessage) {
        await expect(this.errorMessage).toHaveText(expectedMessage);
      }
    }
    
    module.exports = LoginPage;