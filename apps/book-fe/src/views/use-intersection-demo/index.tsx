import Header from '@/app/components/header'
import { components } from '@/utils/mdx-components'

import UseIntersectionMDX from './use-intersection.mdx'

export default function UseIntersectionDemo() {
	return (
		<>
			<Header heading="UseIntersection"></Header>

			<div className="rich-text-container sm:p-32px <sm:p-16px! sm:m-[0_auto] sm:w-800px">
				<UseIntersectionMDX components={components} />
			</div>
		</>
	)
}
