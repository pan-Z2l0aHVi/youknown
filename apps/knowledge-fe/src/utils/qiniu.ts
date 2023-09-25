import { get_bucket_token } from '@/apis/bucket'
import { storage } from '@youknown/utils/src'

import type { QiniuError, QiniuNetworkError, QiniuRequestError } from 'qiniu-js'
import type { UploadProgress } from 'qiniu-js/esm/upload'

const QINIU_TOKEN_KEY = 'qiniu_token'

interface Options {
	progress?(progress: UploadProgress): void
	complete?(url: string): void
	error?(err: QiniuError | QiniuRequestError | QiniuNetworkError): void
}

async function refresh_token() {
	try {
		const res = await get_bucket_token()
		const token = res.token
		storage.session.set(QINIU_TOKEN_KEY, token)
		return token
	} catch (error) {
		console.error('get qiniu token error: ', error)
		return refresh_token()
	}
}

export async function upload_file(file: File, options?: Options) {
	let token = storage.session.get<string>(QINIU_TOKEN_KEY)
	if (!token) {
		token = await refresh_token()
	}
	const qiniu = await import('qiniu-js')
	const observable = qiniu.upload(
		file,
		null,
		token,
		{},
		{
			useCdnDomain: true
		}
	)
	observable.subscribe({
		next(res) {
			console.log('qiniu sdk next res: ', res)
			options?.progress?.(res)
		},
		complete(res) {
			console.log('qiniu sdk complete res: ', res)
			const url = `${import.meta.env.VITE_CDN_BASE_URL}/${res.hash}`
			options?.complete?.(url)
		},
		error(err) {
			console.error('qiniu sdk error err: ', err)
			if (err.name) {
				storage.session.remove(QINIU_TOKEN_KEY)
				upload_file(file, options)
				return
			}
			options?.error?.(err)
		}
	})
}
