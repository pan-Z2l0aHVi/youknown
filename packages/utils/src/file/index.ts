export async function downloadFile(src: string, filename = 'picture') {
	const response = await fetch(src)
	const blob = await response.blob()
	const url = window.URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = filename
	a.click()
	window.URL.revokeObjectURL(url)
}
