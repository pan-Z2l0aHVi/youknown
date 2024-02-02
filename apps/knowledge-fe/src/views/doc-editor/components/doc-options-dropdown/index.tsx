import copy from 'copy-to-clipboard'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LuLogOut, LuSettings2 } from 'react-icons/lu'
import { MdOutlineIosShare } from 'react-icons/md'
import { PiTrashSimpleBold } from 'react-icons/pi'
import { TbChevronRight } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom'

import { delete_doc, Doc } from '@/apis/doc'
import DocOptionsModal from '@/components/doc-options-modal'
import More from '@/components/more'
import { is_dark_theme_getter, useUIStore } from '@/stores'
import { format_time } from '@/utils'
import { with_api } from '@/utils/request'
import { useBoolean } from '@youknown/react-hook/src'
import { Dialog, Divider, Dropdown, Toast } from '@youknown/react-ui/src'
import { cls, QS } from '@youknown/utils/src'

interface DocOptionsDropdownProps {
	doc_info: Doc
	text_len: string
	on_updated: (doc: Doc) => void
	on_export_html: () => void
	on_export_pdf: () => void
}
export default function DocOptionsDropdown(props: DocOptionsDropdownProps) {
	const { doc_info, text_len, on_updated, on_export_html, on_export_pdf } = props
	const { doc_id } = doc_info

	const { t } = useTranslation()
	const navigate = useNavigate()
	const { space_id } = useParams()
	const is_dark_theme = useUIStore(is_dark_theme_getter)
	const [doc_options_modal_open, { setTrue: show_doc_options_modal, setFalse: hide_doc_options_modal }] =
		useBoolean(false)
	const [deleting, set_deleting] = useState(false)

	const go_doc_list = () => {
		navigate(`/library/${space_id}`)
	}

	const remove_doc = async () => {
		if (deleting) return
		set_deleting(true)
		const [err] = await with_api(delete_doc)({ doc_ids: [doc_id] })
		set_deleting(false)
		if (err) {
			return
		}
		Toast.success(t('doc.delete.success'))
		go_doc_list()
	}

	const show_doc_delete_dialog = () => {
		Dialog.confirm({
			title: t('heading.delete_doc'),
			content: t('doc.delete_tip'),
			overlayClassName: cls(
				'backdrop-blur-xl',
				is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]'
			),
			okDanger: true,
			okText: t('delete.text'),
			cancelText: t('cancel.text'),
			closeIcon: null,
			okLoading: deleting,
			onOk: remove_doc
		})
	}

	const copy_share_url = () => {
		copy(
			QS.stringify({
				base: `${window.location.origin}/browse/feed-detail`,
				query: {
					feed_id: doc_id
				}
			})
		)
		Toast.success(t('copy.share_link.success'))
	}

	const doc_detail_ele = (
		<>
			<div className="flex items-center justify-between pl-16px pr-16px text-12px line-height-28px select-none">
				<span className="color-text-2">{t('doc.words_len')}</span>
				<span className="color-text-3 scale-90 origin-r">{text_len}</span>
			</div>
			<div className="flex items-center justify-between pl-16px pr-16px text-12px line-height-28px select-none">
				<span className="color-text-2">{t('time.update')}</span>
				<span className="color-text-3 scale-90 origin-r">{format_time(doc_info.update_time)}</span>
			</div>
			<div className="flex items-center justify-between pl-16px pr-16px text-12px line-height-28px select-none">
				<span className="color-text-2">{t('time.create')}</span>
				<span className="color-text-3 scale-90 origin-r">{format_time(doc_info.creation_time)}</span>
			</div>
		</>
	)

	return (
		<>
			<Dropdown
				trigger="click"
				placement="bottom-end"
				content={
					<Dropdown.Menu className="min-w-200px max-h-unset!" closeAfterItemClick>
						{doc_detail_ele}
						<Divider size="small" />
						<Dropdown.Item prefix={<LuSettings2 className="text-16px" />} onClick={show_doc_options_modal}>
							{t('doc.setting')}
						</Dropdown.Item>
						<Divider size="small" />
						{doc_info.public && (
							<Dropdown.Item
								prefix={<MdOutlineIosShare className="text-16px" />}
								onClick={copy_share_url}
							>
								{t('share.text')}
							</Dropdown.Item>
						)}
						<Dropdown
							appendTo={null}
							spacing={4}
							placement="left-start"
							content={
								<Dropdown.Menu className="w-120px" closeAfterItemClick>
									<Dropdown.Item onClick={on_export_pdf}>PDF</Dropdown.Item>
									<Dropdown.Item onClick={on_export_html}>HTML</Dropdown.Item>
								</Dropdown.Menu>
							}
						>
							<Dropdown.Item
								closeAfterItemClick={false}
								prefix={<LuLogOut className="text-16px" />}
								suffix={<TbChevronRight className="mr--4px text-16px" />}
							>
								{t('download.to')}
							</Dropdown.Item>
						</Dropdown>
						<Divider size="small" />
						<Dropdown.Item
							prefix={<PiTrashSimpleBold className="text-16px color-danger" />}
							onClick={show_doc_delete_dialog}
						>
							<span className="color-danger">{t('delete.text')}</span>
						</Dropdown.Item>
					</Dropdown.Menu>
				}
			>
				<More />
			</Dropdown>

			<DocOptionsModal
				open={doc_options_modal_open}
				hide_modal={hide_doc_options_modal}
				doc_info={doc_info}
				on_updated={on_updated}
			/>
		</>
	)
}
