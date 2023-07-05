<template>
	<div class="p-8px">
		<h1>Upload</h1>
		<input type="file" @change="handleFileChange" />
	</div>
</template>

<script setup lang="ts">
import { net } from '@/utils/request'
import { object2FormData, uuid } from '@youknown/utils/src'

const handleFileChange = (e: Event) => {
	const [file] = (e.target as HTMLInputElement).files ?? []
	console.log('file: ', file)
	const formData = object2FormData({
		name: file.name,
		uuid: uuid(),
		sign: 1688542695,
		file
	})
	net.fetch('/cdn/app/upload.php', {
		method: 'post',
		payload: formData
	}).then(res => {
		console.log('res: ', res)
	})
}
</script>
