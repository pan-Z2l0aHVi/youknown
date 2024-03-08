import { useInfinity } from '@youknown/react-hook/src'
import { Image, List } from '@youknown/react-ui/src'
import { cls, QS } from '@youknown/utils/src'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbChevronRight } from 'react-icons/tb'

import { Feed, get_related_feeds } from '@/apis/feed'
import MoreLoading from '@/components/more-loading'
import { useTransitionNavigate } from '@/hooks/use-transition-navigate'

interface RelatedAreaProps {
	feed: Feed
}
export default function RelatedArea(props: RelatedAreaProps) {
	const { feed } = props

	const navigate = useTransitionNavigate()
	const { t } = useTranslation()

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
	}

	const list_ref = useRef<HTMLDivElement>(null)
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
			root: list_ref.current
		}
	})

	// 获取关联列表需滤除当前动态
	const related_total = feeds_total - 1
	const related_feeds = feeds.filter(item => item.id !== feed.id)

	const related_list = (
		<List className="max-h-224px overflow-y-auto " ref={list_ref}>
			{related_feeds.map(feed_info => {
				const { subject } = feed_info
				return (
					<List.Item
						key={subject.doc_id}
						prefix={<Image className="w-40px h-32px rd-radius-m" src={subject.cover} />}
						suffix={<TbChevronRight className="color-text-3 text-16px" />}
						className="active-bg-active [@media(hover:hover)]-hover-not-active-bg-hover cursor-pointer"
						onClick={() => go_feed_detail(feed_info)}
					>
						<div className="truncate">{subject.title}</div>
					</List.Item>
				)
			})}
			{no_more || <MoreLoading ref={loading_ref} />}
		</List>
	)

	return (
		<div className={cls('mt-32px mb-32px', !related_total && 'hidden')}>
			<div className="font-700 text-18px mb-24px">
				{related_total} {t('related.feed_count')}
			</div>
			{related_list}
		</div>
	)
}
