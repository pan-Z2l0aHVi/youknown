import { hide_page_loading, show_page_loading } from '@/store/ui'
import { useTransition, useEffect, useCallback } from 'react'
import { NavigateOptions, To, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '.'

export default function useTransitionNavigate() {
	const navigate = useNavigate()
	const [isPending, startTransition] = useTransition()
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (isPending) {
			dispatch(show_page_loading())
		} else {
			dispatch(hide_page_loading())
		}
	}, [dispatch, isPending])

	useEffect(
		() => () => {
			dispatch(hide_page_loading())
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
