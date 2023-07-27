import { defineConfig, loadEnv, type PluginOption } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import Unocss from 'unocss/vite'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd())
	return {
		base: '',
		plugins: [tsconfigPaths(), react(), Unocss(), visualizer() as PluginOption],
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
