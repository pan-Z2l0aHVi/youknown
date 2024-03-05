import Header from '@/app/components/header'
import { components } from '@/utils/mdx-components'

import UseDebounceMDX from './use-debounce.mdx'

export default function UseDebounceDemo() {
	return (
		<>
			<Header heading="UseDebounce"></Header>

			<div className="rich-text-container sm:p-32px <sm:p-16px! sm:m-[0_auto] sm:w-800px">
				<UseDebounceMDX components={components} />
			</div>
		</>
	)
}
