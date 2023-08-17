import { useEffect, useTransition } from 'react'
import { NavigateOptions, To, useNavigate } from 'react-router-dom'

import { start_progress, stop_progress } from '@/store/ui'
import { useEvent } from '@youknown/react-hook/src'

import { useAppDispatch } from './'

export default function useTransitionNavigate() {
	const navigate = useNavigate()
	const [is_pending, start_transition] = useTransition()
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (is_pending) {
			dispatch(start_progress())
		} else {
			dispatch(stop_progress())
		}
	}, [dispatch, is_pending])

	useEffect(
		() => () => {
			dispatch(stop_progress())
		},
		[dispatch]
	)

	return useEvent((to: To, options?: NavigateOptions) => {
		start_transition(() => {
			console.log('navigate to: ', to)
			navigate(to, options)
		})
	})
}
