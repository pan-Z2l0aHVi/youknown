import { uuid } from '@youknown/utils/src'

import { get_r2_signed_url } from '@/apis/bucket'

import { with_api } from './request'

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

  const [err, res] = await with_api(get_r2_signed_url)({ key })
  if (err) {
    options?.error?.(err)
    return
  }
  const xhr = new XMLHttpRequest()
  xhr.open('PUT', res.url, true)
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

// https://developers.cloudflare.com/images/transform-images/transform-via-url/
interface TransformOptions {
  anim?: boolean
  background?: string
  blur?: number
  brightness?: number
  contrast?: number
  dpr?: number
  fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad'
  gamma?: number
  g?: string
  h?: number
  metadata?: 'keep' | 'copyright' | 'none'
  onerror?: 'redirect'
  q?: number
  rotate?: number
  sharpen?: number
  w?: number
}
export function transform_img_cdn(url?: string, options: TransformOptions = {}): string {
  if (!url) {
    return ''
  }
  if (!Object.keys(options).length) {
    return url
  }
  const dpr = window.devicePixelRatio
  if (options.w) {
    options.w = Math.ceil(dpr * options.w)
  }
  if (options.h) {
    options.h = Math.ceil(dpr * options.h)
  }
  const keys = Object.keys(options) as (keyof TransformOptions)[]
  const options_path = keys.reduce((pre, cur) => {
    return `${pre ? `${pre},` : ''}${cur}=${options[cur]}`
  }, '')
  return `${import.meta.env.VITE_CDN_BASE_URL}/cdn-cgi/image/${options_path}/${url}`
}
