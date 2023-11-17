import '@youknown/css/src/rte-desktop.scss'

import { useSearchParams } from 'react-router-dom'

import { Feed, get_feed_detail } from '@/apis/feed'
import Header from '@/app/components/header'
import { useRecordStore } from '@/stores'
import { useFetch } from '@youknown/react-hook/src'
import { Image, Loading } from '@youknown/react-ui/src'

export default function FeedDetail() {
	const recording = useRecordStore(state => state.recording)
	const [search_params] = useSearchParams()
	const feed_id = search_params.get('feed_id') ?? ''

	const record_read_feed = (feed_info: Feed) => {
		recording({
			action: '阅读',
			target: feed_info.author_info.nickname,
			target_id: feed_info.author_id,
			obj_type: '公开文档',
			obj: feed_info.title,
			obj_id: feed_info.feed_id
		})
	}

	const { data: detail, loading } = useFetch(get_feed_detail, {
		params: [
			{
				feed_id
			}
		],
		ready: !!feed_id,
		refreshDeps: [feed_id],
		onSuccess(data) {
			record_read_feed(data)
		}
	})

	const doc_content = detail?.content ?? ''

	return (
		<>
			<Header heading={detail?.title || '详情'}></Header>

			{loading ? (
				<div className="flex justify-center items-center w-100% mt-40%">
					<Loading spinning size="large" />
				</div>
			) : (
				<div className="flex p-24px">
					<div className="w-720px m-auto">
						{detail?.cover && (
							<Image className="w-100% max-h-30vh min-h-40px  rd-radius-m" src={detail.cover} />
						)}
						<div className="rich-text-container" dangerouslySetInnerHTML={{ __html: doc_content }}></div>
					</div>
				</div>
			)}
		</>
	)
}
