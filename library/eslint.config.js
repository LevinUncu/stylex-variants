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
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          minimumDescriptionLength: 0,
        },
      ],
      '@typescript-eslint/consistent-type-definitions': 'error',
    },
  },
];
