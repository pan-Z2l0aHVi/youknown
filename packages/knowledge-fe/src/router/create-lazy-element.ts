import { createElement, lazy } from 'react'

export function create_lazy_element(factory: Parameters<typeof lazy>[number]) {
	return createElement(lazy(factory))
}
