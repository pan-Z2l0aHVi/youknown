export function pick<T extends object, S extends keyof T>(obj: T, ...keys: S[]): Pick<T, S> {
	return keys.reduce((ret, key) => {
		if (key in obj) ret[key] = obj[key]
		return ret
	}, {} as Pick<T, S>)
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
