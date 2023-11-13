import { TbSearch } from 'react-icons/tb'

import Header from '@/app/components/header'
import { Input } from '@youknown/react-ui/src'

export default function Collection() {
	return (
		<>
			<Header heading="收藏夹">
				<Input prefix={<TbSearch className="color-text-3" />} placeholder="搜收藏" />
			</Header>

			<div className="p-32px"></div>
		</>
	)
}
