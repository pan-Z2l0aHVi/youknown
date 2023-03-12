import is from '../is'

export function isPlainObject(obj: unknown): boolean {
	if (typeof obj !== 'object' || obj === null) return false

	let proto = obj
	while (Object.getPrototypeOf(proto) !== null) {
		proto = Object.getPrototypeOf(proto)
	}

	return Object.getPrototypeOf(obj) === proto
}

export function isEmptyObject(obj: unknown): boolean {
	if (!is.object(obj)) return false
	return !Object.keys(obj).length
}

export function isDeepEqual(a: unknown, b: unknown): boolean {
	if (typeof a === 'number' && isNaN(a) && typeof b === 'number' && isNaN(b)) {
		return true
	}
	if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) {
		return a === b
	}
	if ((Array.isArray(a) && !Array.isArray(b)) || (!Array.isArray(a) && Array.isArray(b))) {
		return false
	}
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) {
			return false
		}
		for (let i = 0; i < a.length; i++) {
			if (!isDeepEqual(a[i], b[i])) {
				return false
			}
		}
		return true
	}
	const aKeys = Object.keys(a)
	const bKeys = Object.keys(b)
	if (aKeys.length !== bKeys.length) {
		return false
	}
	const _a: Record<string, any> = a
	const _b: Record<string, any> = b
	for (const key of aKeys) {
		if (!b.hasOwnProperty(key) || !isDeepEqual(_a[key], _b[key])) {
			return false
		}
	}
	return true
}
