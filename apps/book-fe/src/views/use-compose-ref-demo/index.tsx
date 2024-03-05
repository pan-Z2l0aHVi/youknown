import Header from '@/app/components/header'
import { components } from '@/utils/mdx-components'

import UseComposeRefMDX from './use-compose-ref.mdx'

export default function UseComposeRefDemo() {
	return (
		<>
			<Header heading="UseComposeRef"></Header>

			<div className="rich-text-container sm:p-32px <sm:p-16px! sm:m-[0_auto] sm:w-800px">
				<UseComposeRefMDX components={components} />
			</div>
		</>
	)
}
