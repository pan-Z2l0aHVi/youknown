import { RiHistoryFill } from 'react-icons/ri'

import { Feed } from '@/apis/feed'
import { format_time } from '@/utils'
import { Avatar } from '@youknown/react-ui/src'

interface OverviewProps {
	selection: Feed
}
export default function Overview(props: OverviewProps) {
	const { selection } = props
	return (
		<>
			{selection.cover ? (
				<img
					className="object-cover w-136px h-136px rd-radius-m shadow-shadow-l b-1 b-solid b-bd-line"
					src={selection.cover}
				/>
			) : (
				<div className="flex items-center justify-center w-136px h-136px rd-radius-m shadow-shadow-l b-1 b-solid b-bd-line bg-bg-2">
					<span className="color-text-3 text-16px font-600">暂无封面</span>
				</div>
			)}
			<div className="w-100% mt-16px line-clamp-2 text-center text-16px font-600">{selection.title}</div>
			<div className="flex items-center justify-center w-100% mt-16px">
				<Avatar size="small" src={selection.author_info.avatar} />
				<span className="ml-8px truncate color-text-2">{selection.author_info.nickname}</span>
			</div>
			<div className="flex items-center mt-16px text-center color-text-3 text-12px">
				<RiHistoryFill className="mr-4px text-14px" />
				{format_time(selection.update_time)}
			</div>
		</>
	)
}
