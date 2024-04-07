import { defineConfig } from 'vitest/config';
import styleX from 'vite-plugin-stylex';

export default defineConfig({
  test: {
    // ... Specify options here.
  },
  plugins: [styleX()],
});
