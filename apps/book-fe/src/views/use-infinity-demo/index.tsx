import Header from '@/app/components/header'
import { components } from '@/utils/mdx-components'

import UseInfinityMDX from './use-infinity.mdx'

export default function UseInfinityDemo() {
	return (
		<>
			<Header heading="UseInfinity"></Header>

			<div className="rich-text-container sm:p-32px <sm:p-16px! sm:m-[0_auto] sm:w-800px">
				<UseInfinityMDX components={components} />
			</div>
		</>
	)
}
