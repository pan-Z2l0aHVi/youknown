export function setRootStyle(styleObj: Record<string, string | null>) {
	const root = document.querySelector<HTMLElement>(':root')
	if (!root) return
	Object.entries(styleObj).forEach(([key, value]) => {
		root.style.setProperty(key, value)
	})
}
