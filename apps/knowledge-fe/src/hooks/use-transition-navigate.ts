import { useEffect, useTransition } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUIStore } from '@/stores'
import { useEvent, useUnmount } from '@youknown/react-hook/src'
import { is } from '@youknown/utils/src'

import { check_keep_alive, outlet_cache } from './use-route-keep-alive'

import type { NavigateFunction, NavigateOptions, To } from 'react-router-dom'
export function useTransitionNavigate() {
	const navigate = useNavigate()
	const [is_pending, start_transition] = useTransition()
	const start_progress = useUIStore(state => state.start_progress)
	const stop_progress = useUIStore(state => state.stop_progress)

	useEffect(() => {
		if (is_pending) {
			start_progress()
		} else {
			stop_progress()
		}
	}, [is_pending, start_progress, stop_progress])

	useUnmount(() => {
		stop_progress()
	})

	return useEvent((to: To, options?: NavigateOptions) => {
		const to_path = is.string(to) ? to : to.pathname ?? ''
		const is_to_keep_alive = check_keep_alive(to_path)
		if (is_to_keep_alive && outlet_cache.has(to_path)) {
			navigate(to, options)
		} else {
			start_transition(() => {
				navigate(to, options)
			})
		}
	}) as NavigateFunction
}
