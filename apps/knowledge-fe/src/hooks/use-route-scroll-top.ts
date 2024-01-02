import { useLayoutEffect } from 'react'

const { useLocation } = await import('react-router-dom')

export default function useRouteScrollTop() {
	const { pathname } = useLocation()
	useLayoutEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant'
		})
	}, [pathname])
}
