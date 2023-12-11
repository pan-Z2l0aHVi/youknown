import copy from 'copy-to-clipboard'
import { LuLogOut, LuSettings2 } from 'react-icons/lu'
import { MdOutlineIosShare } from 'react-icons/md'
import { PiTrashSimpleBold } from 'react-icons/pi'
import { TbChevronRight } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom'

import { delete_doc, Doc } from '@/apis/doc'
import DocOptionsModal from '@/components/doc-options-modal'
import More from '@/components/more'
import { useUIStore } from '@/stores'
import { useBoolean } from '@youknown/react-hook/src'
import { Dialog, Divider, Dropdown, Toast } from '@youknown/react-ui/src'
import { cls, QS } from '@youknown/utils/src'

interface DocOptionsDropdownProps {
	doc_id: string
	is_public: boolean
	on_updated: (doc: Doc) => void
	on_export_html: () => void
	on_export_pdf: () => void
}
export default function DocOptionsDropdown(props: DocOptionsDropdownProps) {
	const { doc_id, is_public, on_updated, on_export_html, on_export_pdf } = props

	const navigate = useNavigate()
	const { space_id } = useParams()
	const is_dark_theme = useUIStore(state => state.is_dark_theme)
	const [doc_options_modal_open, { setTrue: show_doc_options_modal, setFalse: hide_doc_options_modal }] =
		useBoolean(false)

	const go_doc_list = () => {
		navigate(`/library/${space_id}`)
	}

	const show_doc_delete_dialog = () => {
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
			onOk: async () => {
				await delete_doc({ doc_ids: [doc_id] })
				go_doc_list()
			}
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
		Toast.success({ content: '已复制分享链接' })
	}

	return (
		<>
			<Dropdown
				trigger="click"
				placement="bottom-end"
				content={
					<Dropdown.Menu className="w-160px" closeAfterItemClick>
						<Dropdown.Item prefix={<LuSettings2 className="text-16px" />} onClick={show_doc_options_modal}>
							文档设置
						</Dropdown.Item>
						<Divider size="small" />
						{is_public && (
							<Dropdown.Item
								prefix={<MdOutlineIosShare className="text-16px" />}
								onClick={copy_share_url}
							>
								分享
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
								下载为
							</Dropdown.Item>
						</Dropdown>
						<Divider size="small" />
						<Dropdown.Item
							prefix={<PiTrashSimpleBold className="text-16px color-danger" />}
							onClick={show_doc_delete_dialog}
						>
							<span className="color-danger">删除</span>
						</Dropdown.Item>
					</Dropdown.Menu>
				}
			>
				<More />
			</Dropdown>

			<DocOptionsModal
				open={doc_options_modal_open}
				hide_modal={hide_doc_options_modal}
				doc_id={doc_id}
				on_updated={on_updated}
			/>
		</>
	)
}
