import './html-diff.scss'

import dayjs from 'dayjs'
import diff from 'html-diff-ts'
import { useEffect, useMemo, useState } from 'react'

import { get_doc_drafts } from '@/apis/doc'
import { useUIStore } from '@/stores'
import { useInfinity } from '@youknown/react-hook/src'
import { Button, Drawer, Loading, Select, Toast } from '@youknown/react-ui/src'
import { cls, is, macroDefer } from '@youknown/utils/src'

interface DocHistoryDrawerProps {
	open: boolean
	on_close: () => void
	doc_id: string
	doc_content: string
	on_recovery: (content: string) => void
}

export default function DocHistoryDrawer(props: DocHistoryDrawerProps) {
	const { open, on_close, doc_id, doc_content, on_recovery } = props

	const is_dark_theme = useUIStore(state => state.is_dark_theme)
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
		pageSize: page_size,
		reload,
		loadMore: load_more
	} = useInfinity(drafts_fetcher, {
		manual: true,
		initialPageSize: 50,
		onSuccess(data) {
			if (data.length < page_size) {
				return
			}
			macroDefer(() => {
				load_more()
			})
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
	const selected_draft_content = useMemo(
		() => drafts.find(draft => draft.creation_time === selection)?.content ?? '',
		[drafts, selection]
	)
	const diff_html = useMemo(() => diff(doc_content, selected_draft_content), [doc_content, selected_draft_content])

	useEffect(() => {
		if (open) {
			reload()
		}
	}, [open, reload])

	useEffect(() => {
		if (open) {
			const [default_option] = options
			if (default_option) {
				set_selection(default_option.value)
			}
		}
	}, [open, options])

	return (
		<Drawer
			className="w-880px max-w-80% overflow-y-auto b-l-solid b-l-1px b-l-bd-line shadow-shadow-l"
			maskClassName={cls(
				'backdrop-blur-xl',
				is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]'
			)}
			open={open}
			onCancel={on_close}
			placement="right"
		>
			<Loading className="w-100%!" spinning={loading}>
				<div className="sticky top-0 flex items-center justify-between p-[16px_24px] bg-bg-0 b-b-solid b-bd-line b-b-1">
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
						disabled={!selected_draft_content}
						onClick={() => {
							on_close()
							on_recovery(selected_draft_content)
						}}
					>
						应用此版本
					</Button>
				</div>

				<div className="p-[0_16px_32px_16px]">
					{selected_draft_content && (
						<div className="rich-text-container" dangerouslySetInnerHTML={{ __html: diff_html }}></div>
					)}
				</div>
			</Loading>
		</Drawer>
	)
}
