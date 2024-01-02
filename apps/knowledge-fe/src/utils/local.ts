import { I18N_LANG, THEME } from '@/stores'
import { storage } from '@youknown/utils/src'

interface LocalSettings {
	primary_color?: string
	radius?: number[]
	theme?: THEME
	i18n_lang?: I18N_LANG
}

const SETTINGS_KEY = 'settings'
export function set_local_settings(newSettings: LocalSettings) {
	storage.local.set(SETTINGS_KEY, {
		...get_local_settings(),
		...newSettings
	})
}

export function get_local_settings() {
	return storage.local.get<LocalSettings>(SETTINGS_KEY) ?? {}
}

// AUTH TOKEN
const TOKEN_KEY = 'token'
export function set_local_token(token: string) {
	storage.local.set(TOKEN_KEY, token)
}

export function get_local_token() {
	return storage.local.get<string>(TOKEN_KEY)
}

export function remove_local_token() {
	return storage.local.remove(TOKEN_KEY)
}
