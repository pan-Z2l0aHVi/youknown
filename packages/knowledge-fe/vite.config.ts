import { defineConfig, type PluginOption } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import react from '@vitejs/plugin-react-swc'
import Unocss from 'unocss/vite'
import { presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import { presetScrollbar } from 'unocss-scrollbar-variant'
import { resolve } from 'path'

export default defineConfig({
	base: '',
	plugins: [
		tsconfigPaths(),
		react(),
		Unocss({
			presets: [presetUno(), presetRemToPx(), presetScrollbar()],
			shortcuts: [
				{
					'scrollbar-custom':
						'scrollbar:w-4px scrollbar:h-4px scrollbar-thin scrollbar-thumb:rounded hover:scrollbar-thumb:bg-[rgba(var(--scrollbar),0.4)]'
				}
			],
			rules: [],
			theme: {
				colors: {
					text: {
						1: 'var(--text-1)',
						2: 'var(--text-2)',
						3: 'var(--text-3)'
					},
					hover: 'var(--color-hover)',
					active: 'var(--color-active)',
					primary: 'var(--color-primary)',
					danger: 'var(--color-danger)',
					bd: {
						line: 'var(--bd-line)'
					},
					bg: {
						0: 'var(--bg-0)',
						1: 'var(--bg-1)',
						2: 'var(--bg-2)',
						3: 'var(--bg-3)'
					}
				},
				borderRadius: {
					round: '999vmax',
					'radius-s': 'var(--radius-s)',
					'radius-m': 'var(--radius-m)',
					'radius-l': 'var(--radius-l)'
				},
				boxShadow: {
					'shadow-s':
						'0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
					'shadow-m': 'var(--shadow-m)',
					'shadow-l': 'var(--shadow-l)'
				}
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
