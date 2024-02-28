import { useEffect, useTransition } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUIStore } from '@/stores'
import { useEvent, useUnmount } from '@youknown/react-hook/src'

import { useRouteKeepAlive } from './use-route-keep-alive'

import type { NavigateFunction, NavigateOptions, To } from 'react-router-dom'

export function useTransitionNavigate() {
	const navigate = useNavigate()
	const [is_pending, start_transition] = useTransition()
	const start_progress = useUIStore(state => state.start_progress)
	const stop_progress = useUIStore(state => state.stop_progress)

	useEffect(() => {
		if (is_pending) {
			stop_progress()
			start_progress()
		} else {
			stop_progress()
		}
	}, [is_pending, start_progress, stop_progress])

	useUnmount(() => {
		stop_progress()
	})

	const is_from_keep_alive = useRouteKeepAlive()

	return useEvent((to: To, options?: NavigateOptions) => {
		if (is_from_keep_alive) {
			navigate(to, options)
		} else {
			start_transition(() => {
				navigate(to, options)
			})
		}
	}) as NavigateFunction
}
