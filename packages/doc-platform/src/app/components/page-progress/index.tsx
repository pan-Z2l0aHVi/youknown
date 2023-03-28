import React from 'react'
import { Progress } from '@youknown/react-ui/src'
import { useAppSelector } from '@/hooks'

export default function PageProgress() {
	const percent = useAppSelector(state => state.ui.progress_per)
	const progress_visible = useAppSelector(state => state.ui.progress_visible)

	return progress_visible ? (
		<div className="fixed top-0 left-0 z-25 w-screen">
			<Progress format={null} size="small" percent={percent} />
		</div>
	) : null
}
