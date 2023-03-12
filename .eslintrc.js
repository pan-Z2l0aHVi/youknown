module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['react-hooks'],
	extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
	env: {
		node: true,
		browser: true
	},
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	settings: {
		react: {
			versions: 'detect'
		}
	},
	rules: {
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error'
	}
}
