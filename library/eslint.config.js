// module.exports = {

//   ignorePatterns: ['.eslintrc.cjs'],
//   extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
// };

// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      typescript: tseslintPlugin,
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'error',
    },
  },
];
