import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useRouteKeepAlive } from './use-route-keep-alive'

const block_list = ['/wallpapers']

export function useRouteScrollTop() {
	const is_keep_alive = useRouteKeepAlive()
	const location = useLocation()
	useLayoutEffect(() => {
		if (is_keep_alive) {
			return
		}
		if (block_list.includes(location.pathname)) {
			return
		}
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant'
		})
	}, [is_keep_alive, location])
}
