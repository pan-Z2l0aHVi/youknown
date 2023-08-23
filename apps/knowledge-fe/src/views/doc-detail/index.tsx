import '@youknown/css/src/rte-desktop.scss'

import { useSearchParams } from 'react-router-dom'

import { get_doc_info } from '@/apis/doc'
import Header from '@/app/components/header'
import { useFetch } from '@youknown/react-hook/src'
import { Loading } from '@youknown/react-ui/src'

import Comments from './components/comments'
import { useDispatch } from 'react-redux'
import { record } from '@/store/record'

export default function DocDetail() {
	const dispatch = useDispatch()
	const [search] = useSearchParams()
	const doc_id = search.get('doc_id') ?? ''

	const { data: doc_info, loading } = useFetch(get_doc_info, {
		params: [
			{
				doc_id
			}
		],
		ready: !!doc_id,
		refreshDeps: [doc_id],
		onSuccess(data) {
			dispatch(
				record({
					action: '阅读',
					target: data.author_info.nickname,
					target_id: data.author_id,
					obj_type: '文章',
					obj: data.title,
					obj_id: data.doc_id
				})
			)
		}
	})

	const doc_content = doc_info?.content ?? ''

	return (
		<>
			<Header heading="文档" bordered sticky></Header>

			{loading ? (
				<div className="flex justify-center items-center w-100% mt-40%">
					<Loading spinning size="large" />
				</div>
			) : (
				<div className="flex p-24px">
					<div className="w-720px m-auto">
						<div className="rich-text-container" dangerouslySetInnerHTML={{ __html: doc_content }}></div>
					</div>
				</div>
			)}

			<Comments doc_id={doc_id} />
		</>
	)
}
