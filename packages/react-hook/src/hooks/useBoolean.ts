import { useState, Dispatch, SetStateAction, useCallback } from 'react'

export function useBoolean(initial: boolean): [
	boolean,
	{
		setBool: Dispatch<SetStateAction<boolean>>
		setTrue: () => void
		setFalse: () => void
		setReverse: () => void
	}
] {
	const [bool, setBool] = useState(initial)

	const setTrue = useCallback(() => {
		setBool(true)
	}, [])
	const setFalse = useCallback(() => {
		setBool(false)
	}, [])
	const setReverse = useCallback(() => {
		setBool(p => !p)
	}, [])

	return [bool, { setBool, setTrue, setFalse, setReverse }]
}
