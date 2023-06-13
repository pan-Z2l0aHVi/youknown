import { defineConfig, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import { visualizer } from 'rollup-plugin-visualizer'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		eslintPlugin({
			include: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.vue', 'src/*.js', 'src/*.ts', 'src/*.vue']
		}),
		Unocss(),
		visualizer() as PluginOption
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src')
		}
	}
})
