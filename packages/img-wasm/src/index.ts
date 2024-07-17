interface Dimensions {
  width: number
  height: number
}

export async function compressImage(file: File, maxWidth: number, maxHeight: number): Promise<File> {
  const { name, type } = file
  const imageType = type.replace('image/', '')
  if (!['jpeg', 'png', 'webp'].includes(imageType)) {
    return file
  }
  const dimensions = await getImageDimensions(file)
  const [limited, { width, height }] = limitDimensions(dimensions, maxWidth, maxHeight)
  if (!limited) {
    return file
  }
  const fileBuffer = await file.arrayBuffer()
  const imageData = await decode(imageType, fileBuffer)
  const imageBuffer = await encode(imageType, await resizeImageData(imageData, width, height))
  const imageBlob = new Blob([imageBuffer], { type: `image/${imageType}` })
  return new File([imageBlob], name, { type })
}

function limitDimensions(dimensions: Dimensions, maxWidth: number, maxHeight: number): [boolean, Dimensions] {
  const { width, height } = dimensions
  if (width > maxWidth || height > maxHeight) {
    const aspectRatio = width / height
    if (aspectRatio > maxWidth / maxHeight) {
      return [
        true,
        {
          width: maxWidth,
          height: maxWidth / aspectRatio
        }
      ]
    }
    return [
      true,
      {
        width: maxHeight * aspectRatio,
        height: maxHeight
      }
    ]
  }
  return [
    false,
    {
      width,
      height
    }
  ]
}

function getImageDimensions(file: File): Promise<Dimensions> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      if (typeof e.target?.result === 'string') {
        const img = new Image()
        img.onload = () => {
          resolve({
            width: img.width,
            height: img.height
          })
        }
        img.onerror = function () {
          reject('Get Image Dimensions Failed.')
        }
        img.src = e.target?.result
      }
    }
    reader.readAsDataURL(file)
  })
}

function resizeImageDataByCanvas(input: ImageData, width: number, height: number): ImageData {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d', {
    // https://html.spec.whatwg.org/multipage/canvas.html#concept-canvas-will-read-frequently
    willReadFrequently: true
  }) as CanvasRenderingContext2D
  canvas.width = width
  canvas.height = height

  const inputCanvas = document.createElement('canvas')
  const inputCtx = inputCanvas.getContext('2d', {
    // https://html.spec.whatwg.org/multipage/canvas.html#concept-canvas-will-read-frequently
    willReadFrequently: true
  }) as CanvasRenderingContext2D
  inputCanvas.width = input.width
  inputCanvas.height = input.height
  inputCtx.putImageData(input, 0, 0)

  ctx.drawImage(inputCanvas, 0, 0, width, height)
  const output = ctx.getImageData(0, 0, width, height)
  return output
}

// `WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application / wasm` MIME type.
// Falling back to `WebAssembly.instantiate` which is slower.
async function resizeImageDataByWasm(input: ImageData, width: number, height: number): Promise<ImageData> {
  const resize = (await import('@jsquash/resize')).default
  const output = await resize(input, {
    width,
    height
  })
  return output
}

// const resizeImageData = resizeImageDataByWasm
const resizeImageData: typeof resizeImageDataByWasm = async (...args) => resizeImageDataByCanvas(...args)

async function decode(type: string, fileBuffer: ArrayBuffer): Promise<ImageData> {
  switch (type) {
    case 'jpeg': {
      const { decode } = await import('@jsquash/jpeg')
      return await decode(fileBuffer)
    }
    case 'png': {
      const { decode } = await import('@jsquash/png')
      return await decode(fileBuffer)
    }
    case 'webp': {
      const { decode } = await import('@jsquash/webp')
      return await decode(fileBuffer)
    }
    default:
      throw new Error(`Unknown source type: ${type}`)
  }
}

async function encode(type: string, imageData: ImageData): Promise<ArrayBuffer> {
  switch (type) {
    case 'jpeg': {
      const { encode } = await import('@jsquash/jpeg')
      return await encode(imageData)
    }
    case 'png': {
      const { encode } = await import('@jsquash/png')
      const { optimise } = await import('@jsquash/oxipng')
      return await optimise(await encode(imageData), { level: 3 })
    }
    case 'webp': {
      const { encode } = await import('@jsquash/webp')
      return await encode(imageData)
    }
    default:
      throw new Error(`Unknown output type: ${type}`)
  }
}

export const excludeDeps = ['@jsquash/jpeg', '@jsquash/webp', '@jsquash/png', '@jsquash/oxipng', '@jsquash/resize']
