import { get_r2_signed_url } from '@/apis/bucket'
import { uuid } from '@youknown/utils/src'

interface UploadProgress {
	loaded: number
	total: number
	percent: number
}
interface Options {
	progress?(progress: UploadProgress): void
	complete?(url: string): void
	error?(err: any): void
}
export async function upload_cloudflare_r2(file: File, options?: Options) {
	const id = uuid()
	const key = `${id}/${file.name}`
	let signed_url = ''
	try {
		const { url } = await get_r2_signed_url({ key })
		signed_url = url
	} catch (err) {
		options?.error?.(err)
	}

	const xhr = new XMLHttpRequest()
	xhr.open('PUT', signed_url, true)
	xhr.setRequestHeader('Content-Type', file.type)
	xhr.upload.addEventListener('progress', event => {
		if (event.lengthComputable) {
			options?.progress?.({
				loaded: event.loaded,
				total: event.total,
				percent: (event.loaded / event.total) * 100
			})
		}
	})
	xhr.onload = () => {
		if (xhr.status === 200) {
			const r2_url = `${import.meta.env.VITE_CDN_BASE_URL}/${key}`
			options?.complete?.(r2_url)
		} else {
			options?.error?.(xhr.statusText)
		}
	}
	xhr.onerror = err => {
		options?.error?.(err)
	}
	xhr.send(file)
}
