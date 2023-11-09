export function export_html(html: string, filename = 'document.html') {
	const blob = new Blob([html], { type: 'text/html' })

	const a = document.createElement('a')
	a.href = URL.createObjectURL(blob)
	a.download = filename
	a.click()
}

export function export_pdf(html: string, filename = 'document.html') {
	const blob = new Blob([html], { type: 'text/html' })

	const a = document.createElement('a')
	a.href = URL.createObjectURL(blob)
	a.download = filename
	a.click()
	return Promise.resolve()
}
