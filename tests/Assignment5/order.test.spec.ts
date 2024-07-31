const { test } = require('@playwright/test');
const LoginPage = require('./page-objects/loginPage.spec.ts');
const ProductsPage = require('./page-objects/productsPage.spec.ts');
const CartPage = require('./page-objects/cartPage.spec.ts');
const CheckoutPage = require('./page-objects/checkoutPage.spec.ts');

test('TC002 - Verify User Can Order Product Successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  
  // Navigate to the login page and log in
  await page.goto('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');
  
  // Verify the "Products" header is visible
  await productsPage.verifyProductsHeader();
  
  // Add the first item to the cart and verify the cart badge
  await productsPage.addFirstItemToCart();
  await productsPage.verifyItemInCart();
  
  // Proceed to checkout
  await cartPage.proceedToCheckout();
  
  // Fill out the checkout form and verify the values
  await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
  await checkoutPage.verifyFormValues('John', 'Doe', '12345');
  
  // Complete the checkout process
  await checkoutPage.completeCheckout();
  
  // Verify the thank you message
  await checkoutPage.verifyThankYouMessage();
});