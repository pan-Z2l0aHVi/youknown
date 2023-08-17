import dayjs from 'dayjs'
import { useRef } from 'react'
import { GoCheck } from 'react-icons/go'
import { RiHistoryFill } from 'react-icons/ri'

import { Doc } from '@/apis/doc'
import DocDeleteDialog from '@/components/doc-delete-dialog'
import DocOptionsModal from '@/components/doc-options-modal'
import More from '@/components/more'
import { useAppDispatch, useAppSelector } from '@/hooks'
import useTransitionNavigate from '@/hooks/use-transition-navigate'
import { open_login_modal } from '@/store/modal'
import { useBoolean } from '@youknown/react-hook/src'
import { Dropdown, Motion } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

interface DocCardProps {
	choosing: boolean
	selected: boolean
	info: Doc
	on_choose: () => void
	on_deleted: () => void
}
export default function DocCard(props: DocCardProps) {
	const { choosing, selected, info, on_choose, on_deleted } = props

	const is_login = useAppSelector(state => state.user.is_login)
	const dispatch = useAppDispatch()
	const navigate = useTransitionNavigate()
	const [more_open, { setBool: set_more_open }] = useBoolean(false)
	const [doc_delete_dialog_open, { setTrue: show_doc_delete_dialog, setFalse: hide_doc_delete_dialog }] =
		useBoolean(false)
	const [doc_options_modal_open, { setTrue: show_doc_options_modal, setFalse: hide_doc_options_modal }] =
		useBoolean(false)

	const select_doc = () => {
		if (choosing) {
			on_choose?.()
		} else {
			navigate('/library/doc/doc-editor')
		}
	}
	const edit_doc_options = () => {
		if (!is_login) {
			dispatch(open_login_modal())
			return
		}
		show_doc_options_modal()
	}
	const delete_doc = () => {
		if (!is_login) {
			dispatch(open_login_modal())
			return
		}
		show_doc_delete_dialog()
	}

	const container_ref = useRef(null)

	return (
		<>
			<div
				ref={container_ref}
				className={cls(
					'relative flex flex-col h-224px b-1 b-solid b-rd-radius-l',
					'bg-bg-1 bg-cover cursor-pointer overflow-hidden',
					selected
						? 'b-primary shadow-[0_0_0_1px_var(--ui-color-primary)]'
						: 'b-bd-line hover-b-primary hover-shadow-shadow-m'
				)}
				style={{ backgroundImage: `url(${info.cover})` }}
			>
				{choosing && selected && (
					<div
						className={cls(
							'absolute top-8px right-8px flex items-center justify-center w-24px h-24px',
							'b-rd-round b-4px b-solid b-[rgba(255,255,255,0.8)] bg-primary'
						)}
					>
						<GoCheck className="text-14px color-#fff" />
					</div>
				)}

				<div className="flex-1 pt-32px" onClick={select_doc}>
					<div className="p-[0_8px_0_12px] text-16px font-600 select-none">{info.title}</div>
				</div>

				<Motion.Slide
					in={!choosing}
					appear={false}
					container={container_ref.current}
					direction="up"
					unmountOnExit
				>
					<div className="flex items-center justify-between p-12px bg-bg-1 b-t-bd-line b-t-1 b-t-solid cursor-default">
						<div className="flex items-center color-text-3">
							<RiHistoryFill className="mr-4px text-14px" />
							<span className="text-12px">{dayjs(info.update_time).format('YYYY-MM-DD')}</span>
						</div>

						<Dropdown
							trigger="click"
							content={
								<Dropdown.Menu className="w-120px">
									<Dropdown.Item closeAfterItemClick onClick={select_doc}>
										<span>编辑</span>
									</Dropdown.Item>
									<Dropdown.Item closeAfterItemClick onClick={edit_doc_options}>
										<span>文档设置</span>
									</Dropdown.Item>
									<Dropdown.Item closeAfterItemClick onClick={delete_doc}>
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
			</div>

			<DocDeleteDialog
				open={doc_delete_dialog_open}
				hide_dialog={hide_doc_delete_dialog}
				doc_ids={[info.doc_id]}
				on_deleted={on_deleted}
			/>
			<DocOptionsModal open={doc_options_modal_open} hide_modal={hide_doc_options_modal} doc_id={info.doc_id} />
		</>
	)
}
