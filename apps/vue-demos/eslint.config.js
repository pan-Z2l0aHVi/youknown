import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

import baseConfig from '../../eslint.config.js'
// 读取自动导入生成的 JS 配置
import autoImportConfig from './.eslintrc-auto-import.js'

export default [
  // 1. 继承全局基础配置
  ...baseConfig,

  // 2. Vue 插件推荐配置 (ESLint 9 语法)
  ...pluginVue.configs['flat/essential'],

  {
    // 3. 针对 Vue 文件的特定配置
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser, // 使用 vue-eslint-parser 作为顶层解析器
      parserOptions: {
        parser: tsParser, // 在 vue-eslint-parser 内部使用 TS 解析器处理 <script>
        sourceType: 'module',
        ecmaVersion: 'latest',
        extraFileExtensions: ['.vue']
      },
      // 4. 合并 Auto-import 的 globals
      globals: {
        ...autoImportConfig.globals
      }
    },
    plugins: {
      vue: pluginVue,
      '@typescript-eslint': tsPlugin
    },
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  }
]
