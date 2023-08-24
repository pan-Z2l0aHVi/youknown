import { lazy, Suspense, useEffect } from 'react'
import { useMatch, useRoutes } from 'react-router-dom'

import { useUIStore, useUserStore } from '@/stores'
import { get_local_settings, get_local_token } from '@/utils/local'
import { useEvent } from '@youknown/react-hook/src'
import { Loading } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import routes from '../router/routes'
import FabBar from './components/fab-bar'
import PageProgress from './components/page-progress'
import Sidebar from './components/sidebar'

const PreferencesModal = lazy(() => import('./components/preferences-modal'))
const LoginModal = lazy(() => import('./components/login-modal'))

export default function App() {
	const content = useRoutes(routes)
	const set_hue = useUIStore(state => state.set_hue)
	const set_radius = useUIStore(state => state.set_radius)
	const set_dark_theme = useUIStore(state => state.set_dark_theme)
	const fetch_profile = useUserStore(state => state.fetch_profile)
	const login_success_match = useMatch('/login-success')
	const with_layout = !login_success_match

	const init_settings = useEvent(() => {
		const local_settings = get_local_settings()
		set_hue(local_settings.primary_color ?? '#de7802')
		set_radius(local_settings.radius ?? [4, 8, 12])
		set_dark_theme(local_settings.is_dark_theme ?? false)
	})

	useEffect(() => {
		init_settings()
	}, [init_settings])

	useEffect(() => {
		if (get_local_token()) {
			fetch_profile()
		}
	}, [fetch_profile])

	return (
		<div className="flex">
			<PageProgress />

			<Suspense>
				<PreferencesModal />
			</Suspense>
			<Suspense>
				<LoginModal />
			</Suspense>

			{with_layout && <Sidebar />}

			<Suspense
				fallback={
					<div className="flex-1 h-screen flex justify-center items-center">
						<Loading spinning size="large" />
					</div>
				}
			>
				<div
					id="app-content"
					className={cls('flex-1 h-screen overflow-y-auto overflow-y-overlay scrollbar-custom')}
				>
					{content}

					{with_layout && <FabBar />}
				</div>
			</Suspense>
		</div>
	)
}
