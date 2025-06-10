import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    prettierRecommended,
    {
      plugins: {
        import: importPlugin,
        prettier: prettierPlugin
      },
      settings: {
        'import/resolver': { typescript: true }
      },
      ignores: ['eslint.config.mjs', 'dist', 'coverage'],
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname
        },
        globals: {
          ...globals.node,
          ...globals.jest
        }
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { fixStyle: 'inline-type-imports' }
        ],
        '@typescript-eslint/no-unsafe-argument': 'warn',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index'
            ],
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true }
          }
        ],
        'prettier/prettier': 'warn'
      }
    }
);
