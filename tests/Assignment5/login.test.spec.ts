const { test } = require('@playwright/test');
const LoginPage = require('./page-objects/loginPage.spec.ts');

test('TC001 - Verify Error Message Appears When Login with Invalid User', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/inventory.html');
  
  // Perform login with invalid user
  await loginPage.login('locked_out_user', 'secret_sauce');
  
  // Verify the error message
  await loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
});