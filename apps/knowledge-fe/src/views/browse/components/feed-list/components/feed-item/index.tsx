import { useMemo } from 'react'
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa6'
import { FiArrowRightCircle } from 'react-icons/fi'

import { Feed } from '@/apis/feed'
import TransitionLink from '@/components/transition-link'
import useFeedPraise from '@/hooks/use-feed-praise'
import useTransitionNavigate from '@/hooks/use-transition-navigate'
import { format_time } from '@/utils'
import { Avatar, Button, Image, Tooltip } from '@youknown/react-ui/src'
import { cls, QS } from '@youknown/utils/src'

interface FeedItemProps {
	feed: Feed
}
export default function FeedItem(props: FeedItemProps) {
	const { feed } = props
	const { feed_id } = feed

	const navigate = useTransitionNavigate()
	const { praise_count, toggle_praise, praised } = useFeedPraise(feed)

	const doc_detail_url = useMemo(
		() =>
			QS.stringify({
				base: '/browse/feed-detail',
				query: {
					feed_id
				}
			}),
		[feed_id]
	)

	const go_user_center = () => {
		navigate(
			QS.stringify({
				base: '/user-center',
				query: {
					target_user_id: feed.author_id
				}
			})
		)
	}

	return (
		<div key={feed.feed_id} className="b-b-bd-line b-b b-b-solid mb-32px">
			<div className="flex items-center mb-16px">
				<Avatar
					className=" cursor-pointer"
					size="small"
					round
					src={feed.author_info.avatar}
					onClick={go_user_center}
				/>

				<div className="flex items-center">
					<div className="ml-12px color-text-2 cursor-pointer" onClick={go_user_center}>
						{feed.author_info.nickname}
					</div>
					<div className="ml-8px color-text-3 text-12px">{format_time(feed.update_time)}</div>
				</div>
			</div>

			<div className="flex-1 flex pl-36px mb-8px">
				<div className="flex-1 min-h-108px">
					<TransitionLink to={doc_detail_url} className="group block w-[fit-content] mb-12px">
						<div
							className={cls(
								'inline text-16px font-600 cursor-pointer',
								'transition-property-[background-size] transition-duration-300ms ease-out',
								'bg-gradient-to-tr from-primary to-primary bg-no-repeat bg-right-bottom bg-[length:0%_2px]',
								'group-hover-bg-left-bottom group-hover-bg-[length:100%_2px]'
							)}
						>
							{feed.title}
						</div>
					</TransitionLink>

					<TransitionLink to={doc_detail_url}>
						<div className="line-clamp-3 color-text-2 hover-color-text-3 transition-colors">
							{feed.summary}
						</div>
					</TransitionLink>
				</div>

				{feed.cover && (
					<TransitionLink className="ml-48px" to={doc_detail_url}>
						<Image
							className="w-160px h-108px b-bd-line b-1 b-solid rd-radius-m"
							src={feed.cover}
							loading="lazy"
						/>
					</TransitionLink>
				)}
			</div>

			<div className="flex items-center pl-28px mb-16px">
				<Tooltip title={praised ? '已点赞' : '点赞'} placement="bottom">
					<Button text circle onClick={toggle_praise}>
						{praised ? (
							<FaThumbsUp className="text-16px color-primary" />
						) : (
							<FaRegThumbsUp className="text-16px color-primary" />
						)}
					</Button>
				</Tooltip>
				<span className={cls('min-w-24px', praised ? 'color-primary' : 'color-text-3')}>{praise_count}</span>
				<TransitionLink className="ml-8px" to={doc_detail_url}>
					<Button className="color-text-3!" text round prefixIcon={<FiArrowRightCircle size={16} />}>
						阅读全文
					</Button>
				</TransitionLink>
			</div>
		</div>
	)
}
