import { defineConfig, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import { theme } from '../../build/unocss'

export default defineConfig({
	presets: [presetUno(), presetRemToPx()],
	rules: [],
	theme: {
		...theme
	}
})
