import { createSlice } from '@reduxjs/toolkit'

export interface ModalState {
	preferences_modal_open: boolean
	login_modal_open: boolean
}

const initial_state: ModalState = {
	preferences_modal_open: false,
	login_modal_open: false
}

export const modal_slice = createSlice({
	name: 'modal',
	initialState: initial_state,
	reducers: {
		open_preferences_modal: state => {
			state.preferences_modal_open = true
		},
		close_preferences_modal: state => {
			state.preferences_modal_open = false
		},
		open_login_modal: state => {
			state.login_modal_open = true
		},
		close_login_modal: state => {
			state.login_modal_open = false
		}
	}
})

export default modal_slice
export const { open_preferences_modal, close_preferences_modal, open_login_modal, close_login_modal } =
	modal_slice.actions
