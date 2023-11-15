import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import useRouteMeta from '@/hooks/use-route-meta'
import { THEME, useRecordStore, useSpaceStore, useUIStore, useUserStore } from '@/stores'
import { get_local_settings, get_local_token } from '@/utils/local'
import { report } from '@/utils/report'
import { useEvent, useMount } from '@youknown/react-hook/src'

export default function useInitApp() {
	const set_hue = useUIStore(state => state.set_hue)
	const set_radius = useUIStore(state => state.set_radius)
	const set_dark_theme = useUIStore(state => state.set_dark_theme)
	const has_login = useUserStore(state => state.has_login)
	const fetch_profile = useUserStore(state => state.fetch_profile)
	const fetch_space_list = useSpaceStore(state => state.fetch_space_list)
	const init_records = useRecordStore(state => state.init_records)

	const init_settings = useEvent(() => {
		const local_settings = get_local_settings()
		set_hue(local_settings.primary_color ?? '#007aff')
		set_radius(local_settings.radius ?? [4, 8, 12])
		set_dark_theme(local_settings.theme ?? THEME.SYSTEM)
	})

	useMount(() => {
		if (get_local_token()) {
			fetch_profile()
		}
		init_settings()
	})

	const { title } = useRouteMeta()
	useEffect(() => {
		if (title) {
			document.title = title
		}
	}, [title])

	const location = useLocation()
	useEffect(() => {
		report({
			event: 'page_view',
			payload: location
		})
	}, [location])

	useEffect(() => {
		init_records()
	}, [init_records])

	useEffect(() => {
		if (has_login) {
			fetch_space_list()
		}
	}, [has_login, fetch_space_list])
}
