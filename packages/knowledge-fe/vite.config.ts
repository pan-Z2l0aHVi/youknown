import { defineConfig, type PluginOption } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import react from '@vitejs/plugin-react-swc'
import Unocss from 'unocss/vite'
import { presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import { presetScrollbar } from 'unocss-scrollbar-variant'
import { resolve } from 'path'
import { shortcuts, theme } from '../../build/unocss'

export default defineConfig({
	base: '',
	plugins: [
		tsconfigPaths(),
		react(),
		Unocss({
			presets: [presetUno(), presetRemToPx(), presetScrollbar()],
			shortcuts: {
				...shortcuts
			},
			rules: [],
			theme: {
				...theme
			}
		}),
		visualizer() as PluginOption
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src')
		}
	},
	server: {}
})
