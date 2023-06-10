import Header from '@/app/components/header'
import More from '@/components/more'
import { EditorContent, Toolbar, useEditor } from '@youknown/react-editor/src'
import { useBoolean } from '@youknown/react-hook/src'
import { Button, Divider, Dropdown, Space } from '@youknown/react-ui/src'
import { storage } from '@youknown/utils/src'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { TbSettings, TbTrash } from 'react-icons/tb'
import DocDeleteDialog from '@/components/doc-delete-dialog'
import DocOptionsModal from '@/components/doc-options-modal'
import DocSaveDialog from './components/doc-save-dialog'

export default function Doc() {
	const [last_modify, set_last_modify] = useState(storage.local.get<string>('doc-last-modify') ?? '')
	const [had_modify, { setTrue: modify }] = useBoolean(false)

	const [doc_save_dialog_open, { setTrue: show_doc_save_dialog, setFalse: hide_doc_save_dialog }] = useBoolean(false)
	const [doc_delete_dialog_open, { setTrue: show_doc_delete_dialog, setFalse: hide_doc_delete_dialog }] =
		useBoolean(false)
	const [doc_options_modal_open, { setTrue: show_doc_options_modal, setFalse: hide_doc_options_modal }] =
		useBoolean(false)

	const editor = useEditor({
		content: storage.local.get<string>('doc-html'),
		autofocus: 'end',
		onUpdate({ editor }) {
			const now = dayjs().toString()
			set_last_modify(now)
			modify()
			storage.local.set('doc-last-modify', now)
			storage.local.set('doc-html', editor.getHTML())
		}
	})

	if (!editor) return null
	const text_len = editor.storage.characterCount.characters()

	const handle_update = () => {
		console.log('update', editor.getHTML())
		show_doc_save_dialog()
	}

	const doc_tips = (
		<div className="flex">
			<div className="text-text-3">
				正文字数：<span className="inline-block">{text_len}</span>
			</div>
			{had_modify && (
				<>
					<span className="text-text-3 m-l-16px m-r-16px">·</span>
					{last_modify && <div className="text-text-3">最近保存：{dayjs(last_modify).format('HH:mm')}</div>}
				</>
			)}
		</div>
	)

	const more_dropdown = (
		<Dropdown
			trigger="click"
			placement="bottom-end"
			content={
				<Dropdown.Menu className="w-160px">
					<Dropdown.Item
						closeAfterItemClick
						prefix={<TbSettings className="ml-8px text-18px" />}
						onClick={show_doc_options_modal}
					>
						文档设置
					</Dropdown.Item>
					<Divider size="small" />
					<Dropdown.Item
						closeAfterItemClick
						prefix={<TbTrash className="ml-8px text-18px color-danger" />}
						onClick={show_doc_delete_dialog}
					>
						<span className="color-danger">删除</span>
					</Dropdown.Item>
				</Dropdown.Menu>
			}
		>
			<More />
		</Dropdown>
	)

	return (
		<>
			<Header heading="文档" bordered sticky>
				<Space align="center" size="large">
					{doc_tips}
					<Button disabled={editor.isEmpty} primary onClick={handle_update}>
						更新
					</Button>
					{more_dropdown}
				</Space>
			</Header>

			<DocDeleteDialog open={doc_delete_dialog_open} hide_dialog={hide_doc_delete_dialog} />
			<DocSaveDialog open={doc_save_dialog_open} hide_dialog={hide_doc_save_dialog} />
			<DocOptionsModal open={doc_options_modal_open} hide_modal={hide_doc_options_modal} />

			<div className="flex justify-center sticky top-64px z-10 bg-bg-0">
				<div className="border-b-bd-line border-b-1 p-12px bg-bg-0 shadow-[0_12px_16px_-8px_rgba(0,0,0,0.02)]">
					<Toolbar editor={editor} />
				</div>
			</div>

			<div className="flex pt-40px pb-24px">
				<div className="w-720px m-auto">
					<EditorContent editor={editor} />
				</div>
			</div>
		</>
	)
}
