import { get_feed_list } from '@/apis/feed'
import { useInfinity } from '@youknown/react-hook/src'

import FeedItem from './components/feed-item'

interface FeedProps {
	feed_tab: 1 | 2
}

export default function FeedList(props: FeedProps) {
	const { feed_tab } = props

	const feeds_fetcher = async () => {
		const { list } = await get_feed_list({
			page,
			page_size,
			sort_by: 'update_time',
			sort_type: 'desc'
		})
		return list
	}
	const {
		data: feed_list,
		page,
		pageSize: page_size
	} = useInfinity(feeds_fetcher, {
		refreshDeps: [feed_tab],
		initialPageSize: 10
	})

	return (
		<div className="flex-1 max-w-960px">
			{feed_list?.map(feed => {
				return <FeedItem key={feed.feed_id} feed={feed} />
			})}
		</div>
	)
}
