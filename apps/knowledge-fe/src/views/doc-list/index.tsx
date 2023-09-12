import { useEffect, useRef, useState } from 'react'
import { TbCheckbox, TbChecks, TbFilter, TbPlus, TbTrashX, TbX } from 'react-icons/tb'

import { create_doc, delete_doc, Doc, get_docs } from '@/apis/doc'
import Header from '@/app/components/header'
import { useAppContentEl } from '@/hooks'
import useTransitionNavigate from '@/hooks/use-transition-navigate'
import { useModalStore, useRecordStore, useUIStore, useUserStore } from '@/stores'
import { useBoolean, useInfinity } from '@youknown/react-hook/src'
import {
	Button,
	Dialog,
	Drawer,
	Form,
	Input,
	Loading,
	Motion,
	Select,
	Space,
	Toast,
	Tooltip
} from '@youknown/react-ui/src'
import { cls, QS } from '@youknown/utils/src'

import DocCard from './components/doc-card'

export default function DocList() {
	const is_dark_theme = useUIStore(state => state.is_dark_theme)
	const open_login_modal = useModalStore(state => state.open_login_modal)
	const has_login = useUserStore(state => state.has_login)
	const recording = useRecordStore(state => state.recording)
	const navigate = useTransitionNavigate()
	const app_content_el = useAppContentEl()
	const loading_ref = useRef(null)

	const docs_fetcher = async () => {
		const { list } = await get_docs({
			page,
			page_size
		})
		return list
	}

	const {
		page,
		pageSize: page_size,
		data: doc_list,
		noMore: no_more,
		mutate: set_doc_list
	} = useInfinity(docs_fetcher, {
		initialPageSize: 20,
		target: loading_ref,
		observerInit: {
			root: app_content_el,
			rootMargin: '0px 0px 200px 0px'
		},
		ready: has_login,
		onError() {
			Toast.show({ title: '服务异常，请稍后再试' })
		}
	})

	const [choosing, { setTrue: do_choosing, setFalse: cancel_choosing }] = useBoolean(false)
	const [selection, set_selection] = useState<typeof doc_list>([])
	const has_selection = selection.length > 0

	useEffect(() => {
		if (!choosing) set_selection([])
	}, [choosing])

	const is_all_selected = doc_list.every(doc => selection.some(item => item.doc_id === doc.doc_id))
	const toggle_select_all = () => {
		set_selection(is_all_selected ? [] : doc_list)
	}

	const [filter_open, { setTrue: open_filter, setFalse: close_filter }] = useBoolean(false)
	const form = Form.useForm({
		defaultState: {
			keywords: '',
			order_by: 1
		},
		onFulfilled(val) {
			console.log('submit val', val)
			close_filter()
		}
	})

	const create_new_doc = async () => {
		if (!has_login) {
			open_login_modal()
			return
		}
		const payload = {
			title: '未命名',
			content: 'new 123123'
		}
		try {
			const { doc_id } = await create_doc(payload)
			navigate(
				QS.stringify({
					base: '/library/doc/doc-editor',
					query: { doc_id }
				})
			)
		} catch (error) {
			console.error('error: ', error)
		}
	}

	const selected_ids = selection.map(item => item.doc_id)

	const on_batching_deleted = () => {
		set_doc_list(p => p.filter(item => !selected_ids.includes(item.doc_id)))
		cancel_choosing()
		selection.forEach(item => {
			recording({
				action: '删除',
				target: '',
				target_id: '',
				obj_type: '文章',
				obj: item.title,
				obj_id: item.doc_id
			})
		})
	}

	const show_doc_delete_dialog = () => {
		Dialog.confirm({
			title: '批量删除文档',
			content: '一旦执行该操作数据将无法恢复，是否确认删除？',
			maskClassName: cls(
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
				on_batching_deleted()
			}
		})
	}

	const filter_drawer = (
		<Drawer
			className="b-l-solid b-l-1px b-l-bd-line shadow-shadow-l"
			maskClassName={cls(
				'backdrop-blur-xl',
				is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]'
			)}
			open={filter_open}
			onCancel={close_filter}
		>
			<div className="p-[32px_24px_32px_16px]">
				<Form form={form} labelWidth="80px">
					<Form.Field label="keywords" labelText="关键字">
						<Input placeholder="请输入" />
					</Form.Field>
					<Form.Field label="order_by" labelText="排序">
						<Select
							options={[
								{
									label: '最新',
									value: 1
								}
							]}
						/>
					</Form.Field>
					<Form.Field labelText=" ">
						<Space>
							<Button onClick={close_filter}>取消</Button>
							<Button type="submit" primary>
								筛选
							</Button>
						</Space>
					</Form.Field>
				</Form>
			</div>
		</Drawer>
	)

	const header = (
		<Header heading="文档" bordered sticky>
			<Space>
				{choosing ? (
					<Button onClick={cancel_choosing} prefixIcon={<TbX className="text-16px color-primary" />}>
						取消
					</Button>
				) : (
					<>
						<Button onClick={do_choosing} prefixIcon={<TbCheckbox className="text-16px color-primary" />}>
							选择
						</Button>
						<Button prefixIcon={<TbFilter className="text-16px color-primary" />} onClick={open_filter}>
							筛选
						</Button>
					</>
				)}
			</Space>
		</Header>
	)

	const choosing_bar = (
		<Motion.Slide in={choosing} direction="up" unmountOnExit>
			<div className="z-2 fixed bottom-40px left-[calc(50%-120px)] p-8px bg-bg-1 b-1 b-solid b-bd-line b-rd-radius-l shadow-shadow-l">
				<Space align="center">
					<Tooltip spacing={12} placement="top" title="删除">
						<Button circle text disabled={!has_selection} onClick={show_doc_delete_dialog}>
							<TbTrashX className={cls('text-18px', has_selection && 'color-danger')} />
						</Button>
					</Tooltip>

					<div className="pl-16px pr-16px b-l-1 b-r-1 b-l-solid b-r-solid b-bd-line select-none">
						已选中：{selection.length}
					</div>

					<Tooltip spacing={12} placement="top" title={is_all_selected ? '取消全选' : '全选'}>
						<Button circle text onClick={toggle_select_all}>
							<TbChecks className={cls('text-16px', is_all_selected && 'color-primary')} />
						</Button>
					</Tooltip>
					<Tooltip spacing={12} placement="top" title="取消选择">
						<Button circle text onClick={cancel_choosing}>
							<TbX className="text-18px" />
						</Button>
					</Tooltip>
				</Space>
			</div>
		</Motion.Slide>
	)

	const doc_card_list = (
		<div className="grid grid-cols-[repeat(auto-fill,184px)] grid-gap-[32px_24px] justify-center">
			{choosing || (
				<div
					className={cls(
						'flex justify-center items-center h-224px bg-bg-2 b-rd-radius-l b-1 b-dashed b-bd-line cursor-pointer',
						'group active-bg-active hover-not-active-bg-hover hover-b-primary hover-b-2px'
					)}
					onClick={create_new_doc}
				>
					<TbPlus className="text-28px color-text-3 group-hover-color-primary" />
				</div>
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
					recording({
						action: '删除',
						target: '',
						target_id: '',
						obj_type: '文章',
						obj: doc.title,
						obj_id: doc.doc_id
					})
				}
				const on_updated = (doc: Doc) => {
					set_doc_list(p => {
						const result = p.slice()
						const index = p.findIndex(item => item.doc_id === doc.doc_id)
						result.splice(index, 1, doc)
						return result
					})
					recording({
						action: doc.public ? '发布' : '更新',
						target: '',
						target_id: '',
						obj_type: '文章',
						obj: doc.title,
						obj_id: doc.doc_id
					})
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
			{header}
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
