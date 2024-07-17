interface CropImageParams {
  file: File
  pixelCrop: {
    x: number
    y: number
    width: number
    height: number
  }
  rotation: number
}

export async function cropImageToBase64({ file, pixelCrop, rotation = 0 }: CropImageParams): Promise<string> {
  try {
    const image = await fileToImage(file)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d', {
      // https://html.spec.whatwg.org/multipage/canvas.html#concept-canvas-will-read-frequently
      willReadFrequently: true
    })
    if (!ctx) {
      return Promise.reject('Canvas context not supported.')
    }

    const rotRad = getRadianAngle(rotation)
    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation)

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth
    canvas.height = bBoxHeight

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
    ctx.rotate(rotRad)
    ctx.translate(-image.width / 2, -image.height / 2)
    // draw rotated image
    ctx.drawImage(image, 0, 0)

    const croppedCanvas = document.createElement('canvas')
    const croppedCtx = croppedCanvas.getContext('2d', {
      // https://html.spec.whatwg.org/multipage/canvas.html#concept-canvas-will-read-frequently
      willReadFrequently: true
    })
    if (!croppedCtx) {
      return Promise.reject('Canvas context not supported.')
    }

    // Set the size of the cropped canvas
    croppedCanvas.width = pixelCrop.width
    croppedCanvas.height = pixelCrop.height

    // Draw the cropped image onto the new canvas
    croppedCtx.drawImage(
      canvas,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    )

    return croppedCanvas.toDataURL(file.type)
  } catch {
    return Promise.reject('Failed to load the image.')
  }
}

function fileToImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const reader = new FileReader()
    reader.onload = e => {
      if (e.target && typeof e.target.result === 'string') {
        image.src = e.target.result
      }
    }
    reader.readAsDataURL(file)
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', reject)
  })
}

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180
}

function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation)
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
  }
}
