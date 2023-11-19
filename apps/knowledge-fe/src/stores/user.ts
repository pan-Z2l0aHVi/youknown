import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { get_profile, login as request_login, Profile } from '@/apis/user'
import { remove_local_token, set_local_token } from '@/utils/local'
import { with_api } from '@/utils/request'

interface UserState {
	has_login: boolean
	login: () => void
	logout: () => void
	profile: Profile | null
	set_profile: (profile: Profile) => void
	remove_profile: () => void
	fetch_profile: () => Promise<void>
	do_login: (code: string) => Promise<void>
	do_logout: () => void
}

export const useUserStore = create<UserState>()(
	devtools(
		(set, get) => ({
			has_login: false,
			profile: null,

			set_profile: profile => set({ profile }),

			remove_profile: () => set({ profile: null }),

			fetch_profile: async () => {
				const { login, set_profile } = get()
				const [err, res] = await with_api(get_profile)()
				if (err) {
					return
				}
				login()
				set_profile(res)
			},

			login: () => set({ has_login: true }),

			logout: () => set({ has_login: false }),

			do_login: async (code: string) => {
				const { login, fetch_profile } = get()
				const payload = {
					type: 1,
					code
				}
				const [err, res] = await with_api(request_login)(payload)
				if (err) {
					return
				}
				set_local_token(res.token)
				login()
				fetch_profile()
			},

			do_logout: () => {
				const { logout, remove_profile } = get()
				remove_local_token()
				logout()
				remove_profile()
			}
		}),
		{ store: 'user' }
	)
)
