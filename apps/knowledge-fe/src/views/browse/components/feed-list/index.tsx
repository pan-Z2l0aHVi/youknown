import { useEffect, useRef } from 'react'

import { get_feed_list, GetFeedListParams } from '@/apis/feed'
import MoreLoading from '@/components/more-loading'
import NoMore from '@/components/no-more'
import { useUserStore } from '@/stores'
import { useInfinity } from '@youknown/react-hook/src'

import FeedItem from './components/feed-item'

export const enum FEED_TAB {
	LATEST = 1,
	MINE = 2
}
interface FeedProps {
	feed_tab: FEED_TAB
}

export default function FeedList(props: FeedProps) {
	const { feed_tab } = props
	const profile = useUserStore(state => state.profile)
	const loading_ref = useRef<HTMLDivElement>(null)

	const feeds_fetcher = async () => {
		const params: GetFeedListParams = {
			page,
			page_size,
			sort_by: 'update_time',
			sort_type: 'desc'
		}
		if (feed_tab === FEED_TAB.MINE) {
			params.author_id = profile?.user_id
		}
		const { list } = await get_feed_list(params)
		return list
	}
	const {
		noMore: no_more,
		data: feed_list,
		page,
		pageSize: page_size,
		reload
	} = useInfinity(feeds_fetcher, {
		initialPageSize: 10,
		manual: true,
		target: loading_ref,
		observerInit: {
			rootMargin: '0px 0px 200px 0px'
		}
	})

	useEffect(() => {
		if (feed_tab) {
			reload()
		}
	}, [feed_tab, reload])

	return (
		<div className="flex-1 max-w-960px">
			{feed_list?.map(feed => {
				return <FeedItem key={feed.feed_id} feed={feed} />
			})}
			{no_more ? <NoMore /> : <MoreLoading ref={loading_ref} />}
		</div>
	)
}
