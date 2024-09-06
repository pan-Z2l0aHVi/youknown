function hasURLExtension(url: string): boolean {
  const fileExtensionPattern = /\.\w+$/
  return fileExtensionPattern.test(url)
}

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

    if (hasURLExtension(arg)) {
      const srcArr = arg.split('.')
      const suffix = srcArr[srcArr.length - 1]
      if (suffix) {
        filename = `${filename}.${suffix}`
      }
    }
  }
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  a.remove()
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
