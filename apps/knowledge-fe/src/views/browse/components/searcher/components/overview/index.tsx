import { useTranslation } from 'react-i18next'
import { RiHistoryFill } from 'react-icons/ri'

import { Feed } from '@/apis/feed'
import { format_time } from '@/utils'
import { Avatar, Image } from '@youknown/react-ui/src'

interface OverviewProps {
	selection: Feed
}
export default function Overview(props: OverviewProps) {
	const { selection } = props
	const { t } = useTranslation()
	return (
		<>
			{selection.cover ? (
				<Image
					className="w-144px h-144px rd-radius-m shadow-shadow-l b-1 b-solid b-bd-line"
					src={selection.cover}
					canPreview
					alt="Cover"
				/>
			) : (
				<div className="flex items-center justify-center w-144px h-144px rd-radius-m shadow-shadow-l b-1 b-solid b-bd-line bg-bg-2">
					<span className="color-text-3 text-16px font-600">{t('cover.none')}</span>
				</div>
			)}
			<div className="w-100% mt-16px line-clamp-2 text-center text-16px font-600">{selection.title}</div>
			<div className="flex items-center justify-center w-100% mt-16px">
				<Avatar size="small" round src={selection.author_info.avatar} />
				<span className="ml-8px truncate color-text-2">{selection.author_info.nickname}</span>
			</div>
			<div className="flex items-center mt-16px text-center color-text-3 text-12px">
				<RiHistoryFill className="mr-4px text-14px" />
				{format_time(selection.update_time)}
			</div>
		</>
	)
}
