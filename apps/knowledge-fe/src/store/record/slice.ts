import { remove_local_records, get_local_records, set_local_records } from '@/utils/local'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const READ_FEED = 'read_feed'

export interface RecordMeta {
	action: string
	target: string
	target_id: string
	obj: string
	obj_type: string
	obj_id: string
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
		record(state, action: PayloadAction<RecordMeta>) {
			state.record_list.unshift(action.payload)

			const pre_records = get_local_records()
			set_local_records([action.payload, ...pre_records])
		},
		clear_records(state) {
			state.record_list = []
			remove_local_records()
		}
	}
})

export const { init_records, record, clear_records } = record_slice.actions
