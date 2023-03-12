import { storage } from '@youknown/utils/src'

interface LocalSettings {
	primary_color?: string
	radius?: number[]
	is_dark_theme?: boolean
}

const SETTINGS_LOCAL_KEY = 'settings'
export function set_local_settings(newSettings: LocalSettings) {
	storage.local.set(SETTINGS_LOCAL_KEY, {
		...get_local_settings(),
		...newSettings
	})
}

export function get_local_settings(): LocalSettings {
	return storage.local.get(SETTINGS_LOCAL_KEY) ?? {}
}
