import { net } from '@/utils/request'

interface Profile {
	user_id: string
	associated: number
	github_id: number
	nickname: string
	avatar: string
}

interface LoginPayload {
	type: number
	code: string
}
type LoginRes = Profile & {
	token: string
}
export const login = (payload: LoginPayload) =>
	net.fetch<LoginRes>('/proxy/user/sign_in', {
		method: 'post',
		payload
	})

interface GetProfileParams {
	user_id?: string
}
export const get_profile = (params?: GetProfileParams) =>
	net.fetch<Profile>('/proxy/user/profile', {
		params
	})
