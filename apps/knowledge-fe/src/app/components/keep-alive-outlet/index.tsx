import { useEffect, useLayoutEffect, useMemo } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

import { check_keep_alive, outlet_cache } from '@/hooks/use-route-keep-alive'
import { useUpdate } from '@youknown/react-hook/src'
import { KeepAlive } from '@youknown/react-ui/src'

export default function KeepAliveOutlet() {
	const { pathname } = useLocation()
	const outlet = useOutlet()
	const update = useUpdate()
	const is_keep_alive = useMemo(() => check_keep_alive(pathname), [pathname])

	useLayoutEffect(() => {
		console.log('is_keep_alive: ', pathname, is_keep_alive)
		if (is_keep_alive) {
			if (!outlet_cache.has(pathname)) {
				outlet_cache.set(pathname, outlet)
				update()
			}
		}
	}, [is_keep_alive, outlet, pathname, update])

	return (
		<>
			{!is_keep_alive && outlet}
			{Array.from(outlet_cache).map(([key, component]) => (
				// <KeepAlive key={key} show={pathname === key}>
				// 	{component}
				// </KeepAlive>
				<div key={key} style={{ display: pathname === key ? 'block' : 'none' }}>
					{component}
				</div>
			))}
		</>
	)
}
