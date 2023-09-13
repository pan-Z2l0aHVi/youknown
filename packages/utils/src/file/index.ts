export function downloadFile(src: string, filename = 'picture') {
	return new Promise<string>((resolve, reject) => {
		const image = new window.Image()
		image.setAttribute('crossOrigin', 'anonymous')
		image.onload = function () {
			const canvas = document.createElement('canvas')
			canvas.width = image.width
			canvas.height = image.height
			const context = canvas.getContext('2d') as CanvasRenderingContext2D
			context.drawImage(image, 0, 0, image.width, image.height)
			const url = canvas.toDataURL('image/png')
			const a = document.createElement('a')
			const event = new MouseEvent('click')
			a.download = filename
			a.href = url
			a.dispatchEvent(event)
			resolve(url)
		}
		image.onerror = function (err) {
			reject(err)
		}
		image.src = src
	})
}
