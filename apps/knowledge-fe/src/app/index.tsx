import { lazy, Suspense } from 'react'
import { useMatch, useRoutes } from 'react-router-dom'

import useInitApp from '@/hooks/use-init-app'
import useRouteScrollTop from '@/hooks/use-route-scroll-top'
import { Loading } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import routes from '../router/routes'
import Banner from './components/banner'
import FabBar from './components/fab-bar'
import PageProgress from './components/page-progress'
import Sidebar from './components/sidebar'

const PreferencesModal = lazy(() => import('./components/preferences-modal'))
const LoginModal = lazy(() => import('./components/login-modal'))

export default function App() {
	useRouteScrollTop()
	useInitApp()
	const content = useRoutes(routes)
	const login_success_match = useMatch('/login-success')
	const with_layout = !login_success_match

	const fallback_ele = with_layout ? (
		<div className="flex-1 flex justify-center items-center">
			<Loading spinning size="large" />
		</div>
	) : (
		<div className="min-h-screen flex justify-center items-center">
			<Loading spinning size="large" />
		</div>
	)

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
				<div className="flex flex-col min-h-screen">
					<Banner />
					<div className="flex-1 flex">
						{/* 外层 relative 撑起容器高度 */}
						<div className="relative">
							<Sidebar />
						</div>

						<Suspense fallback={fallback_ele}>
							<div className={cls('flex-1 scrollbar-custom')}>{content}</div>
						</Suspense>
					</div>
					<FabBar />
				</div>
			) : (
				<Suspense fallback={fallback_ele}>
					<div className={cls('min-h-screen scrollbar-custom')}>{content}</div>
				</Suspense>
			)}
		</>
	)
}
