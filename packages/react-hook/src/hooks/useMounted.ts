import { useLayoutEffect } from 'react'

export function useMounted(fn: () => void): void {
	useLayoutEffect(() => {
		fn?.()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
