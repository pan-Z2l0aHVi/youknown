import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useRouteScrollTop() {
	const { pathname } = useLocation()
	useLayoutEffect(() => {
		window.scroll(0, 0)
	}, [pathname])
}
