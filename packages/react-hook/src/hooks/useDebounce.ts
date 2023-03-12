import { debounce } from '@youknown/utils/src'
import { useState, useRef, useEffect } from 'react'

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
