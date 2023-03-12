import { resolve } from 'path'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import styleInject from 'vite-plugin-css-injected-by-js'

export default defineConfig({
	base: '',
	plugins: [tsconfigPaths(), react(), styleInject()],
	build: {
		lib: {
			formats: ['es'],
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'main',
			fileName: format => `main.${format}.js`
		},
		rollupOptions: {
			plugins: [],
			external: ['react', 'react-dom']
		}
	}
})
