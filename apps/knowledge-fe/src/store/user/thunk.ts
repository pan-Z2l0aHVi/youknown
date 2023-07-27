import { get_profile, login as request_login } from '@/apis/user'
import { set_local_token } from '@/libs/local'
import { AppDispatch } from '..'
import { login, set_profile } from './slice'

export const do_login = (code: string) => async (dispatch: AppDispatch) => {
	const payload = {
		type: 1,
		code
	}
	try {
		const { token } = await request_login(payload)
		set_local_token(token)
		dispatch(login())
	} catch (error) {
		console.error('error: ', error)
	}
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
