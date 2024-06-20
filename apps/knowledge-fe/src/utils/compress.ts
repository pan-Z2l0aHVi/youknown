import { useUIStore } from '@/stores'

export async function compress_image(file: File, width: number, height: number): Promise<File> {
  const { compressImage } = await import('@youknown/img-wasm/src')
  let result = file
  if (useUIStore.getState().compress_upload) {
    result = await compressImage(file, width, height)
  }
  return result
}
