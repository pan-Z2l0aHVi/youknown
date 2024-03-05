import Header from '@/app/components/header'
import { components } from '@/utils/mdx-components'

import UseHoverMDX from './use-hover.mdx'

export default function UseHoverDemo() {
	return (
		<>
			<Header heading="UseHover"></Header>

			<div className="rich-text-container sm:p-32px <sm:p-16px! sm:m-[0_auto] sm:w-800px">
				<UseHoverMDX components={components} />
			</div>
		</>
	)
}
