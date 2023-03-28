import BackTop from '@/app/components/back-top'
import Header from '@/app/components/header'
import More from '@/components/more'
import Editor from '@youknown/react-editor/src'
import { useBoolean } from '@youknown/react-hook/src'
import { Button, Dialog, Divider, Dropdown, Space } from '@youknown/react-ui/src'
import { storage } from '@youknown/utils/src'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { TbAdjustments, TbTrash } from 'react-icons/tb'

export default function Doc() {
	const [last_modify, set_last_modify] = useState(storage.local.get<string>('doc-last-modify') ?? '')
	const [had_modify, { setTrue: modify }] = useBoolean(false)

	const [update_dialog_open, { setTrue: show_update_dialog, setFalse: hide_update_dialog }] = useBoolean(false)

	const editor = Editor.useEditor({
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
		show_update_dialog()
	}

	const doc_tips = (
		<div className="flex">
			{had_modify && (
				<>
					{last_modify && <div className="text-text-3">已保存：{dayjs(last_modify).format('HH:mm')}</div>}
					<span className="text-text-3 m-l-16px m-r-16px">·</span>
				</>
			)}
			<div className="text-text-3">
				正文字数：<span className="inline-block min-w-40px">{text_len}</span>
			</div>
		</div>
	)

	const update_dialog = (
		<Dialog
			open={update_dialog_open}
			title="更新文档"
			okText="更新"
			cancelText="取消"
			closeIcon={null}
			onCancel={hide_update_dialog}
		>
			Content
		</Dialog>
	)

	return (
		<>
			<Header heading="文档" bordered sticky>
				<Space align="center" size="large">
					{doc_tips}
					<Button disabled={editor.isEmpty} primary onClick={handle_update}>
						更新
					</Button>
					<Dropdown
						trigger="click"
						placement="bottom-end"
						content={
							<Dropdown.Menu className="w-160px">
								<Dropdown.Item prefix={<TbAdjustments className="ml-8px text-16px" />}>
									文档设置
								</Dropdown.Item>
								<Divider size="small" />
								<Dropdown.Item prefix={<TbTrash className="ml-8px text-16px" />}>删除</Dropdown.Item>
							</Dropdown.Menu>
						}
					>
						<More />
					</Dropdown>
				</Space>
			</Header>

			<BackTop />

			{update_dialog}

			<div className="flex justify-center sticky top-64px z-10">
				<div className="border-b-bd-line border-b-1 p-12px bg-bg-0 shadow-[0_12px_16px_-8px_rgba(0,0,0,0.02)]">
					<Editor.Toolbar editor={editor} />
				</div>
			</div>

			<div className="flex pt-24px pb-24px">
				<div className="w-720px m-auto">
					<Editor.Content editor={editor} />
				</div>
			</div>
		</>
	)
}
