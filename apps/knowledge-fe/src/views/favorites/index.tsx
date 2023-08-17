import { TbSearch } from 'react-icons/tb'

import Header from '@/app/components/header'
import { Input } from '@youknown/react-ui/src'

export default function Favorites() {
	return (
		<>
			<Header heading="收藏夹">
				<Input prefix={<TbSearch />} placeholder="搜收藏" />
			</Header>

			<div className="p-32px"></div>
		</>
	)
}
