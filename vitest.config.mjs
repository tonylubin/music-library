import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
 
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.js',
    exclude: [...configDefaults.exclude, '**/e2e/**']
  },
  resolve: {
    alias: {
      '@/': new URL('./', import.meta.url).pathname
    }
  }
})