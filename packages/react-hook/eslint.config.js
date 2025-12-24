import reactHooks from 'eslint-plugin-react-hooks'

import baseConfig from '../../eslint.config.js' // 引入根目录的 Flat Config

export default [
  // 1. 展开基础配置
  ...baseConfig,
  {
    // 2. 针对特定文件类型应用规则
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'react-hooks': reactHooks
    },
    languageOptions: {
      // 这里的配置会合并到基础配置中
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: 'detect' // 自动检测 React 版本
      }
    },
    rules: {
      // 3. 注入插件推荐规则或自定义规则
      ...reactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/set-state-in-effect': 'warn'
    }
  }
]
