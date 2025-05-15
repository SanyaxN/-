const { test, expect, request } = require('@playwright/test');

// --- Unit функції ---
function addTask(tasks, task) {
  if (!task) throw new Error('Task is empty');
  return [...tasks, task];
}

function removeTask(tasks, index) {
  if (index < 0 || index >= tasks.length) throw new Error('Index out of bounds');
  return tasks.filter((_, i) => i !== index);
}

function markTaskCompleted(tasks, index) {
  if (index < 0 || index >= tasks.length) throw new Error('Index out of bounds');
  return tasks.map((task, i) => i === index ? { ...task, completed: true } : task);
}

function getIncompleteTasks(tasks) {
  return tasks.filter(task => !task.completed);
}

function getCompletedTasks(tasks) {
  return tasks.filter(task => task.completed);
}

// --- Unit тести ---
test.describe('Unit тести для логіки Todo', () => {
  test('Додавання задачі', () => {
    expect(addTask([], 'Нова задача')).toEqual(['Нова задача']);
    expect(() => addTask([], '')).toThrow('Task is empty');
  });

  test('Видалення задачі', () => {
    expect(removeTask(['A', 'B'], 0)).toEqual(['B']);
    expect(() => removeTask(['A'], 5)).toThrow('Index out of bounds');
  });

  test('Позначення задачі виконаною', () => {
    const tasks = [{ text: 'A', completed: false }, { text: 'B', completed: false }];
    const updated = markTaskCompleted(tasks, 1);
    expect(updated[1].completed).toBe(true);
  });

  test('Отримання невиконаних задач', () => {
    const tasks = [{ text: 'A', completed: false }, { text: 'B', completed: true }];
    expect(getIncompleteTasks(tasks)).toEqual([{ text: 'A', completed: false }]);
  });

  test('Отримання виконаних задач', () => {
    const tasks = [{ text: 'A', completed: false }, { text: 'B', completed: true }];
    expect(getCompletedTasks(tasks)).toEqual([{ text: 'B', completed: true }]);
  });
});

// --- UI тести ---
test.describe('UI тести TodoMVC', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
  });

  test('Поле вводу відображається', async ({ page }) => {
    await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
  });

  test('Додавання задачі у список', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('Тест UI');
    await input.press('Enter');
    const tasks = page.locator('.todo-list li');
    await expect(tasks).toHaveCount(1);
    await expect(tasks.first()).toContainText('Тест UI');
  });

  test('Поява кнопки "Clear completed"', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('Задача');
    await input.press('Enter');
    await page.locator('.todo-list li .toggle').check();
    await expect(page.locator('button.clear-completed')).toBeVisible();
  });

  test('Фільтр Active показує активні задачі', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('Активна задача');
    await input.press('Enter');
    await page.click('text=Active');
    await expect(page.locator('.todo-list li')).toHaveCount(1);
  });

  test('Фільтр Completed показує виконані задачі', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('Виконана задача');
    await input.press('Enter');
    await page.locator('.todo-list li .toggle').check();
    await page.click('text=Completed');
    await expect(page.locator('.todo-list li')).toHaveCount(1);
  });
});

// --- API тести (httpbin.org) ---
test.describe('API тести з httpbin.org', () => {
  let apiContext;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext();
  });

  test('GET запит повертає 200', async () => {
    const response = await apiContext.get('https://httpbin.org/get');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.url).toBe('https://httpbin.org/get');
  });

  test('POST запит з JSON', async () => {
    const response = await apiContext.post('https://httpbin.org/post', {
      data: { name: 'Test', value: 123 }
    });
    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json.json.name).toBe('Test');
  });

  test('PUT запит', async () => {
    const response = await apiContext.put('https://httpbin.org/put', {
      data: { update: true }
    });
    expect(response.status()).toBe(200);
  });

  test('DELETE запит', async () => {
    const response = await apiContext.delete('https://httpbin.org/delete');
    expect(response.status()).toBe(200);
  });

  test('Перевірка заголовків відповіді', async () => {
    const response = await apiContext.get('https://httpbin.org/get');
    expect(response.headers()['content-type']).toContain('application/json');
  });
});

// --- E2E тести ---
test.describe('E2E тести TodoMVC', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
  });

  test('Додавання задачі', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('E2E тест');
    await input.press('Enter');
    const tasks = page.locator('.todo-list li');
    await expect(tasks).toHaveCount(1);
  });

  test('Відмітка задачі виконаною', async ({ page }) => {
    await page.getByPlaceholder('What needs to be done?').fill('E2E завершити');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.locator('.todo-list li .toggle').check();
    await expect(page.locator('.todo-list li.completed')).toHaveCount(1);
  });

  test('Видалення задачі', async ({ page }) => {
    await page.getByPlaceholder('What needs to be done?').fill('E2E видалити');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    const item = page.locator('.todo-list li');
    await item.hover();
    await item.locator('.destroy').click({ force: true });
    await expect(page.locator('.todo-list li')).toHaveCount(0);
  });

  test('Фільтрація Active', async ({ page }) => {
    await page.getByPlaceholder('What needs to be done?').fill('Активний E2E');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.click('text=Active');
    await expect(page.locator('.todo-list li')).toHaveCount(1);
  });

  test('Фільтрація Completed', async ({ page }) => {
    await page.getByPlaceholder('What needs to be done?').fill('Завершений E2E');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.locator('.todo-list li .toggle').check();
    await page.click('text=Completed');
    await expect(page.locator('.todo-list li')).toHaveCount(1);
  });
});
