import { useMemo } from 'react'

import { routes } from '@/router/routes'

const { matchRoutes, useLocation } = await import('react-router-dom')

export default function useRouteMeta() {
	const location = useLocation()
	const matched = useMemo(() => matchRoutes(routes, location), [location])
	if (!matched) {
		return {}
	}
	return matched[0].route?.meta ?? {}
}
