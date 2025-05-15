import { test, expect } from '@playwright/test';

test.describe('Користувацькі сценарії для TodoMVC', () => {

  test('Сценарій 1: Додавання нової задачі', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    await page.getByPlaceholder('What needs to be done?').fill('Написати автотест');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    const items = page.locator('.todo-list li');
    await expect(items).toHaveCount(1);
    await expect(items.first()).toContainText('Написати автотест');
  });

  test('Сценарій 2: Позначення задачі як виконаної', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    await page.getByPlaceholder('What needs to be done?').fill('Завершити задачу');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    const checkbox = page.locator('.todo-list li .toggle');
    await checkbox.check();

    const completedItem = page.locator('.todo-list li.completed');
    await expect(completedItem).toHaveCount(1);
  });

  test('Сценарій 3: Видалення задачі', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    await page.getByPlaceholder('What needs to be done?').fill('Видалити цю задачу');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    const item = page.locator('.todo-list li');
    await item.hover();
    await item.locator('.destroy').click({ force: true });

    await expect(page.locator('.todo-list li')).toHaveCount(0);
  });

});
