import { configureStore } from '@reduxjs/toolkit'
import ui_slice from './ui/slice'
import user_slice from './user/slice'
import record_slice from './record/slice'
import modal_slice from './modal/slice'

const store = configureStore({
	reducer: {
		ui: ui_slice.reducer,
		user: user_slice.reducer,
		record: record_slice.reducer,
		modal: modal_slice.reducer
	}
})
export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
