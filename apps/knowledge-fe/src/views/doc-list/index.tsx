import { useEffect, useState } from 'react'
import Header from '@/app/components/header'
import { Button, Drawer, Form, Input, Motion, Select, Space, Tooltip } from '@youknown/react-ui/src'
import { TbChecks, TbFilter, TbPlus, TbCheckbox, TbTrashX, TbX } from 'react-icons/tb'
import DocCard from './components/doc-card'
import { useBoolean, useFetch } from '@youknown/react-hook/src'
import { get_doc_list } from '@/apis'
import useTransitionNavigate from '@/hooks/use-transition-navigate'
import { cls } from '@youknown/utils/src'
import DocDeleteDialog from '@/components/doc-delete-dialog'
import { useAppSelector } from '@/hooks'

export default function DocList() {
	const is_dark_theme = useAppSelector(state => state.ui.is_dark_theme)
	const navigate = useTransitionNavigate()

	const [uid] = useState('111')
	const { data: doc_list, loading } = useFetch(get_doc_list, {
		initialData: [],
		params: [
			{
				uid
			}
		],
		refreshDeps: [uid]
	})

	const [choosing, { setTrue: do_choosing, setFalse: cancel_choosing }] = useBoolean(false)
	const [selection, set_selection] = useState<typeof doc_list>([])
	const has_selection = selection.length > 0

	useEffect(() => {
		if (!choosing) set_selection([])
	}, [choosing])

	const is_all_selected = doc_list.every(doc => selection.some(item => item.id === doc.id))
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

	const [doc_delete_dialog_open, { setTrue: show_doc_delete_dialog, setFalse: hide_doc_delete_dialog }] =
		useBoolean(false)

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
					<Button onClick={cancel_choosing} icon={<TbX className="text-16px color-primary" />}>
						取消
					</Button>
				) : (
					<>
						<Button onClick={do_choosing} icon={<TbCheckbox className="text-16px color-primary" />}>
							选择
						</Button>
						<Button icon={<TbFilter className="text-16px color-primary" />} onClick={open_filter}>
							筛选
						</Button>
					</>
				)}
			</Space>
		</Header>
	)

	const choosing_bar = (
		<Motion.Slide in={choosing} direction="up" unmountOnExit>
			<div className="fixed bottom-40px left-[calc(50%-120px)] p-8px bg-bg-1 b-1 b-solid b-bd-line b-rd-radius-l shadow-shadow-l">
				<Space align="center">
					<Tooltip spacing={12} placement="top" title="删除">
						<Button circle text disabled={!has_selection} onClick={show_doc_delete_dialog}>
							<TbTrashX className={cls('text-18px', has_selection && 'color-danger')} />
						</Button>
					</Tooltip>

					<div className="p-l-16px p-r-16px b-l-1 b-r-1 b-l-solid b-r-solid b-bd-line select-none">
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

	const create_new_doc = () => {
		navigate('/library/doc/doc-editor')
	}

	const doc_card_list = (
		<div className="grid grid-cols-[repeat(auto-fill,184px)] grid-gap-[32px_24px] justify-center">
			{choosing || (
				<div
					className={cls(
						'flex justify-center items-center h-224px bg-bg-2 b-rd-radius-l b-1 b-dashed b-bd-line cursor-pointer',
						'active-bg-active hover-not-active-bg-hover'
					)}
					onClick={create_new_doc}
				>
					<TbPlus className="text-28px color-text-3" />
				</div>
			)}

			{doc_list.map(doc => {
				const is_selected = selection.some(item => item.id === doc.id)
				const choose_doc = () => {
					if (is_selected) {
						set_selection(p => p.filter(item => item.id !== doc.id))
					} else {
						set_selection(p => [...p, doc])
					}
				}
				return (
					<DocCard
						key={doc.id}
						choosing={choosing}
						selected={is_selected}
						heading={doc.heading}
						updated_at={doc.last_modify_at}
						cover={doc.cover}
						choose={choose_doc}
					/>
				)
			})}
		</div>
	)

	return (
		<>
			{header}
			<div className="p-32px">{loading || doc_card_list}</div>
			{choosing_bar}
			<DocDeleteDialog open={doc_delete_dialog_open} hide_dialog={hide_doc_delete_dialog} />
			{filter_drawer}
		</>
	)
}
