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

export function base64ToFile(base64: string, filename: string, type: string): File {
	const base64Data = base64.replace(/^data:[^;]+;base64,/, '')
	const byteCharacters = atob(base64Data)
	const byteNumbers = new Array(byteCharacters.length)
	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i)
	}
	const byteArray = new Uint8Array(byteNumbers)
	const blob = new Blob([byteArray], { type })
	const file = new File([blob], filename, { type })
	return file
}
