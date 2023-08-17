import { useEffect, useState } from 'react'

import { accZIndex, getZIndex } from '../utils/z-index-manager'

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
