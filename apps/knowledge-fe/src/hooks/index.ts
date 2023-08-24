import { useLayoutEffect, useState } from 'react'

export function useAppContentEl() {
	const [app_content_el, set_app_content_el] = useState<HTMLElement | null>(null)
	useLayoutEffect(() => {
		set_app_content_el(document.getElementById('app-content'))
	}, [])
	return app_content_el
}
