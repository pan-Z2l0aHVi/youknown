import { useEffect } from 'react'

import { useLatestRef } from './useLatestRef'

export function useUnmount(fn: () => void) {
	const fnRef = useLatestRef(fn)
	useEffect(
		() => () => {
			fnRef.current()
		},
		[fnRef]
	)
}
