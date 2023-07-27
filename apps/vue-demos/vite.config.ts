import { defineConfig, loadEnv, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import { visualizer } from 'rollup-plugin-visualizer'
import Unocss from 'unocss/vite'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd())
	return {
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
		},
		server: {
			host: '0.0.0.0',
			open: true,
			cors: true,
			proxy: {
				'/proxy': {
					target: env.VITE_PROXY_URL,
					changeOrigin: true,
					secure: false,
					rewrite: path => path.replace(/^\/proxy/, '')
				},
				'/cdn': {
					target: env.VITE_CDN_URL,
					changeOrigin: true,
					secure: false,
					rewrite: path => path.replace(/^\/cdn/, '')
				}
			}
		}
	}
})
