import { get_profile, login as request_login } from '@/apis/user'
import { remove_local_token, set_local_token } from '@/utils/local'

import { AppDispatch } from '../'
import { login, logout, remove_profile, set_profile } from './slice'

export const do_login = (code: string) => async (dispatch: AppDispatch) => {
	const payload = {
		type: 1,
		code
	}
	try {
		const { token } = await request_login(payload)
		set_local_token(token)
		dispatch(login())
		dispatch(fetch_profile())
	} catch (error) {
		console.error('error: ', error)
	}
}

export const do_logout = () => (dispatch: AppDispatch) => {
	remove_local_token()
	dispatch(logout())
	dispatch(remove_profile())
}

export const fetch_profile = () => async (dispatch: AppDispatch) => {
	try {
		const profile = await get_profile()
		dispatch(login())
		dispatch(set_profile(profile))
	} catch (error) {
		console.error('error: ', error)
	}
}
