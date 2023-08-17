import { defineConfig, presetUno } from 'unocss'
import { presetScrollbar } from 'unocss-scrollbar-variant'

import presetRemToPx from '@unocss/preset-rem-to-px'

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
