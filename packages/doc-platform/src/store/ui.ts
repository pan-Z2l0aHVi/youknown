import { set_local_settings } from '@/libs/local'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import chroma from 'chroma-js'

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

			const root = document.querySelector<HTMLElement>(':root')
			if (!root) return
			root.style.setProperty('--color-primary', action.payload)
			root.style.setProperty('--color-primary-hover', chroma.mix(action.payload, '#fff', 0.1).hex())
			root.style.setProperty('--color-primary-active', chroma.mix(action.payload, '#000', 0.2).hex())
		},
		set_radius: (state, action: PayloadAction<UIState['radius']>) => {
			const [s, m, l] = (state.radius = action.payload)
			set_local_settings({ radius: action.payload })

			const root = document.querySelector<HTMLElement>(':root')
			if (!root) return
			root.style.setProperty('--radius-s', `${s}px`)
			root.style.setProperty('--radius-m', `${m}px`)
			root.style.setProperty('--radius-l', `${l}px`)
		},
		set_dark_theme: (state, action: PayloadAction<UIState['is_dark_theme']>) => {
			const is_dark = (state.is_dark_theme = action.payload)
			set_local_settings({ is_dark_theme: action.payload })

			const root = document.querySelector<HTMLElement>(':root')
			if (!root) return
			root.style.setProperty('--bg-0', is_dark ? '#101014' : '#fff')
			root.style.setProperty('--bg-1', is_dark ? '#232429' : '#fff')
			root.style.setProperty('--bg-2', is_dark ? '#18181C' : '#f4f4f4')
			root.style.setProperty('--bg-3', is_dark ? '#303033' : '#eee')
			root.style.setProperty('--bd-line', is_dark ? '#424248' : '#dee0e3')
			root.style.setProperty('--scrollbar', is_dark ? '200,200,200' : '27,27,27')
			root.style.setProperty('--text-1', is_dark ? '#fff' : '#1f2329')
			root.style.setProperty('--text-2', is_dark ? '#ccc' : '#666')
			root.style.setProperty('--text-3', is_dark ? '#999' : '#999')
			root.style.setProperty('--shadow-l', is_dark ? '0 4px 14px rgba(0,0,0,0.25)' : '0 4px 14px rgba(0,0,0,0.1)')
			root.style.setProperty('--color-hover', is_dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)')
			root.style.setProperty('--color-active', is_dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)')

			root.style.setProperty('--color-danger', '#d52515')
			root.style.setProperty('--color-danger-hover', chroma.mix('#d52515', '#fff', 0.1).hex())
			root.style.setProperty('--color-danger-active', chroma.mix('#d52515', '#000', 0.2).hex())
		}
	}
})

export default ui_slice
export const { set_progress_per, show_progress, hide_progress, set_radius, set_hue, set_dark_theme } = ui_slice.actions
