import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'
import * as mdx from 'eslint-plugin-mdx'
import prettierPlugin from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'

export default [
  // 1. 全局忽略设置 (替代旧版的 .eslintignore)
  {
    ignores: ['**/dist/**', '**/dev-dist/**', '**/node_modules/**', '**/coverage/**']
  },

  // 2. 基础通用配置 (替代 env, parserOptions)
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
      // 继承推荐规则的替代方案：手动解构或直接使用插件提供的 flat 配置
      ...tsPlugin.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,

      // 自定义规则
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',

      // 关闭与 Prettier 冲突的规则 (必须放在最后)
      ...prettierConfig.rules
    }
  },

  // 3. MDX 特殊处理 (替代旧版的 overrides)
  {
    files: ['**/*.mdx'],
    ...mdx.flat, // 使用 mdx 提供的扁平配置
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: true
    }),
    settings: {
      'mdx/code-blocks': true
    }
  }
]
