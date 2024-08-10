export function downloadFile(file: File, filename: string): Promise<void>
export function downloadFile(src: string, filename: string): Promise<void>
export async function downloadFile(arg: File | string, filename = 'picture') {
  let url: string
  if (arg instanceof File) {
    url = window.URL.createObjectURL(arg)
  } else {
    const response = await fetch(arg)
    const blob = await response.blob()
    url = window.URL.createObjectURL(blob)
  }
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}

export function getFileImageInfo(file: File): Promise<{
  width: number
  height: number
}> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const objectURL = URL.createObjectURL(file)
    img.onload = function () {
      const width = img.width
      const height = img.height
      URL.revokeObjectURL(objectURL)
      resolve({ width, height })
    }
    img.onerror = function (err) {
      reject(err)
    }
    img.src = objectURL
  })
}
