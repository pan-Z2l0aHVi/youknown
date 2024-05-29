<template>
  <div class="bg-#fff min-h-[calc(100vh-48px)] p-8px">
    <input class="mb-16px" type="file" multiple @change="handleFileChange" />
    <van-button @click="images = []">clear</van-button>

    <div class="mt-40px">
      <img v-for="image in images" :key="image" :src="image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storage } from '@youknown/utils/src'
import { ref } from 'vue'

import { net } from '@/utils/request'

let token: string = storage.session.get('cdn_token') ?? ''
const initCDNToken = async () => {
  if (token) return

  const data = await net.fetch<{
    token: string
  }>('/proxy/common/qiniu_token')
  storage.session.set('cdn_token', data.token)
  token = data.token
}
initCDNToken()

const images = ref<string[]>([])

const uploadFile = async (file: File) => {
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
      console.log('next res: ', res)
      // ...
    },
    error(err) {
      console.log('error err: ', err)
      // ...
    },
    complete(res) {
      console.log('complete res: ', res)
      // ...
      const url = `${import.meta.env.VITE_CDN_BASE_URL}/${res.hash}`
      images.value.push(url)
      alert(url)
    }
  })
}

const handleFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files ?? new FileList()
  console.log('files: ', files)
  Array.from(files).forEach(uploadFile)
}
</script>
