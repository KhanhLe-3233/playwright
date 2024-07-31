const { test, expect } = require('@playwright/test');

test('TC002 - Verify User Can Order Product', async ({ page }) => {
    
    // Step 1: Go to the URL and validate the "Products" header
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    //Log in
    await page.fill('//input[@id="user-name"]', 'standard_user');
    await page.fill('//input[@id="password"]', 'secret_sauce');
    await page.click('//input[@id="login-button"]');

    //Validate the "Products" header
    await expect(page.locator('span.title')).toHaveText('Products');
  
    // Step 2: Add the first item to the cart
    const firstAddToCartButton = page.locator('//div[@class="inventory_item"][1]//button');
    await firstAddToCartButton.click();
    
    // Validate the button text changed to "Remove" and there is '1' on the cart
    await expect(firstAddToCartButton).toHaveText('Remove');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  
    // Step 3: Click on the cart and validate pre-added item is visible
    await page.click('.shopping_cart_link');
    await expect(page.locator('.inventory_item_name')).toBeVisible();
  
    // Step 4: Click checkout, input all required fields
    await page.click('.checkout_button');
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '12345');
  
    // Validate the corresponding fields display input text
    await expect(page.locator('#first-name')).toHaveValue('John');
    await expect(page.locator('#last-name')).toHaveValue('Doe');
    await expect(page.locator('#postal-code')).toHaveValue('12345');
  
    // Step 5: Click Continue and validate checkout page has item added earlier
    await page.click('.cart_button');
    await expect(page.locator('.inventory_item_name')).toBeVisible();
  
    // Step 6: Click Finish and validate the thank you message
    await page.click('.btn_action.cart_button');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await expect(page.locator('.complete-text')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  });