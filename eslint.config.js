import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'
import * as mdx from 'eslint-plugin-mdx'
import prettierPlugin from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'

export default [
  {
    ignores: ['**/dist/**', '**/dev-dist/**', '**/node_modules/**', '**/coverage/**']
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'simple-import-sort': simpleImportSort,
      prettier: prettierPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      ...prettierConfig.rules
    }
  },

  // 3. MDX 特殊处理
  {
    files: ['**/*.mdx'],
    ...mdx.flat,
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: true
    }),
    plugins: {
      mdx,
      prettier: prettierPlugin
    },
    settings: {
      'mdx/code-blocks': true
    },
    rules: {
      'prettier/prettier': ['error', { parser: 'mdx' }],
      ...prettierConfig.rules
    }
  }
]
