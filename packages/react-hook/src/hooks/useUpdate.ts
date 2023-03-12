import { useCallback, useState } from 'react'

export function useUpdate(): () => void {
	const [, setCount] = useState(0)
	const update = useCallback(() => {
		setCount(count => count + 1)
	}, [])
	return update
}
