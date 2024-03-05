import Header from '@/app/components/header'
import { components } from '@/utils/mdx-components'

import UsePaginationMDX from './use-pagination.mdx'

export default function UsePaginationDemo() {
	return (
		<>
			<Header heading="UsePagination"></Header>

			<div className="rich-text-container sm:p-32px <sm:p-16px! sm:m-[0_auto] sm:w-800px">
				<UsePaginationMDX components={components} />
			</div>
		</>
	)
}
