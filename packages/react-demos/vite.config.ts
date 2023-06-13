import { defineConfig, type PluginOption } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import Unocss from 'unocss/vite'

export default defineConfig({
	base: '',
	plugins: [tsconfigPaths(), react(), Unocss(), visualizer() as PluginOption],
	server: {},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src')
		}
	}
})
