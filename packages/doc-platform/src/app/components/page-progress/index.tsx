import React, { useState } from 'react'
import { Progress } from '@youknown/react-ui/src'
import { delay } from '@youknown/utils/src'
import { useMounted } from '@youknown/react-hook/src'

export default function PageProgress() {
	const [percent, setPercent] = useState(0)

	// fake progress
	useMounted(async () => {
		await delay(400)
		setPercent(20)
		await delay(800)
		setPercent(40)
		await delay(1200)
		setPercent(70)
		await delay(400)
		setPercent(80)
		await delay(600)
		setPercent(90)
		await delay(250)
		setPercent(91)
		await delay(400)
		setPercent(92)
		await delay(800)
		setPercent(93)
		await delay(1600)
		setPercent(94)
		await delay(3200)
		setPercent(95)
	})

	return (
		<div className="fixed top-0 left-0 z-25 w-screen">
			<Progress format={null} size="small" percent={percent} />
		</div>
	)
}
