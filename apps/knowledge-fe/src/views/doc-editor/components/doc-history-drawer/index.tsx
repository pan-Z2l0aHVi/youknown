import './html-diff.scss'

import dayjs from 'dayjs'
import diff from 'html-diff-ts'
import { useEffect, useMemo, useState } from 'react'

import { get_doc_drafts } from '@/apis/doc'
import { useInfinity } from '@youknown/react-hook/src'
import { Button, Divider, Drawer, Loading, Select, Toast } from '@youknown/react-ui/src'
import { is } from '@youknown/utils/src'

interface DocHistoryDrawerProps {
	open: boolean
	on_close: () => void
	doc_id: string
	doc_content: string
	on_recovery: (content: string) => void
}

export default function DocHistoryDrawer(props: DocHistoryDrawerProps) {
	const { open, on_close, doc_id, doc_content, on_recovery } = props

	const [selection, set_selection] = useState<string>()

	const drafts_fetcher = async () => {
		const list = await get_doc_drafts({
			doc_id,
			page,
			page_size
		})
		return list
	}
	const {
		loading,
		data: drafts,
		page,
		pageSize: page_size
	} = useInfinity(drafts_fetcher, {
		ready: open,
		initialPageSize: 100,
		onError() {
			Toast.error({ content: '服务异常，请稍后再试' })
		}
	})

	const options = useMemo(
		() =>
			drafts.map(draft => {
				return {
					label: dayjs(draft.creation_time).format('YYYY-MM-DD HH:mm'),
					value: draft.creation_time
				}
			}),
		[drafts]
	)
	const selectedDraftContent = useMemo(
		() => drafts.find(draft => draft.creation_time === selection)?.content ?? '',
		[drafts, selection]
	)
	const diffContent = useMemo(() => diff(doc_content, selectedDraftContent), [doc_content, selectedDraftContent])

	useEffect(() => {
		if (open) {
			const [default_option] = options
			if (default_option) {
				set_selection(default_option.value)
			}
		}
	}, [open, options])

	return (
		<Drawer className="w-880px max-w-80% overflow-y-auto" open={open} onCancel={on_close} placement="right">
			<Loading className="w-100%!" spinning={loading}>
				<div className="sticky top-0 flex items-center justify-between p-[16px_24px] bg-bg-0 b-b-solid b-bd-line b-b-1px">
					<div className="flex items-center">
						<span>当前版本</span>
						<span className="mr-8px ml-8px color-text-3">与</span>
						<Select
							className="w-200px!"
							value={selection}
							onChange={val => {
								if (!is.array(val)) {
									set_selection(val)
								}
							}}
							options={options}
							placeholder="请选择历史"
						/>
						<span className="ml-8px color-text-3">对比</span>
					</div>

					<Button
						onClick={() => {
							on_close()
							on_recovery(selectedDraftContent)
						}}
					>
						应用此版本
					</Button>
				</div>

				<div className="p-[0_16px_32px_16px]">
					<div className="rich-text-container" dangerouslySetInnerHTML={{ __html: diffContent }}></div>
				</div>
			</Loading>
		</Drawer>
	)
}
