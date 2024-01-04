import { Loading } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { Suspense } from 'react'

const { Outlet } = await import('react-router-dom')

export default function MobileLayout() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen flex justify-center items-center">
					<Loading spinning size="large" />
				</div>
			}
		>
			<div className={cls('min-h-screen')}>
				<Outlet />
			</div>
		</Suspense>
	)
}
