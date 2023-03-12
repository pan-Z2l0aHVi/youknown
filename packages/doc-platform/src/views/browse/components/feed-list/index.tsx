import { get_feed_list } from '@/api'
import TransitionLink from '@/components/transition-link'
import { useFetch } from '@youknown/react-hook/src'
import { Avatar, Button, Image } from '@youknown/react-ui/src'
import { QS } from '@youknown/utils/src'
import React from 'react'
import { TbThumbUp } from 'react-icons/tb'

interface FeedProps {
	feed_tab: number
}

export default function FeedList(props: FeedProps) {
	const { feed_tab } = props
	const { data: feed_list } = useFetch(get_feed_list, {
		initialData: [],
		params: [
			{
				feed_tab: feed_tab
			}
		],
		refreshDeps: [feed_tab]
	})

	return (
		<div className="max-w-960px">
			{feed_list.map(feed => {
				const doc_detail_url = QS.stringify({
					base: '/browse/doc-detail',
					query: {
						doc_id: feed.id
					}
				})

				return (
					<div key={feed.id} className="border-b-bd-line border-b mb-32px">
						<div className="flex items-center mb-16px">
							<Avatar size="small" round src={feed.user.avatar} />

							<div className="flex items-center">
								<div className="ml-12px">{feed.user.nickname}</div>
								<div className="ml-8px color-text-3 text-12px">{feed.last_modify_at}</div>
							</div>
						</div>

						<div className="flex-1 flex pl-36px mb-12px">
							<div className="flex-1">
								<TransitionLink to={doc_detail_url}>
									<div className="text-16px font-600 mb-12px cursor-pointer hover-color-text-2">
										{feed.heading}
									</div>
								</TransitionLink>

								<div className="" dangerouslySetInnerHTML={{ __html: feed.content.html }}></div>
							</div>

							<Image
								className="w-160px h-108px b-bd-line b-1 b-rd-radius-m object-cover ml-48px"
								src={feed.cover}
								loading="lazy"
							/>
						</div>

						<div className="flex pl-28px mb-16px">
							<Button className="!w-auto min-w-auto !pl-8px !pr-8px" text circle size="small">
								<TbThumbUp className="text-16px" />

								{feed.likes_count && <span className="ml-8px">{feed.likes_count}</span>}
							</Button>
						</div>
					</div>
				)
			})}
		</div>
	)
}
