import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      shared: path.resolve(__dirname, 'packages/shared/src'),
      'shared/append-only-integrity': path.resolve(__dirname, 'packages/shared/src/append-only-integrity'),
      'shared/hmac': path.resolve(__dirname, 'packages/shared/src/hmac'),
    },
  },
});
