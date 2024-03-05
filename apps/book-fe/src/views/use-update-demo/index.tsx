import Header from '@/app/components/header'
import { components } from '@/utils/mdx-components'

import UseUpdateMDX from './use-update.mdx'

export default function UseUpdateDemo() {
	return (
		<>
			<Header heading="UseUpdate"></Header>

			<div className="rich-text-container sm:p-32px <sm:p-16px! sm:m-[0_auto] sm:w-800px">
				<UseUpdateMDX components={components} />
			</div>
		</>
	)
}
