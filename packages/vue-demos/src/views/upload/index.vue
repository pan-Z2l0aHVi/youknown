<template>
	<div class="p-8px">
		<input type="file" multiple @change="handleFileChange" />
	</div>
</template>

<script setup lang="ts">
import { net } from '@/utils/request'
import { object2FormData, storage } from '@youknown/utils/src'

let token: string = storage.session.get('cdn_token') ?? ''
const initCDNToken = async () => {
	if (token) return

	const data = await net.fetch<{
		token: string
	}>('/cdn/api/token', {
		method: 'post',
		payload: {
			email: '1350210100@qq.com',
			password: 'pb11568171',
			refresh: 0
		}
	})
	storage.session.set('cdn_token', data.token)
	token = data.token
}
initCDNToken().then(() => {
	getImages()
})

const uploadFile = async (file: File) => {
	const formData = object2FormData({
		image: file
	})
	const data = await net.fetch<{
		id: string
		md5: string
		mime: string
		name: string
		quota: string
		sha1: string
		size: number
		url: string
		use_quota: string
	}>('/cdn/api/upload', {
		method: 'post',
		payload: formData,
		headers: {
			'Content-Type': 'multipart/form-data',
			token
		}
	})
	console.log('res', data)
}

const getImages = async () => {
	const res = await net.fetch('/cdn/api/images', {
		method: 'post',
		headers: {
			token
		},
		payload: {
			page: 1
		}
	})
	console.log('res: ', res)
}

const handleFileChange = (e: Event) => {
	const files = (e.target as HTMLInputElement).files ?? new FileList()
	console.log('files: ', files)
	Array.from(files).forEach(uploadFile)
}
</script>
