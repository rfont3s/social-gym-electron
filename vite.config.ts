import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
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
      '@components': path.resolve(__dirname, './src/components'),
      '@components/*': path.resolve(__dirname, './src/components/*'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@pages/*': path.resolve(__dirname, './src/pages/*'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@hooks/*': path.resolve(__dirname, './src/hooks/*'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@contexts/*': path.resolve(__dirname, './src/contexts/*'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@assets/*': path.resolve(__dirname, './src/assets/*'),
      '@': path.resolve(__dirname, './src'),
    },
  },
})
