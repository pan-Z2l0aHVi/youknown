import { MutableRefObject, useLayoutEffect, useState } from 'react'

export function useIntersection(target: MutableRefObject<HTMLElement>, observerInit?: IntersectionObserverInit) {
	const [isIntersection, setIsIntersection] = useState(false)

	useLayoutEffect(() => {
		if (!target.current) return

		const observe = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				setIsIntersection(entry.isIntersecting)
			})
		}, observerInit)
		observe.observe(target.current)

		return () => {
			observe.disconnect()
		}
	}, [observerInit, target])

	return isIntersection
}
