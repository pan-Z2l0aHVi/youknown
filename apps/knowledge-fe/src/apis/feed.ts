import { net } from '@/utils/request'

import { Profile } from './user'

export interface Feed {
	feed_id: string
	likes: {
		creation_time: string
		user_id: string
	}[]
	likes_count: number
	content: string
	summary: string
	title: string
	cover: string
	author_id: string
	space_id: string
	author_info: Profile
	creation_time: string
	update_time: string
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

export interface GetFeedDetailParams {
	feed_id: string
}
export const get_feed_detail = (params: GetFeedDetailParams) =>
	net.fetch<Feed & { collected: boolean }>('/proxy/feed/detail', {
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
