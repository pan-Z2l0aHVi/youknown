import Header from '@/app/components/header'
import { components } from '@/utils/mdx-components'

import UseControllableMDX from './use-controllable.mdx'

export default function UseControllableDemo() {
	return (
		<>
			<Header heading="UseControllable"></Header>

			<div className="rich-text-container sm:p-32px <sm:p-16px! sm:m-[0_auto] sm:w-800px">
				<UseControllableMDX components={components} />
			</div>
		</>
	)
}
