import { LOGIN_TYPE } from '@/consts'
import { net } from '@/utils/request'

export interface Profile {
	user_id: string
	associated: number
	github_id: number
	nickname: string
	avatar: string
}

export interface LoginPayload {
	type: LOGIN_TYPE
	code: string
}
export const login = (payload: LoginPayload) =>
	net.fetch<
		Profile & {
			token: string
		}
	>('/proxy/user/sign_in', {
		method: 'post',
		payload
	})

export interface GetProfileParams {
	user_id?: string
}
export const get_profile = (params?: GetProfileParams) =>
	net.fetch<Profile>('/proxy/user/profile', {
		params
	})

export const get_yd_qrcode = () =>
	net.fetch<{
		qrcode_url: string
		temp_user_id: string
	}>('/proxy/user/yd_qrcode')

export interface CheckYDLoginStatusParams {
	temp_user_id: string
}
export const check_yd_login_status = (params?: CheckYDLoginStatusParams) =>
	net.fetch<{
		has_login: boolean
	}>('/proxy/user/yd_login_status', {
		params
	})
