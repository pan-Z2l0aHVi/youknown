import { get_bucket_token } from '@/apis/bucket'
import { storage } from '@youknown/utils/src'
import type { QiniuError, QiniuNetworkError, QiniuRequestError } from 'qiniu-js'
import type { UploadProgress } from 'qiniu-js/esm/upload'

interface Options {
	progress?(progress: UploadProgress): void
	complete?(url: string): void
	error?(err: QiniuError | QiniuRequestError | QiniuNetworkError): void
}

export async function upload_file(file: File, options?: Options) {
	let token = storage.session.get('qiniu_token')
	if (!token) {
		try {
			const res = await get_bucket_token()
			token = res.token
			storage.session.set('qiniu_token', token)
		} catch (error) {
			console.error('get qiniu token error: ', error)
			return
		}
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
			const url = `${import.meta.env.VITE_CDN_URL}/${res.hash}`
			options?.complete?.(url)
		},
		error(err) {
			console.error('qiniu sdk error err: ', err)
			if (err.name === 'InvalidToken') {
				storage.session.remove('qiniu_token')
				upload_file(file, options)
				return
			}
			options?.error?.(err)
		}
	})
}
