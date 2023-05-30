import { defineConfig, type PluginOption } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

export default defineConfig({
	base: '',
	plugins: [tsconfigPaths(), react(), visualizer() as PluginOption],
	server: {},
	resolve: {
		alias: {
			'@editor': resolve(__dirname, 'editor-views'),
			'@ui': resolve(__dirname, 'ui-views')
		}
	}
})
