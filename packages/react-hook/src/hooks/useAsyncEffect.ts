import { useEffect } from 'react'

export function useAsyncEffect(fn: (...args: any) => void): void {
	useEffect(() => {
		fn?.()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
