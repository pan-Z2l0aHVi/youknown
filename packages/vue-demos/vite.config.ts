import { defineConfig, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import { visualizer } from 'rollup-plugin-visualizer'
import Unocss from 'unocss/vite'
import { presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import { theme } from '../../build/unocss'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		eslintPlugin({
			include: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.vue', 'src/*.js', 'src/*.ts', 'src/*.vue']
		}),
		Unocss({
			presets: [presetUno(), presetRemToPx()],
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
	}
})
