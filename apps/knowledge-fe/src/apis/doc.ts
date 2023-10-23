import { net } from '@/utils/request'

import { Profile } from './user'

export interface Doc {
	doc_id: string
	content: string
	summary: string
	title: string
	cover: string
	author_id: string
	author_info: Profile
	public: boolean
	creation_time: string
	update_time: string
}
export interface Draft {
	content: string
	summary: string
	creation_time: string
}

interface GetDocInfoParams {
	doc_id: string
}
export const get_doc_info = (params: GetDocInfoParams) =>
	net.fetch<Doc>('/proxy/doc/info', {
		params
	})

interface CreateDocPayload {
	title: string
	content?: string
	summary?: string
	cover?: string
}
export const create_doc = (payload: CreateDocPayload) =>
	net.fetch<Doc>('/proxy/doc/create', {
		method: 'post',
		payload
	})

interface UpdateDocPayload {
	doc_id: string
	content?: string
	summary?: string
	title?: string
	cover?: string
	public?: boolean
}
export const update_doc = (payload: UpdateDocPayload) =>
	net.fetch<Doc>('/proxy/doc/update', {
		method: 'post',
		payload,
		silent: true
	})

interface DeleteDocPayload {
	doc_ids: string[]
}
export const delete_doc = (payload: DeleteDocPayload) =>
	net.fetch<Doc>('/proxy/doc/delete', {
		method: 'post',
		payload
	})

interface DocsParams {
	page: number
	page_size: number
	author_id?: string
	keywords?: string
	sort_by?: string
	sort_type?: string
}
interface DocsResp {
	total: number
	list: Doc[]
}
export const search_docs = (params: DocsParams) =>
	net.fetch<DocsResp>('/proxy/doc/docs', {
		params
	})

interface GetDocDraftParams {
	doc_id: string
	page: number
	page_size: number
}
export const get_doc_drafts = (params: GetDocDraftParams) =>
	net.fetch<Draft[]>('/proxy/doc/drafts', {
		params
	})

interface UpdateDocDraftPayload {
	doc_id: string
	content: string
}
export const update_doc_draft = (payload: UpdateDocDraftPayload) =>
	net.fetch<Draft>('/proxy/doc/update_draft', {
		method: 'put',
		payload
	})
