import tsParser from '@typescript-eslint/parser'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

import baseConfig from '../../eslint.config.js' // 引入你刚刚转换好的根目录配置

export default [
  ...baseConfig,
  // Vue 专用配置块
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
        ecmaVersion: 'latest',
        extraFileExtensions: ['.vue'],
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      vue: pluginVue
    },
    rules: {
      ...pluginVue.configs['flat/essential'].rules,
      'vue/multi-word-component-names': 'off'
    }
  },
  // React 专用配置块
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'react-hooks': pluginReactHooks
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/set-state-in-effect': 'warn'
    }
  }
]
