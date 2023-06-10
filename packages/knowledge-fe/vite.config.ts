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
						'scrollbar:w-4px scrollbar:h-4px scrollbar-thin scrollbar-thumb:rounded hover:scrollbar-thumb:bg-[rgba(var(--ui-scrollbar),0.4)]'
				}
			],
			rules: [],
			theme: {
				colors: {
					text: {
						1: 'var(--ui-text-1)',
						2: 'var(--ui-text-2)',
						3: 'var(--ui-text-3)'
					},
					hover: 'var(--ui-color-hover)',
					active: 'var(--ui-color-active)',
					primary: 'var(--ui-color-primary)',
					danger: 'var(--ui-color-danger)',
					bd: {
						line: 'var(--ui-bd-line)'
					},
					bg: {
						0: 'var(--ui-bg-0)',
						1: 'var(--ui-bg-1)',
						2: 'var(--ui-bg-2)',
						3: 'var(--ui-bg-3)'
					}
				},
				borderRadius: {
					round: '999vmax',
					'radius-s': 'var(--ui-radius-s)',
					'radius-m': 'var(--ui-radius-m)',
					'radius-l': 'var(--ui-radius-l)'
				},
				boxShadow: {
					'shadow-s':
						'0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
					'shadow-m': 'var(--ui-shadow-m)',
					'shadow-l': 'var(--ui-shadow-l)'
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
