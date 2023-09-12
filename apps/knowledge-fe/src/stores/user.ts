import { create } from 'zustand'

import { get_profile, login as request_login } from '@/apis/user'
import { remove_local_token, set_local_token } from '@/utils/local'

interface Profile {
	user_id: string
	associated: number
	github_id: number
	nickname: string
	avatar: string
}
interface UserState {
	has_login: boolean
	login: () => void
	logout: () => void
	profile: Partial<Profile>
	set_profile: (profile: Partial<Profile>) => void
	remove_profile: () => void
	fetch_profile: () => Promise<void>
	do_login: (code: string) => Promise<void>
	do_logout: () => void
}

export const useUserStore = create<UserState>((set, get) => ({
	has_login: false,
	profile: {},

	set_profile: profile => set({ profile }),

	remove_profile: () => set({ profile: {} }),

	fetch_profile: async () => {
		const { login, set_profile } = get()
		try {
			const profile = await get_profile()
			login()
			set_profile(profile)
		} catch (error) {
			console.error('error: ', error)
		}
	},

	login: () => set({ has_login: true }),

	logout: () => set({ has_login: false }),

	do_login: async (code: string) => {
		const { login, fetch_profile } = get()
		const payload = {
			type: 1,
			code
		}
		try {
			const { token } = await request_login(payload)
			set_local_token(token)
			login()
			fetch_profile()
		} catch (error) {
			console.error('error: ', error)
		}
	},

	do_logout: () => {
		const { logout, remove_profile } = get()
		remove_local_token()
		logout()
		remove_profile()
	}
}))
