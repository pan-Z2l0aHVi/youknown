import { net } from '@/utils'

export const get_bucket_token = () =>
	net.fetch<{
		token: string
	}>('/proxy/bucket/token')
