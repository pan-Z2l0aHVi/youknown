import { start_progress, stop_progress } from '@/store/ui/effect'
import { useTransition, useEffect, useCallback } from 'react'
import { NavigateOptions, To, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '.'

export default function useTransitionNavigate() {
	const navigate = useNavigate()
	const [isPending, startTransition] = useTransition()
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (isPending) {
			dispatch(start_progress())
		} else {
			dispatch(stop_progress())
		}
	}, [dispatch, isPending])

	useEffect(
		() => () => {
			dispatch(stop_progress())
		},
		[dispatch]
	)

	return useCallback(
		(to: To, options?: NavigateOptions) => {
			startTransition(() => {
				console.log('navigate to: ', to)
				navigate(to, options)
			})
		},
		[navigate]
	)
}
