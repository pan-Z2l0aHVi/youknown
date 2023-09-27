import { RefObject, useEffect, useState } from 'react'

export const useScrolling = (ref: RefObject<any>): boolean => {
	const [scrolling, setScrolling] = useState<boolean>(false)

	useEffect(() => {
		if (ref.current) {
			let scrollingTimeout = 0
			const handleScrollEnd = () => {
				setScrolling(false)
			}
			const handleScroll = () => {
				setScrolling(true)
				clearTimeout(scrollingTimeout)
				scrollingTimeout = window.setTimeout(() => handleScrollEnd(), 150)
			}
			const ele = ref.current
			ele.addEventListener('scroll', handleScroll, false)
			return () => {
				ele.removeEventListener('scroll', handleScroll, false)
			}
		}
	}, [ref])
	return scrolling
}
