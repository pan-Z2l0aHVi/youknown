import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Profile {
	UID: string
	nickname: string
	avatar: string
}
interface Setting {
	theme: 'light' | 'dark'
	hues: 'random' | 'blue'
}
interface UserState {
	profile: Profile | null
	setting: Setting
}

const initial_state: UserState = {
	profile: null,
	setting: {
		theme: 'light',
		hues: 'blue'
	}
}

export const user_slice = createSlice({
	name: 'user',
	initialState: initial_state,
	reducers: {
		get_profile(state, action: PayloadAction<Profile>) {
			state.profile = action.payload
		},
		remove_profile(state) {
			state.profile = null
		}
	}
})

export default user_slice
export const { get_profile } = user_slice.actions
