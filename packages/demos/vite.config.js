import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import { swcReactRefresh } from 'vite-plugin-swc-react-refresh'
import { resolve } from 'path'

export default defineConfig({
	base: '',
	plugins: [tsconfigPaths(), swcReactRefresh(), visualizer()],
	server: {},
	resolve: {
		alias: {
			'@editor': resolve(__dirname, 'editor-views'),
			'@ui': resolve(__dirname, 'ui-views')
		}
	}
})
