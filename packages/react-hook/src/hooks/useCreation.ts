import { useRef } from 'react'

export function useCreation<T>(factory: () => T) {
	const creation = useRef<T>()
	const initialized = useRef(false)
	if (!initialized.current) {
		creation.current = factory()
		initialized.current = true
	}
	return creation.current as T
}
