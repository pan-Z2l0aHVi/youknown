import { useState, useEffect } from 'react'
import { getZIndex, accZIndex } from '../utils/z-index-manager'

export function useZIndex(open = false) {
	const [zIndex, setZIndex] = useState(getZIndex())
	useEffect(() => {
		if (open) {
			setZIndex(getZIndex())
			accZIndex()
		}
	}, [open])
	return zIndex
}
