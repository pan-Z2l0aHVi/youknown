import { RecordMeta } from '@/stores'
import { storage } from '@youknown/utils/src'

// Setting
interface LocalSettings {
	primary_color?: string
	radius?: number[]
	is_dark_theme?: boolean
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

// Records
const RECORDS_KEY = 'records'
export function set_local_records(records: RecordMeta[]) {
	storage.local.set(RECORDS_KEY, records)
}

export function get_local_records() {
	return storage.local.get<RecordMeta[]>(RECORDS_KEY) ?? []
}

export function remove_local_records() {
	return storage.local.remove(RECORDS_KEY)
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
