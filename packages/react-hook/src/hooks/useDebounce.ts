import { useEffect, useRef, useState } from 'react'

import { debounce } from '@youknown/utils/src'

export function useDebounce<T>(val: T, wait?: number): T | void {
	const [state, setState] = useState<T>()
	const fnRef = useRef(
		debounce((nextState: T) => {
			setState(nextState)
		}, wait)
	)
	useEffect(() => {
		fnRef.current(val)
	}, [val])
	return state
}
