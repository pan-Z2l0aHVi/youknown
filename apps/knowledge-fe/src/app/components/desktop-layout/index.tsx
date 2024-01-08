import { Suspense } from 'react'

import { Loading } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import Banner from '../banner'
import Sidebar from '../sidebar'

const { Outlet } = await import('react-router-dom')

export default function DesktopLayout() {
	return (
		<div className="flex flex-col min-h-screen">
			<Banner />
			<div className="flex-1 flex">
				{/* 外层 relative 撑起容器高度 */}
				<div className="relative">
					<Sidebar />
				</div>

				<Suspense
					fallback={
						<div className="flex-1 flex justify-center items-center">
							<Loading spinning size="large" />
						</div>
					}
				>
					<div className={cls('flex-1 scrollbar-custom')}>
						<Outlet />
					</div>
				</Suspense>
			</div>
		</div>
	)
}
