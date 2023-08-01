import { net } from '@/utils/request'

interface Doc {
	doc_id: string
	content: string
	author_id: string
}

interface GetDocInfoParams {
	doc_id: string
}
export const get_doc_info = (params: GetDocInfoParams) =>
	net.fetch<Doc>('/proxy/doc/info', {
		params
	})

interface CreateDocPayload {
	doc_id: string
}
export const create_doc = (payload: CreateDocPayload) =>
	net.fetch<Doc>('/proxy/doc/create', {
		method: 'post',
		payload
	})
