import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'Microsoft Edge',
      use: {
        channel: 'msedge', // запуск через Edge
        headless: false,   // показує вікно браузера
      },
    },
  ],
});
