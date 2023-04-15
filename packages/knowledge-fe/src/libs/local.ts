import { RecordMeta } from '@/store/record'
import { storage } from '@youknown/utils/src'

// Setting
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

// Records
const RECORDS_LOCAL_KEY = 'records'
export function set_local_records(records: RecordMeta[]) {
	storage.local.set(RECORDS_LOCAL_KEY, records)
}

export function get_local_records(): RecordMeta[] {
	return storage.local.get(RECORDS_LOCAL_KEY) ?? []
}

export function clear_local_records() {
	return storage.local.remove(RECORDS_LOCAL_KEY)
}
