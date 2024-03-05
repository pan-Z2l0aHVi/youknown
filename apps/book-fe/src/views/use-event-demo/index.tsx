import Header from '@/app/components/header'
import { components } from '@/utils/mdx-components'

import UseEventMDX from './use-event.mdx'

export default function UseEventDemo() {
	return (
		<>
			<Header heading="UseEvent"></Header>

			<div className="rich-text-container sm:p-32px <sm:p-16px! sm:m-[0_auto] sm:w-800px">
				<UseEventMDX components={components} />
			</div>
		</>
	)
}
