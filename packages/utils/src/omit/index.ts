export function omit<T extends object, S extends keyof T>(obj: T, ...keys: S[]): Omit<T, S> {
	const clone = { ...obj }
	for (const key of keys) {
		delete clone[key]
	}
	return clone
}
