import { resolve } from 'path'
import { defineConfig } from 'vite'
import styleInject from 'vite-plugin-css-injected-by-js'
import tsconfigPaths from 'vite-tsconfig-paths'

import react from '@vitejs/plugin-react'

export default defineConfig({
	base: '',
	plugins: [tsconfigPaths(), react(), styleInject()],
	resolve: {
		alias: {}
	},
	build: {
		target: 'es2015',
		lib: {
			formats: ['es'],
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'main',
			fileName: format => `main.${format}.js`
		},
		rollupOptions: {
			plugins: [],
			external: ['react']
		}
	}
})
