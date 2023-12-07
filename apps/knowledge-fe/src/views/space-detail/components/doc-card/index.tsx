import copy from 'copy-to-clipboard'
import { useRef } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { GoCheck } from 'react-icons/go'
import { LuSettings2 } from 'react-icons/lu'
import { PiTrashSimpleBold } from 'react-icons/pi'
import { RiGlobalLine, RiHistoryFill } from 'react-icons/ri'
import { TbShare2 } from 'react-icons/tb'

import { delete_doc, Doc } from '@/apis/doc'
import DocOptionsModal from '@/components/doc-options-modal'
import More from '@/components/more'
import useTransitionNavigate from '@/hooks/use-transition-navigate'
import { useModalStore, useUIStore, useUserStore } from '@/stores'
import { format_time } from '@/utils'
import { useBoolean } from '@youknown/react-hook/src'
import { Dialog, Dropdown, Motion, Toast } from '@youknown/react-ui/src'
import { cls, QS } from '@youknown/utils/src'

interface DocCardProps {
	choosing: boolean
	selected: boolean
	info: Doc
	on_choose: () => void
	on_deleted: () => void
	on_updated: (doc: Doc) => void
}
export default function DocCard(props: DocCardProps) {
	const { choosing, selected, info, on_choose, on_deleted, on_updated } = props

	const navigate = useTransitionNavigate()
	const has_login = useUserStore(state => state.has_login)
	const open_login_modal = useModalStore(state => state.open_login_modal)
	const is_dark_theme = useUIStore(state => state.is_dark_theme)
	const [more_open, { setBool: set_more_open }] = useBoolean(false)
	const [doc_options_modal_open, { setTrue: show_doc_options_modal, setFalse: hide_doc_options_modal }] =
		useBoolean(false)

	const select_doc = () => {
		if (choosing) {
			on_choose?.()
		} else {
			navigate(
				QS.stringify({
					base: 'editor',
					query: {
						doc_id: info.doc_id
					}
				})
			)
		}
	}
	const edit_doc_options = () => {
		if (!has_login) {
			open_login_modal()
			return
		}
		show_doc_options_modal()
	}
	const handle_delete_doc = () => {
		if (!has_login) {
			open_login_modal()
			return
		}
		Dialog.confirm({
			title: '删除文档',
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
				await delete_doc({ doc_ids: [info.doc_id] })
				on_deleted()
			}
		})
	}
	const copy_share_url = () => {
		copy(
			QS.stringify({
				base: `${window.location.origin}/browse/feed-detail`,
				query: {
					feed_id: info.doc_id
				}
			})
		)
		Toast.success({ content: '已复制分享链接' })
	}

	const container_ref = useRef(null)
	const footer = (
		<Motion.Slide in={!choosing} appear={false} container={container_ref.current} direction="up" unmountOnExit>
			<div className="flex items-center justify-between p-12px bg-bg-1 b-t-bd-line b-t-1 b-t-solid cursor-default">
				<div className="flex items-center color-text-3">
					<RiHistoryFill className="mr-4px text-14px" />
					<span className="text-12px">{format_time(info.update_time)}</span>
				</div>

				<Dropdown
					trigger="click"
					content={
						<Dropdown.Menu className="w-120px" closeAfterItemClick>
							<Dropdown.Item prefix={<FiEdit3 className="text-16px" />} onClick={select_doc}>
								编辑
							</Dropdown.Item>
							{info.public && (
								<Dropdown.Item prefix={<TbShare2 className="text-16px" />} onClick={copy_share_url}>
									分享
								</Dropdown.Item>
							)}
							<Dropdown.Item prefix={<LuSettings2 className="text-16px" />} onClick={edit_doc_options}>
								文档设置
							</Dropdown.Item>
							<Dropdown.Item
								prefix={<PiTrashSimpleBold className="color-danger text-16px" />}
								onClick={handle_delete_doc}
							>
								<span className="color-danger">删除</span>
							</Dropdown.Item>
						</Dropdown.Menu>
					}
					onOpenChange={set_more_open}
				>
					<More active={more_open} />
				</Dropdown>
			</div>
		</Motion.Slide>
	)
	return (
		<>
			<div
				ref={container_ref}
				className={cls(
					'relative flex flex-col h-224px b-1 b-solid b-bd-line rd-radius-l',
					'bg-bg-1 bg-cover bg-center cursor-pointer overflow-hidden select-none',
					selected
						? 'b-primary shadow-[var(--ui-shadow-m),0_0_0_1px_var(--ui-color-primary)]'
						: '[@media(hover:hover)]-hover-b-primary [@media(hover:hover)]-hover-shadow-[var(--ui-shadow-m),0_0_0_1px_var(--ui-color-primary)]'
				)}
				style={{ backgroundImage: `url("${info.cover}")` }}
			>
				{info.public && (
					<div
						className="absolute top-0 left-16px w-20px h-24px bg-primary text-center"
						style={{ clipPath: 'polygon(0% 0%, 100% 0, 100% 100%, 50% 75%, 0% 100%)' }}
					>
						<RiGlobalLine className="color-#fff text-16px mt-1px" />
					</div>
				)}
				{choosing && selected && (
					<div
						className={cls(
							'absolute top-8px right-8px flex items-center justify-center w-24px h-24px',
							'rd-full b-4px b-solid b-[rgba(255,255,255,0.8)] bg-primary'
						)}
					>
						<GoCheck className="text-14px color-#fff" />
					</div>
				)}

				<div className="flex-1 pt-32px" onClick={select_doc}>
					<div
						className={cls(
							'p-[0_8px_0_12px] text-16px font-600 select-none',
							is_dark_theme ? 'text-shadow-[0px_0px_4px_#000]' : 'text-shadow-[0px_0px_4px_#fff]'
						)}
					>
						{info.title}
					</div>
				</div>

				{footer}
			</div>

			<DocOptionsModal
				open={doc_options_modal_open}
				hide_modal={hide_doc_options_modal}
				doc_id={info.doc_id}
				on_updated={on_updated}
			/>
		</>
	)
}
