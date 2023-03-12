import { useLayoutEffect } from 'react'

export function useUnmounted(fn: () => void): void {
	useLayoutEffect(
		() => () => {
			fn?.()
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)
}
