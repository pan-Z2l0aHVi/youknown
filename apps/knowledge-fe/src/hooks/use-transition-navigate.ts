import { useEffect, useTransition } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUIStore } from '@/stores'
import { useEvent, useUnmount } from '@youknown/react-hook/src'

import type { NavigateOptions, To } from 'react-router-dom'

export default function useTransitionNavigate() {
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
		start_transition(() => {
			console.log('navigate to: ', to)
			navigate(to, options)
		})
	})
}
