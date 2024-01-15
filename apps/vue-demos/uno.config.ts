import { defineConfig, presetUno } from 'unocss'
import presetAutoprefixer from 'unocss-preset-autoprefixer'

import presetRemToPx from '@unocss/preset-rem-to-px'

import { theme } from '../../build/unocss'

export default defineConfig({
	presets: [presetUno(), presetAutoprefixer(), presetRemToPx()],
	rules: [],
	theme: {
		...theme
	}
})
