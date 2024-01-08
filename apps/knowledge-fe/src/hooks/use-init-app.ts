import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import useRouteMeta from '@/hooks/use-route-meta'
import { useModalStore, useRecordStore, useSpaceStore, useUIStore, useUserStore } from '@/stores'
import { initHlsLangs } from '@/utils'
import { get_local_settings, get_local_token } from '@/utils/local'
import { report } from '@/utils/report'
import { useAsyncEffect, useEvent, useMount } from '@youknown/react-hook/src'
import { Toast } from '@youknown/react-ui/src'

const { useLocation } = await import('react-router-dom')

export default function useInitApp() {
	const { t } = useTranslation()
	const primary_color = useUIStore(state => state.primary_color)
	const radius = useUIStore(state => state.radius)
	const theme = useUIStore(state => state.theme)
	const i18n_lang = useUIStore(state => state.i18n_lang)
	const set_hue = useUIStore(state => state.set_hue)
	const set_radius = useUIStore(state => state.set_radius)
	const set_dark_theme = useUIStore(state => state.set_dark_theme)
	const set_i18n_lang = useUIStore(state => state.set_i18n_lang)
	const has_login = useUserStore(state => state.has_login)
	const fetch_profile = useUserStore(state => state.fetch_profile)
	const fetch_space_list = useSpaceStore(state => state.fetch_space_list)
	const clear_space_list = useSpaceStore(state => state.clear_space_list)
	const init_records = useRecordStore(state => state.init_records)
	const close_login_modal = useModalStore(state => state.close_login_modal)
	const close_preferences_modal = useModalStore(state => state.close_preferences_modal)

	const init_settings = useEvent(() => {
		const local_settings = get_local_settings()
		set_hue(local_settings.primary_color ?? primary_color)
		set_radius(local_settings.radius ?? radius)
		set_dark_theme(local_settings.theme ?? theme)
		set_i18n_lang(local_settings.i18n_lang ?? i18n_lang)
	})

	useAsyncEffect(async () => {
		initHlsLangs()
	}, [])

	useMount(() => {
		if (get_local_token()) {
			fetch_profile()
		}
		init_settings()
	})

	useMount(() => {
		window.addEventListener('online', () => {
			Toast.success(t('network.recovery'))
		})
		window.addEventListener('offline', () => {
			Toast.error(t('network.abort'))
		})
	})

	const route_meta = useRouteMeta()
	const title = route_meta.title?.()
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

	// 切页面时关闭全局弹窗
	useEffect(() => {
		if (location) {
			close_preferences_modal()
			close_login_modal()
		}
	}, [close_login_modal, close_preferences_modal, location])

	useEffect(() => {
		init_records()
	}, [init_records])

	useEffect(() => {
		if (has_login) {
			fetch_space_list()
		} else {
			clear_space_list()
		}
	}, [has_login, fetch_space_list, clear_space_list])
}
