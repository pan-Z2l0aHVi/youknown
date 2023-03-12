import { createElement, lazy } from 'react'
import store from '@/store'
import { hide_page_loading } from '@/store/ui'

export function create_lazy_element(factory: Parameters<typeof lazy>[number]) {
	return createElement(
		lazy(() =>
			factory().finally(() => {
				store.dispatch(hide_page_loading())
			})
		)
	)
}
