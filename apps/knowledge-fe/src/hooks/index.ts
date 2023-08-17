import { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export function useAppContentEl() {
	const [app_content_el, set_app_content_el] = useState<HTMLElement | null>(null)
	useLayoutEffect(() => {
		set_app_content_el(document.getElementById('app-content'))
	}, [])
	return app_content_el
}
