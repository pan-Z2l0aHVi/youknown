import { useState } from 'react'
import { LuHeartOff } from 'react-icons/lu'
import { RiHistoryFill } from 'react-icons/ri'
import { TbUser } from 'react-icons/tb'

import { Feed } from '@/apis/feed'
import { cancel_collect_feed } from '@/apis/user'
import More from '@/components/more'
import useTransitionNavigate from '@/hooks/use-transition-navigate'
import { format_time } from '@/utils'
import { with_api } from '@/utils/request'
import { Dropdown, Image } from '@youknown/react-ui/src'
import { cls, QS } from '@youknown/utils/src'

interface FeedCardProps {
	className?: string
	feed: Feed
	on_removed?: () => void
}
export default function FeedCard(props: FeedCardProps) {
	const { className, feed, on_removed } = props
	const navigate = useTransitionNavigate()
	const [more_open, set_more_open] = useState(false)
	const go_feed_detail = () => {
		navigate(
			QS.stringify({
				base: '/browse/feed-detail',
				query: { feed_id: feed.feed_id }
			})
		)
	}

	const handle_cancel_collect_feed = async () => {
		const [err] = await with_api(cancel_collect_feed)({
			feed_id: feed.feed_id
		})
		if (err) {
			return
		}
		on_removed?.()
	}

	const action_ele = (
		<Dropdown
			trigger="click"
			placement="bottom-start"
			content={
				<Dropdown.Menu
					className="w-120px"
					closeAfterItemClick
					onClick={e => {
						e.stopPropagation()
						handle_cancel_collect_feed()
					}}
				>
					<Dropdown.Item prefix={<LuHeartOff className="color-danger text-16px" />}>
						<span className="color-danger">取消收藏</span>
					</Dropdown.Item>
				</Dropdown.Menu>
			}
			onOpenChange={set_more_open}
		>
			<More className="" active={more_open} onClick={e => e.stopPropagation()} />
		</Dropdown>
	)

	return (
		<div
			className={cls(
				'relative flex items-start w-440px h-120px b-solid b-1 b-bd-line rd-radius-m cursor-pointer overflow-hidden',
				'[@media(hover:hover)]-hover-b-primary [@media(hover:hover)]-hover-shadow-[var(--ui-shadow-m),0_0_0_1px_var(--ui-color-primary)]',
				className
			)}
			onClick={go_feed_detail}
		>
			<Image className="w-136px h-100%" src={feed.cover} />
			<div className="flex-1 flex flex-col justify-between w-0 h-100% p-[16px]">
				<div>
					<div className="flex items-center">
						<div className="flex-1 line-clamp-1 text-16px font-700">{feed.title}</div>
						{action_ele}
					</div>
					<div className="truncate color-text-2 mt-4px">{feed.summary}</div>
				</div>
				<div className="p-[4px_8px] line-clamp-1 text-12px color-text-3 whitespace-nowrap bg-bg-2 rd-radius-m">
					<div className="flex items-center w-max max-w-100%">
						<TbUser className="mr-4px" />
						<div className="flex-1 truncate">{feed.author_info.nickname}</div>
						<RiHistoryFill className="ml-8px mr-4px" />
						{format_time(feed.update_time)}
					</div>
				</div>
			</div>
		</div>
	)
}
