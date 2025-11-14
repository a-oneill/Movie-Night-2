import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.')
    }
  },
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html']
    },
    include: ['__tests__/**/?(*.)+(test|spec).[tj]s?(x)'],
    exclude: ['**/e2e/**', '**/node_modules/**']
  }
})