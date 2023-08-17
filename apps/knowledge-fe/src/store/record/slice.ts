import dayjs from 'dayjs'

import { get_local_records, remove_local_records, set_local_records } from '@/utils/local'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { uuid } from '@youknown/utils/src'

const READ_FEED = 'read_feed'

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
}

const initial_state: RecordState = {
	record_list: []
}

export const record_slice = createSlice({
	name: 'record',
	initialState: initial_state,
	reducers: {
		init_records(state) {
			state.record_list = get_local_records()
		},
		record(state, action: PayloadAction<Omit<RecordMeta, 'timing' | 'id'>>) {
			const record_item: RecordMeta = {
				...action.payload,
				timing: dayjs().valueOf(),
				id: uuid()
			}
			state.record_list.unshift(record_item)

			const pre_records = get_local_records()
			set_local_records([record_item, ...pre_records])
		},
		clear_records(state) {
			state.record_list = []
			remove_local_records()
		}
	}
})

export const { init_records, record, clear_records } = record_slice.actions
