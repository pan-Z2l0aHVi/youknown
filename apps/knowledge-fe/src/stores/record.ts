import dayjs from 'dayjs'
import { create } from 'zustand'

import { get_local_records, remove_local_records, set_local_records } from '@/utils/local'
import { uuid } from '@youknown/utils/src'

export interface RecordMeta {
	action: string
	target: string
	target_id: string
	obj: string
	obj_type: string
	obj_id: string
	id: string
	timing: number
}

interface RecordState {
	record_list: RecordMeta[]
	recording: (record: Omit<RecordMeta, 'timing' | 'id'>) => void
	init_records: () => void
	clear_records: () => void
}

export const useRecordStore = create<RecordState>(set => ({
	record_list: [],

	recording: record =>
		set(state => {
			const record_item: RecordMeta = {
				...record,
				timing: dayjs().valueOf(),
				id: uuid()
			}
			const new_record_list = [record_item, ...state.record_list]
			set_local_records(new_record_list)
			return {
				record_list: new_record_list
			}
		}),

	init_records: () => set({ record_list: get_local_records() }),

	clear_records: () => {
		set({ record_list: [] })
		remove_local_records()
	}
}))
