import { lazy, Suspense } from 'react'

import useInitApp from '@/hooks/use-init-app'
import useRouteScrollTop from '@/hooks/use-route-scroll-top'
import { Loading } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import PageProgress from './components/page-progress'
import DesktopLayout from './components/desktop-layout'
import MobileLayout from './components/mobile-layout'
import { useUIStore } from '@/stores'

const { Outlet, useMatch } = await import('react-router-dom')

const PreferencesModal = lazy(() => import('./components/preferences-modal'))
const LoginModal = lazy(() => import('./components/login-modal'))

export default function App() {
	const is_mobile = useUIStore(state => state.is_mobile)
	useRouteScrollTop()
	useInitApp()
	const login_success_match = useMatch('/login-success')
	const with_layout = !login_success_match

	const global_els = (
		<>
			<PageProgress />
			<Suspense>
				<PreferencesModal />
			</Suspense>
			<Suspense>
				<LoginModal />
			</Suspense>
		</>
	)

	return (
		<>
			{global_els}

			{with_layout ? (
				is_mobile ? (
					<MobileLayout />
				) : (
					<DesktopLayout />
				)
			) : (
				<Suspense
					fallback={
						<div className="min-h-screen flex justify-center items-center">
							<Loading spinning size="large" />
						</div>
					}
				>
					<div className={cls('min-h-screen scrollbar-custom')}>
						<Outlet />
					</div>
				</Suspense>
			)}
		</>
	)
}
