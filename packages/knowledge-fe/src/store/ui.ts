import { set_local_settings } from '@/libs/local'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setRootStyle } from '@youknown/utils/src'

export interface UIState {
	progress_per: number
	progress_visible: boolean
	primary_color: string
	radius: number[]
	is_dark_theme: boolean
}

const initial_state: UIState = {
	progress_per: 0,
	progress_visible: false,
	primary_color: '',
	radius: [],
	is_dark_theme: false
}

export const ui_slice = createSlice({
	name: 'ui',
	initialState: initial_state,
	reducers: {
		set_progress_per: (state, action: PayloadAction<number>) => {
			state.progress_per = action.payload
		},
		show_progress: state => {
			state.progress_visible = true
		},
		hide_progress: state => {
			state.progress_visible = false
		},
		set_hue: (state, action: PayloadAction<UIState['primary_color']>) => {
			state.primary_color = action.payload

			set_local_settings({ primary_color: action.payload })
			setRootStyle({
				'--color-primary': action.payload
			})
			import('chroma-js').then(chroma => {
				setRootStyle({
					'--color-primary-hover': chroma.mix(action.payload, '#fff', 0.1).hex(),
					'--color-primary-active': chroma.mix(action.payload, '#000', 0.2).hex()
				})
			})
		},
		set_radius: (state, action: PayloadAction<UIState['radius']>) => {
			const [s, m, l] = (state.radius = action.payload)

			set_local_settings({ radius: action.payload })
			setRootStyle({
				'--radius-s': `${s}px`,
				'--radius-m': `${m}px`,
				'--radius-l': `${l}px`
			})
		},
		set_dark_theme: (state, action: PayloadAction<UIState['is_dark_theme']>) => {
			const is_dark = (state.is_dark_theme = action.payload)
			set_local_settings({ is_dark_theme: action.payload })
			const root = document.querySelector<HTMLElement>(':root')
			if (!root) return
			if (is_dark) {
				root.classList.add('dark-theme')
				root.classList.remove('light-theme')
			} else {
				root.classList.add('light-theme')
				root.classList.remove('dark-theme')
			}
		}
	}
})

export default ui_slice
export const { set_progress_per, show_progress, hide_progress, set_radius, set_hue, set_dark_theme } = ui_slice.actions
