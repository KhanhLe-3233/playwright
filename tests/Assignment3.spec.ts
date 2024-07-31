const { test, expect } = require('@playwright/test');

test('TC001 - Verify Checkboxes', async ({ page }) => {
   // Step 1: Go to the URL and navigate to Checkboxes page
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=Checkboxes');

  // Verify Checkboxes header title is displayed
  const header = await page.locator('h3');
  await expect(header).toHaveText('Checkboxes');

  // Step 2: Check 'checkbox1' and Uncheck 'checkbox2'
  const checkbox1 = page.locator('input[type="checkbox"]:nth-child(1)');
  const checkbox2 = page.locator('input[type="checkbox"]:nth-child(3)');

  await checkbox1.check();
  await checkbox2.uncheck();

  // Verify checkbox1 is checked and checkbox2 is unchecked
  await expect(checkbox1).toBeChecked();
  await expect(checkbox2).not.toBeChecked();

});

test('TC002 - Verify Drag and Drop', async ({ page }) => {
  // Step 1: Go to the URL and navigate to Drag and Drop page
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=Drag and Drop');

  // Verify Drag and Drop header title is displayed
  const header = await page.locator('h3');
  await expect(header).toHaveText('Drag and Drop');

  // Step 2: Perform Drag and Drop
  const columnA = page.locator('#column-a');
  const columnB = page.locator('#column-b');
  await columnA.dragTo(columnB);

  // Verify Column A and Column B have switched places
  const newColumnA = await page.locator('#column-a header').innerText();
  const newColumnB = await page.locator('#column-b header').innerText();

  await expect(newColumnA).toBe('B');
  await expect(newColumnB).toBe('A');
});

test('TC003 - Verify Dropdown', async ({ page }) => {
  // Step 1: Go to the URL and navigate to Dropdown page
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=Dropdown');

  // Verify Dropdown List header title is displayed
  const header = await page.locator('h3');
  await expect(header).toHaveText('Dropdown List');

  // Step 2: Select item by label 'Option 2'
  await page.selectOption('#dropdown', { label: 'Option 2' });
  let selectedOption = await page.$eval('#dropdown', el => el.value);
  await expect(selectedOption).toBe('2');

  // Step 3: Select item by index 1
  await page.selectOption('#dropdown', { index: 1 });
  selectedOption = await page.$eval('#dropdown', el => el.value);
  await expect(selectedOption).toBe('1');

  // Step 4: Select item by value 2
  await page.selectOption('#dropdown', { value: '2' });
  selectedOption = await page.$eval('#dropdown', el => el.value);
  await expect(selectedOption).toBe('2');
});

test('TC004 - Verify Frames', async ({ page }) => {
  // Step 1: Go to the URL and navigate to WYSIWYG Editor page
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=WYSIWYG Editor');

  // Verify iFrame containing TinyMCE WYSIWYG Editor title is displayed
  const header = await page.locator('h3');
  await expect(header).toHaveText('An iFrame containing the TinyMCE WYSIWYG Editor');

  // Step 2: Verify the default content
  const frame = page.frameLocator('iframe[id="mce_0_ifr"]');
  const body = frame.locator('body p');
  await expect(body).toHaveText('Your content goes here.');

  // Step 3: Set new content
  await frame.locator('body').fill('Hello, how are you?');
  await expect(body).toHaveText('Hello, how are you?');
});

test('TC004 - Verify Frames (alternative)', async ({ page }) => {
  // Step 1: Go to the URL
  await page.goto('https://www.globalsqa.com/demo-site/frames-and-windows/');

  // Verify page with 'Frames And Windows' text is shown
  await expect(page.locator('h1')).toHaveText('Frames And Windows');

  // Step 2: Click "Iframe" on the tab list
  await page.click('text=IFrame');

  // Step 3: Input "Playwright" in the search bar inside the iframe
  const frame = page.frameLocator('iframe[name="globalSqa"]');
  await frame.locator('input[name="s"]').fill('Playwright');

  // Step 4: Click the search icon
  await frame.locator('button.button_search').click();

  // Verify the message
  const message = frame.locator('ol.search_res p');
  await expect(message).toHaveText('Sorry, no posts matched your criteria.');
});

const path = require('path');
test('TC005 - Verify Upload File', async ({ page }) => {
  // Step 1: Go to the URL and navigate to File upload page
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=File Upload');

  // Verify File Uploader header is shown
  const header = await page.locator('h3');
  await expect(header).toHaveText('File Uploader');

  // Step 2: Select file and click upload
  const filePath = path.resolve('file.txt');
  await page.setInputFiles('input[type="file"]', filePath);
  await page.click('#file-submit');

  // Verify the message containing the file name is shown
  const uploadedFileName = path.basename(filePath);
  await expect(page.locator('#uploaded-files')).toHaveText(uploadedFileName);
});

test('TC006 - Verify Dynamically Loaded Page Elements', async ({ page }) => {
  // Step 1: Go to the URL and navigate to Dynamic Loading page
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=Dynamic Loading');

  // Verify Dynamically Loaded Page Elements header is shown
  const header = await page.locator('h3');
  await expect(header).toHaveText('Dynamically Loaded Page Elements');

  // Step 2: Go to example 1 page
  await page.click('text=Example 1');

  // Verify header is shown
  await expect(header).toHaveText('Dynamically Loaded Page Elements');

  // Step 3: Verify the message after clicking "Start"
  await page.click('button');
  await page.waitForSelector('#finish');
  const message = await page.locator('#finish h4');
  await expect(message).toHaveText('Hello World!');
});

test('TC007 - Verify Input', async ({ page }) => {
  // Step 1: Go to the URL
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Verify the header is displayed
  await expect(page.locator('h1[class="title"]')).toHaveText('Automation Testing Practice');

  // Step 2: Fill name
  await page.fill('//input[@id="name"]', 'John Doe');
  await expect(page.locator('//input[@id="name"]')).toHaveValue('John Doe');

  // Step 3: Fill address
  await page.fill('//textarea[@id="textarea"]', '1234 Test St');
  await expect(page.locator('//textarea[@id="textarea"]')).toHaveValue('1234 Test St');

  // Step 4: Clear name
  await page.locator('//input[@id="name"]').clear();
  await expect(page.locator('//input[@id="name"]')).toHaveValue('');

  // Step 5: Clear address
  await page.locator('//textarea[@id="textarea"]').clear();
  await expect(page.locator('//textarea[@id="textarea"]')).toHaveValue('');
});

test('TC008 - Verify Prompt Dialog', async ({ page }) => {
    // Step 1: Go to the URL
    await page.goto('https://testautomationpractice.blogspot.com/');
  
    // Verify the header is displayed
    await expect(page.locator('h1[class="title"]')).toHaveText('Automation Testing Practice');
  
    // Step 2: Handle the prompt dialog
    page.on('dialog', async dialog => {
      // Verify the prompt message and default value
      expect(dialog.message()).toBe('Please enter your name:');
      expect(dialog.defaultValue()).toBe('Harry Potter');
      
      // Accept the prompt with the name 'John Doe'
      await dialog.accept('John Doe');
    });
  
    // Click the "Prompt" button to trigger the prompt dialog
    await page.click('button[onclick="myFunctionPrompt()"]');
  
    // Step 3: Verify the resulting message after accepting the prompt
    await expect(page.locator('#demo')).toHaveText("Hello John Doe! How are you today?");
  });
