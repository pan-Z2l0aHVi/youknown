import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Profile {
	UID: string
	nickname: string
	avatar: string
}
interface UserState {
	profile: Profile | null
	is_login: boolean
}

const initial_state: UserState = {
	profile: null,
	is_login: false
}

export const user_slice = createSlice({
	name: 'user',
	initialState: initial_state,
	reducers: {
		set_profile(state, action: PayloadAction<Profile>) {
			state.profile = action.payload
		},
		remove_profile(state) {
			state.profile = null
		},
		login(state) {
			state.is_login = true
		},
		logout(state) {
			state.is_login = false
		}
	}
})

export default user_slice
export const { set_profile, remove_profile, login, logout } = user_slice.actions
