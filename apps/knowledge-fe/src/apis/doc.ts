import { net } from '@/utils/request'

export interface Doc {
	doc_id: string
	content: string
	title: string
	cover: string
	author_id: string
	creation_time: string
	update_time: string
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
	cover?: string
}
export const create_doc = (payload: CreateDocPayload) =>
	net.fetch<Doc>('/proxy/doc/create', {
		method: 'post',
		payload
	})

interface UpdateDocPayload {
	doc_id: string
	content: string
	title?: string
	cover?: string
}
export const update_doc = (payload: UpdateDocPayload) =>
	net.fetch<Doc>('/proxy/doc/update', {
		method: 'post',
		payload
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
}
interface DocsResp {
	total: number
	list: Doc[]
}
export const get_docs = (params: DocsParams) =>
	net.fetch<DocsResp>('/proxy/doc/docs', {
		params
	})
