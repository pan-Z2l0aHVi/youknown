import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useRouteScrollTop() {
	const { pathname } = useLocation()
	useLayoutEffect(() => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'instant'
		})
	}, [pathname])
}
