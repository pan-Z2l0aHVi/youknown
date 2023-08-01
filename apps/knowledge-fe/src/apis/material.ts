import { net } from '@/utils/request'

interface Material {
	material_id: string
	type: number
	content: string
	name: string
	uploader_id: string
}

interface MaterialSearchParams {
	page: number
	page_size: number
	type: number
	keywords: string
}
type MaterialSearchRes = {
	total: number
	list: Material[]
}
export const search_material = (params: MaterialSearchParams) =>
	net.fetch<MaterialSearchRes>('/proxy/material/search', {
		params
	})

interface GetMaterialInfoParams {
	material_id: string
}
export const get_material_info = (params: GetMaterialInfoParams) =>
	net.fetch<Material>('/proxy/material/info', {
		params
	})

interface UploadMaterialPayload {
	type: number
	url: string
}
export const upload_material = (payload: UploadMaterialPayload) =>
	net.fetch<Material>('/proxy/material/upload', {
		payload
	})
