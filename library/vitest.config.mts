import { defineConfig } from 'vitest/config';
import styleX from 'vite-plugin-stylex';

export default defineConfig({
  test: {
    typecheck: {
      include: ['**/*.test.ts'],
    },
    // ... Specify options here.
  },
  plugins: [styleX()],
});
