import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'
import { useSetup } from '@youknown/react-hook/src'

export function useAppContentEl() {
	const [app_content_el, set_app_content_el] = useState<HTMLElement | null>(null)
	useSetup(() => {
		set_app_content_el(document.getElementById('app-content'))
	})
	return app_content_el
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
