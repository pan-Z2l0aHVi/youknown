import { MutableRefObject, useLayoutEffect, useState } from 'react'

export function useIntersection(target: MutableRefObject<HTMLElement | null>, observerInit?: IntersectionObserverInit) {
	const [isIntersecting, setIsIntersecting] = useState(false)

	useLayoutEffect(() => {
		if (!target.current) return

		const observe = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				setIsIntersecting(entry.isIntersecting)
			})
		}, observerInit)
		observe.observe(target.current)

		return () => {
			observe.disconnect()
		}
	}, [observerInit, target])

	return isIntersecting
}
