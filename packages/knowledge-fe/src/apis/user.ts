import { net } from '@/utils'

interface Profile {
	user_id: string
	associated: number
	github_id: number
	nickname: string
	avatar: string
}

interface LoginPayload {
	user_id?: string
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
	type: 1 | 2
	code: string
}
export const get_profile = (params: GetProfileParams) =>
	net.fetch<Profile>('/proxy/user/profile', {
		params
	})
