import { create } from 'zustand'

import { set_local_settings } from '@/utils/local'
import { delay, setRootStyle, storage } from '@youknown/utils/src'

interface UIState {
	progress_percent: number
	progress_visible: boolean
	primary_color: string
	radius: number[]
	is_dark_theme: boolean
	sidebar_expand: boolean
	set_progress_percent: (percent: number) => void
	show_progress: () => void
	hide_progress: () => void
	start_progress: () => void
	stop_progress: () => Promise<void>
	set_hue: (hue: string) => Promise<void>
	set_radius: (radius: number[]) => void
	set_dark_theme: (is_dark: boolean) => void
	toggle_sidebar_expand: () => void
}
export const EXPAND_KEY = 'sidebar-expand'

let timer = 0

export const useUIStore = create<UIState>((set, get) => ({
	progress_percent: 0,
	progress_visible: false,
	primary_color: '',
	radius: [],
	is_dark_theme: false,
	sidebar_expand: storage.local.get<boolean>(EXPAND_KEY) ?? true,

	set_progress_percent: percent =>
		set({
			progress_percent: percent
		}),

	show_progress: () => set({ progress_visible: true }),

	hide_progress: () => set({ progress_visible: false }),

	start_progress: async () => {
		const { show_progress, set_progress_percent } = get()
		const roll_delay = () => {
			const duration = Math.random() * 1500 + 500
			return delay(duration)
		}
		const roll_step = async () => {
			const { progress_percent, progress_visible } = get()
			const next_per = Math.min(progress_percent + Math.round(Math.random() * 20))
			if (next_per > 95 || !progress_visible) {
				return
			}
			set_progress_percent(next_per)
			await roll_delay()
			roll_step()
		}
		set_progress_percent(0)
		show_progress()
		await delay(0) // Prevent batching update
		roll_step()
	},

	stop_progress: async () => {
		const { set_progress_percent, hide_progress } = get()
		set_progress_percent(100)
		clearTimeout(timer)
		timer = await delay(300)
		hide_progress()
	},

	set_hue: async hue => {
		set({ primary_color: hue })
		set_local_settings({ primary_color: hue })
		setRootStyle({
			'--ui-color-primary': hue
		})
		const { mix } = await import('chroma-js')
		setRootStyle({
			'--ui-color-primary-hover': mix(hue, '#fff', 0.1).hex(),
			'--ui-color-primary-active': mix(hue, '#000', 0.2).hex()
		})
	},

	set_radius: radius => {
		set({ radius })
		set_local_settings({ radius })
		const [s, m, l] = radius
		setRootStyle({
			'--ui-radius-s': `${s}px`,
			'--ui-radius-m': `${m}px`,
			'--ui-radius-l': `${l}px`
		})
	},

	set_dark_theme: is_dark => {
		set({ is_dark_theme: is_dark })
		set_local_settings({ is_dark_theme: is_dark })
		const root = document.querySelector<HTMLElement>(':root')
		if (!root) return
		if (is_dark) {
			root.classList.add('dark-theme')
			root.classList.remove('light-theme')
		} else {
			root.classList.add('light-theme')
			root.classList.remove('dark-theme')
		}
	},

	toggle_sidebar_expand: () =>
		set({
			sidebar_expand: !get().sidebar_expand
		})
}))
