import { get_doc_detail } from '@/api'
import BackTop from '@/app/components/back-top'
import Header from '@/app/components/header'
import { useFetch } from '@youknown/react-hook/src'
import { Loading } from '@youknown/react-ui/src'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import './rich-text.scss'

export default function DocDetail() {
	const [search] = useSearchParams()
	const doc_id = search.get('doc_id') ?? ''

	const { data: doc_detail, loading } = useFetch(get_doc_detail, {
		initialData: null,
		params: [
			{
				doc_id
			}
		],
		refreshDeps: [doc_id]
	})

	const doc_content = doc_detail?.content.html ?? ''

	return (
		<>
			<Header heading="文档" bordered sticky></Header>

			<BackTop />

			{loading ? (
				<div className="flex justify-center items-center w-100% m-t-40%">
					<Loading size="large" />
				</div>
			) : (
				<div className="flex p-24px">
					<div className="w-720px m-auto">
						<div className="rich-text-container" dangerouslySetInnerHTML={{ __html: doc_content }}></div>
					</div>
				</div>
			)}
		</>
	)
}
