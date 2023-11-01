import { net } from '@/utils/request'

export interface Profile {
	user_id: string
	associated: number
	github_id: number
	nickname: string
	avatar: string
}

export interface LoginPayload {
	type: number
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
