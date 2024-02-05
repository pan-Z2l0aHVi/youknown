import { useRef, useState } from 'react'

import { Feed, get_related_feeds } from '@/apis/feed'
import MoreLoading from '@/components/more-loading'
import { useTransitionNavigate } from '@/hooks/use-transition-navigate'
import { useInfinity } from '@youknown/react-hook/src'
import { Image } from '@youknown/react-ui/src'
import { QS } from '@youknown/utils/src'

interface RelatedAreaProps {
	feed: Feed
}
export default function RelatedArea(props: RelatedAreaProps) {
	const { feed } = props

	const navigate = useTransitionNavigate()

	const go_feed_detail = (feed_info: Feed) => {
		navigate(
			QS.stringify({
				base: '/browse/feed-detail',
				query: {
					feed_id: feed_info.id
				}
			}),
			{ state: feed_info }
		)
		window.scrollTo({ top: 0, behavior: 'instant' })
	}

	const container_ref = useRef<HTMLDivElement>(null)
	const loading_ref = useRef<HTMLDivElement>(null)
	const [feeds_total, set_feeds_total] = useState(0)
	const fetcher = async () => {
		const { list, total } = await get_related_feeds({
			space_id: feed.subject.space_id,
			page,
			page_size
		})
		set_feeds_total(total)
		return list
	}
	const {
		data: feeds,
		noMore: no_more,
		page,
		pageSize: page_size
	} = useInfinity(fetcher, {
		target: loading_ref,
		observerInit: {
			root: container_ref.current
		}
	})

	return (
		<div
			ref={container_ref}
			className="w-720px max-w-100% max-h-200px overflow-y-auto p-8px ml-auto mr-auto mt-32px mb-32px
			rd-radius-m bg-bg-2"
		>
			<div className="font-600 truncate pl-8px pr-8px mb-8px">相关内容 {feeds_total}条</div>
			{feeds.map(feed_info => {
				const { subject } = feed_info
				return (
					<div
						key={subject.doc_id}
						className="flex items-center p-8px rd-radius-m
						active-bg-secondary-active [@media(hover:hover)]-hover-not-active-bg-secondary-hover cursor-pointer"
						onClick={() => go_feed_detail(feed_info)}
					>
						<Image className="w-40px h-32px rd-radius-m mr-16px" src={subject.cover} />
						<div className="flex-1 w-0 truncate">{subject.title}</div>
					</div>
				)
			})}
			{no_more || <MoreLoading ref={loading_ref} />}
		</div>
	)
}
