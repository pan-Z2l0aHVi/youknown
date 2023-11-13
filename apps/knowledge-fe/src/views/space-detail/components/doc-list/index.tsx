import { useEffect, useRef, useState } from 'react'
import { TbChecks, TbPlus, TbTrashX, TbX } from 'react-icons/tb'

import { create_doc, delete_doc, Doc, search_docs } from '@/apis/doc'
import useTransitionNavigate from '@/hooks/use-transition-navigate'
import { useModalStore, useRecordStore, useUIStore, useUserStore } from '@/stores'
import { with_api } from '@/utils/request'
import { useInfinity } from '@youknown/react-hook/src'
import { Button, Dialog, Drawer, Form, Loading, Motion, Space, Toast, Tooltip } from '@youknown/react-ui/src'
import { cls, QS } from '@youknown/utils/src'

import DocCard from '../doc-card'
import DocFilter from '../doc-filter'

interface DocListProps {
	space_id: string
	filter_open: boolean
	close_filter: () => void
	choosing: boolean
	cancel_choosing: () => void
}
export default function DocList(props: DocListProps) {
	const { space_id, filter_open, close_filter, choosing, cancel_choosing } = props
	const is_dark_theme = useUIStore(state => state.is_dark_theme)
	const open_login_modal = useModalStore(state => state.open_login_modal)
	const has_login = useUserStore(state => state.has_login)
	const recording = useRecordStore(state => state.recording)
	const navigate = useTransitionNavigate()
	const loading_ref = useRef(null)

	const form = Form.useForm({
		defaultState: {
			keywords: '',
			sort_by: 'update_time',
			sort_type: 'desc'
		},
		async onFulfilled() {
			if (!has_login) {
				open_login_modal()
				return
			}
			await reload()
			close_filter()
		}
	})

	const docs_fetcher = async () => {
		const { keywords, sort_by, sort_type } = form.getState()
		const { list } = await search_docs({
			page,
			page_size,
			space_id,
			keywords,
			sort_by,
			sort_type
		})
		return list
	}

	const {
		page,
		pageSize: page_size,
		data: doc_list,
		noMore: no_more,
		loading,
		mutate: set_doc_list,
		reload
	} = useInfinity(docs_fetcher, {
		initialPageSize: 20,
		target: loading_ref,
		observerInit: {
			root: null,
			rootMargin: '0px 0px 200px 0px'
		},
		ready: has_login
	})

	const [create_loading, set_create_loading] = useState(false)
	const [selection, set_selection] = useState<typeof doc_list>([])
	const has_selection = selection.length > 0

	useEffect(() => {
		if (!choosing) set_selection([])
	}, [choosing])

	const is_all_selected = doc_list.every(doc => selection.some(item => item.doc_id === doc.doc_id))
	const toggle_select_all = () => {
		set_selection(is_all_selected ? [] : doc_list)
	}

	const create_new_doc = async () => {
		if (!has_login) {
			open_login_modal()
			return
		}
		set_create_loading(true)
		const [err, res] = await with_api(create_doc)({
			space_id,
			title: '未命名'
		})
		set_create_loading(false)
		if (err) {
			return
		}
		Toast.success({ content: '创建文档成功' })
		navigate(
			QS.stringify({
				base: `editor`,
				query: {
					doc_id: res.doc_id
				}
			})
		)
	}

	const selected_ids = selection.map(item => item.doc_id)

	const record_batching_delete_doc = () => {
		selection.forEach(item => {
			recording({
				action: '批量删除',
				target: '',
				target_id: '',
				obj_type: '文档',
				obj: item.title,
				obj_id: item.doc_id
			})
		})
	}

	const record_delete_doc = (doc_info: Doc) => {
		recording({
			action: '删除',
			target: '',
			target_id: '',
			obj_type: '文档',
			obj: doc_info.title,
			obj_id: doc_info.doc_id
		})
	}

	const record_update_doc = (doc_info: Doc) => {
		recording({
			action: doc_info.public ? '更新并发布' : '更新',
			target: '',
			target_id: '',
			obj_type: '文档',
			obj: doc_info.title,
			obj_id: doc_info.doc_id
		})
	}

	const show_doc_delete_dialog = () => {
		Dialog.confirm({
			title: '批量删除文档',
			content: '一旦执行该操作数据将无法恢复，是否确认删除？',
			overlayClassName: cls(
				'backdrop-blur-xl',
				is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]'
			),
			okDanger: true,
			okText: '删除',
			cancelText: '取消',
			closeIcon: null,
			unmountOnExit: true,
			onOk: async () => {
				await delete_doc({ doc_ids: selected_ids })
				set_doc_list(p => p.filter(item => !selected_ids.includes(item.doc_id)))
				cancel_choosing()
				record_batching_delete_doc()
			}
		})
	}

	const filter_drawer = (
		<Drawer
			className="w-440px shadow-shadow-l"
			overlayClassName={cls(
				'backdrop-blur-xl',
				is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]'
			)}
			open={filter_open}
			onCancel={close_filter}
		>
			<DocFilter form={form} loading={loading} on_cancel={close_filter} />
		</Drawer>
	)

	const choosing_bar = (
		<Motion.Slide in={choosing} direction="up" unmountOnExit>
			<div className="z-2 fixed bottom-40px left-[calc(50%-120px)] p-8px bg-bg-1 b-1 b-solid b-bd-line rd-radius-l shadow-shadow-l">
				<Space align="center">
					<Tooltip disabled={!has_selection} spacing={12} placement="top" title="批量删除">
						<Button circle text disabled={!has_selection} onClick={show_doc_delete_dialog}>
							<TbTrashX className={cls('text-16px', has_selection && 'color-danger')} />
						</Button>
					</Tooltip>

					<div className="pl-16px pr-16px b-l-1 b-r-1 b-l-solid b-r-solid b-bd-line select-none color-text-2">
						已选中：<span className="inline-block min-w-32px color-text-1">{selection.length}</span>
					</div>

					<Tooltip spacing={12} placement="top" title={is_all_selected ? '取消全选' : '全选'}>
						<Button circle text onClick={toggle_select_all}>
							<TbChecks className={cls('text-16px', is_all_selected && 'color-primary')} />
						</Button>
					</Tooltip>
					<Tooltip spacing={12} placement="top" title="取消选择">
						<Button circle text onClick={cancel_choosing}>
							<TbX className="text-16px" />
						</Button>
					</Tooltip>
				</Space>
			</div>
		</Motion.Slide>
	)

	const doc_card_list = (
		<div className="grid grid-cols-[repeat(auto-fill,184px)] grid-gap-[32px_24px] justify-center">
			{choosing || (
				<Loading className="w-100%!" spinning={create_loading} size="large">
					<div
						className={cls(
							'flex justify-center items-center h-224px bg-bg-2 rd-radius-l b-1 b-dashed b-bd-line cursor-pointer',
							'group active-bg-active hover-not-active-bg-hover hover-b-primary hover-b-2px'
						)}
						onClick={create_new_doc}
					>
						<TbPlus className="text-28px color-text-3 group-hover-color-primary" />
					</div>
				</Loading>
			)}

			{doc_list.map(doc => {
				const is_selected = selection.some(item => item.doc_id === doc.doc_id)
				const on_choose = () => {
					if (is_selected) {
						set_selection(p => p.filter(item => item.doc_id !== doc.doc_id))
					} else {
						set_selection(p => [...p, doc])
					}
				}
				const on_deleted = () => {
					set_doc_list(p => p.filter(item => item.doc_id !== doc.doc_id))
					record_delete_doc(doc)
				}
				const on_updated = (doc: Doc) => {
					set_doc_list(p => {
						const result = p.slice()
						const index = p.findIndex(item => item.doc_id === doc.doc_id)
						result.splice(index, 1, doc)
						return result
					})
					record_update_doc(doc)
				}
				return (
					<DocCard
						key={doc.doc_id}
						choosing={choosing}
						selected={is_selected}
						info={doc}
						on_choose={on_choose}
						on_deleted={on_deleted}
						on_updated={on_updated}
					/>
				)
			})}
		</div>
	)

	return (
		<>
			<div className="p-32px">{doc_card_list}</div>
			{has_login && (
				<>
					{no_more ? (
						<div
							className={cls(
								'relative flex justify-center items-center h-80px',
								'after:absolute after:content-empty after:w-240px after:b-b-1 after:b-b-solid after:b-bd-line'
							)}
						>
							<div className="z-1 pl-8px pr-8px bg-bg-0 color-text-2">没有更多内容了</div>
						</div>
					) : (
						<div ref={loading_ref} className="flex justify-center items-center h-80px">
							<Loading spinning className="mr-8px" />
							<span className="color-text-2">加载中...</span>
						</div>
					)}
				</>
			)}
			{choosing_bar}
			{filter_drawer}
		</>
	)
}
