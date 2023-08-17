import { useCallback, useState } from 'react'

export function useUpdate(): () => void {
	const [, setCount] = useState({})
	const update = useCallback(() => {
		setCount({})
	}, [])
	return update
}
