import { useEffect } from 'react'

export function useSetup(fn: () => void): void {
	useEffect(() => {
		fn?.()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
