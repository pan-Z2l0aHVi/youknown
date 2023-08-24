import { net } from '@/utils/request'

import { Profile } from './user'

export interface Feed {
	feed_id: string
	likes_count: number
	content: string
	title: string
	cover: string
	author_id: string
	author_info: Profile
	creation_time: string
	update_time: string
}

interface GetFeedListParams {
	page: number
	page_size: number
	list_type?: 1 | 2
}
interface FeedListResp {
	total: number
	list: Feed[]
}
export const get_feed_list = (params: GetFeedListParams) =>
	net.fetch<FeedListResp>('/proxy/feed/list', {
		params
	})
