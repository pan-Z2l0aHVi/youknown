export function setRootStyle(styleObj: Record<string, string | null>) {
	const root = document.querySelector<HTMLElement>(':root')
	if (!root) return
	Object.entries(styleObj).forEach(([key, value]) => {
		root.style.setProperty(key, value)
	})
}

export function pickDataAttrs<T extends object, K extends string & keyof T>(obj: T): Record<K, any> {
	const ret = {} as Record<K, any>
	if (obj)
		Object.keys(obj).forEach(key => {
			const k = String(key) as K
			if (k.startsWith('data-')) {
				ret[k] = obj[k]
			}
			if (k.startsWith('aria-')) {
				ret[k] = obj[k]
			}
		})
	return ret
}
