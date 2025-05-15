// PLAYWRIGHT 
const { test: pwTest, expect: pwExpect } = require('@playwright/test');

pwTest('Playwright: додаємо задачу', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  await page.getByPlaceholder('What needs to be done?').fill('Playwright тест');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await pwExpect(page.locator('.todo-list li')).toHaveCount(1);
});

// SELENIUM 
const { Builder, By, Key, until } = require('selenium-webdriver');

async function runSeleniumTest() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://demo.playwright.dev/todomvc');
    let input = await driver.findElement(By.css('input[placeholder="What needs to be done?"]'));
    await input.sendKeys('Selenium тест', Key.RETURN);
    await driver.wait(until.elementLocated(By.css('.todo-list li')), 5000);
    let items = await driver.findElements(By.css('.todo-list li'));
    if (items.length === 1) {
      console.log('Selenium: тест пройшов');
    } else {
      console.log('Selenium: тест не пройшов');
    }
  } finally {
    await driver.quit();
  }
}
