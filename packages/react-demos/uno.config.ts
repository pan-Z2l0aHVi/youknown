import { defineConfig, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import { presetScrollbar } from 'unocss-scrollbar-variant'
import { shortcuts, theme } from '../../build/unocss'

export default defineConfig({
	presets: [presetUno(), presetRemToPx(), presetScrollbar()],
	shortcuts: {
		...shortcuts
	},
	rules: [],
	theme: {
		...theme
	}
})
