import { net } from '@/utils/request'

import { Doc } from './doc'

export interface Feed {
	id: string
	creator_id: string
	creator: {
		id: string
		nickname: string
		avatar: string
	}
	subject_id: string
	subject_type: string
	subject: Doc
	likes: {
		creation_time: string
		user_id: string
		nickname: string
		avatar: string
	}[]
	likes_count: number
	creation_time: string
	update_time: string
	collected: boolean
}

export interface GetFeedListParams {
	page: number
	page_size: number
	keywords?: string
	sort_by?: 'creation_time' | 'update_time'
	sort_type?: 'desc' | 'asc'
	author_id?: string
}
export const get_feed_list = (params: GetFeedListParams) =>
	net.fetch<{
		total: number
		list: Feed[]
	}>('/proxy/feed/list', {
		params
	})

export interface GetFeedInfoParams {
	feed_id: string
}
export const get_feed_info = (params: GetFeedInfoParams) =>
	net.fetch<Feed>('/proxy/feed/info', {
		params
	})

export interface PraiseFeedPayload {
	event: 'like' | 'unlike'
	feed_id: string
}
export const praise_feed = (payload: PraiseFeedPayload) =>
	net.fetch('/proxy/feed/praise', {
		method: 'post',
		payload
	})
