/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/global/components'),
      '@components/*': path.resolve(__dirname, './src/global/components/*'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@pages/*': path.resolve(__dirname, './src/pages/*'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@hooks/*': path.resolve(__dirname, './src/hooks/*'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@contexts/*': path.resolve(__dirname, './src/contexts/*'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@assets/*': path.resolve(__dirname, './src/assets/*'),
      '@schemas': path.resolve(__dirname, './src/schemas'),
      '@schemas/*': path.resolve(__dirname, './src/schemas/*'),
      '@config': path.resolve(__dirname, './src/config'),
      '@config/*': path.resolve(__dirname, './src/config/*'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@constants/*': path.resolve(__dirname, './src/constants/*'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@utils/*': path.resolve(__dirname, './src/utils/*'),
      '@controllers': path.resolve(__dirname, './src/controllers'),
      '@controllers/*': path.resolve(__dirname, './src/controllers/*'),
      '@views': path.resolve(__dirname, './src/views'),
      '@views/*': path.resolve(__dirname, './src/views/*'),
      '@test': path.resolve(__dirname, './src/test'),
      '@test/*': path.resolve(__dirname, './src/test/*'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    projects: [
      {
        name: 'unit',
        test: {
          globals: true,
          environment: 'jsdom',
          setupFiles: ['./src/test/setup.ts'],
          include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
