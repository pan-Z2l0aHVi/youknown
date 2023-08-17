import { useEffect, useRef, useState } from 'react'

import { throttle } from '@youknown/utils/src'

export function useThrottle<T>(val: T, wait?: number): T | void {
	const [state, setState] = useState<T>()
	const fnRef = useRef(
		throttle((nextState: T) => {
			setState(nextState)
		}, wait)
	)
	useEffect(() => {
		fnRef.current(val)
	}, [val])
	return state
}
