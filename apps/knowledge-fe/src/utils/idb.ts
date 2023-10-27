import { is } from '@youknown/utils/src'
import { getMany, keys, set, del, delMany, get } from 'idb-keyval'

export interface RecordValue {
	action: string
	target: string
	target_id: string
	obj: string
	obj_type: string
	obj_id: string
	id: string
	creation_time: Date
}

const RECORD_KEY = 'record'
const WALLPAPER_SEEN_KEY = 'wallpaper_seen'

async function get_record_keys() {
	const db_keys = await keys()
	return db_keys.filter(key => is.string(key) && key.startsWith(`${RECORD_KEY}/`))
}

export async function find_records() {
	const value = await getMany(await get_record_keys())
	const records = value.sort((a, b) => b.creation_time.getTime() - a.creation_time.getTime())
	return records
}

export async function insert_record(record: RecordValue) {
	await set(`${RECORD_KEY}/${record.id}`, record)
}

export async function delete_record(id: string) {
	await del(`${RECORD_KEY}/${id}`)
}

export async function clear_records() {
	await delMany(await get_record_keys())
}

export async function insert_wallpaper_seen(wallpaper_id: string) {
	await set(`${WALLPAPER_SEEN_KEY}/${wallpaper_id}`, new Date())
}

export async function find_wallpaper_seen(wallpaper_id: string) {
	return await get<Date>(`${WALLPAPER_SEEN_KEY}/${wallpaper_id}`)
}
