import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Loading } from '@youknown/react-ui/src'

import Banner from '../banner'

export default function MobileLayout() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen flex justify-center items-center">
					<Loading spinning size="large" />
				</div>
			}
		>
			<div className="min-h-screen">
				<Banner />
				<Outlet />
			</div>
		</Suspense>
	)
}
