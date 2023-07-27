import { configureStore } from '@reduxjs/toolkit'
import { ui_slice } from './ui'
import { user_slice } from './user'
import { record_slice } from './record'
import { modal_slice } from './modal'

const store = configureStore({
	reducer: {
		ui: ui_slice.reducer,
		user: user_slice.reducer,
		record: record_slice.reducer,
		modal: modal_slice.reducer
	}
})
export default store

// Infer the `AppGetState`, `RootState` and `AppDispatch` types from the store itself
export type AppGetState = typeof store.getState
export type RootState = ReturnType<AppGetState>
export type AppDispatch = typeof store.dispatch
