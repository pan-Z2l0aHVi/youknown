import { create } from 'zustand'
import computed from 'zustand-computed'
import { devtools } from 'zustand/middleware'

import { change_i18n_lang } from '@/utils/i18n'
import { set_local_settings } from '@/utils/local'
import { checkDarkMode, checkMobile, delay, onDarkModeChange, onMobileChange, setRootStyle } from '@youknown/utils/src'

export const enum THEME {
	LIGHT = 1,
	DARK = 2,
	SYSTEM = 3
}
export const enum I18N_LANG {
	SYSTEM = 'system',
	ZH = 'zh',
	EN = 'en'
}
interface UIState {
	is_mobile: boolean
	progress_percent: number
	progress_visible: boolean
	primary_color: string
	radius: number[]
	theme: THEME
	i18n_lang: I18N_LANG
	set_is_mobile: (is_mobile: boolean) => void
	set_progress_percent: (percent: number) => void
	show_progress: () => void
	hide_progress: () => void
	start_progress: () => void
	stop_progress: () => Promise<void>
	set_hue: (hue: string) => Promise<void>
	set_radius: (radius: number[]) => void
	set_dark_theme: (theme: THEME) => void
	set_i18n_lang: (lang: I18N_LANG) => void
}

onDarkModeChange(() => {
	const { theme, set_dark_theme } = useUIStore.getState()
	if (theme === THEME.SYSTEM) {
		set_dark_theme(theme)
	}
})
onMobileChange(() => {
	const { set_is_mobile } = useUIStore.getState()
	set_is_mobile(checkMobile())
})

const computed_state = (state: UIState) => {
	const get_is_dark_theme = () => {
		switch (state.theme) {
			case THEME.SYSTEM:
				return checkDarkMode()
			case THEME.LIGHT:
				return false
			case THEME.DARK:
				return true
		}
	}
	return {
		is_dark_theme: get_is_dark_theme()
	}
}

let timer = 0
export const useUIStore = create<UIState>()(
	devtools(
		computed(
			(set, get) => ({
				is_mobile: checkMobile(),
				progress_percent: 0,
				progress_visible: false,
				primary_color: '#007aff',
				radius: [4, 8, 12],
				theme: THEME.SYSTEM,
				i18n_lang: I18N_LANG.SYSTEM,

				set_is_mobile: (is_mobile: boolean) =>
					set({
						is_mobile
					}),

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
					// Prevent batching update
					await delay(0)
					set_progress_percent(20)
					roll_step()
				},

				stop_progress: async () => {
					const { set_progress_percent, hide_progress } = get()
					// Prevent batching update
					await delay(0)
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

				set_dark_theme: theme => {
					set({ theme })
					set_local_settings({ theme })
					const root = document.querySelector<HTMLElement>(':root')
					if (!root) return

					if (get().is_dark_theme) {
						root.classList.add('dark-theme')
						root.classList.remove('light-theme')
					} else {
						root.classList.add('light-theme')
						root.classList.remove('dark-theme')
					}
				},

				set_i18n_lang: async lang => {
					if (lang === I18N_LANG.SYSTEM) {
						const system_lang = navigator.language.slice(0, 2)
						change_i18n_lang(system_lang)
					} else {
						change_i18n_lang(lang)
					}
					set({ i18n_lang: lang })
					set_local_settings({ i18n_lang: lang })
				}
			}),
			computed_state
		),
		{ store: 'ui' }
	)
)
