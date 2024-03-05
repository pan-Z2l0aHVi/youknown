import Header from '@/app/components/header'
import { components } from '@/utils/mdx-components'

import UseThrottleMDX from './use-throttle.mdx'

export default function UseThrottleDemo() {
	return (
		<>
			<Header heading="UseThrottle"></Header>

			<div className="rich-text-container sm:p-32px <sm:p-16px! sm:m-[0_auto] sm:w-800px">
				<UseThrottleMDX components={components} />
			</div>
		</>
	)
}
