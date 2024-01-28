import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

const EXCLUDE = ['/wallpapers']

export function useRouteScrollTop() {
	const { pathname } = useLocation()
	useLayoutEffect(() => {
		if (EXCLUDE.includes(pathname)) {
			return
		}
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant'
		})
	}, [pathname])
}
