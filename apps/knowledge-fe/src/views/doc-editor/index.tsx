import dayjs from 'dayjs'
import { useState } from 'react'
import { TbSettings, TbTrash } from 'react-icons/tb'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { delete_doc, get_doc_info, update_doc } from '@/apis/doc'
import Header from '@/app/components/header'
import DocOptionsModal from '@/components/doc-options-modal'
import More from '@/components/more'
import { useRecordStore, useUIStore } from '@/stores'
import { NetFetchError } from '@/utils/request'
import { EditorContent, Toolbar, useEditor } from '@youknown/react-editor/src'
import { useBoolean, useCreation, useFetch } from '@youknown/react-hook/src'
import { Button, Dialog, Divider, Dropdown, Space, Toast } from '@youknown/react-ui/src'
import { cls, storage } from '@youknown/utils/src'

export default function Doc() {
	const navigate = useNavigate()
	const recording = useRecordStore(state => state.recording)
	const is_dark_theme = useUIStore(state => state.is_dark_theme)
	const local_doc_last_modify = useCreation(() => storage.local.get<string>('doc-last-modify'))
	const [last_modify, set_last_modify] = useState(local_doc_last_modify ?? '')
	const [had_modify, { setTrue: modify }] = useBoolean(false)
	const [search_params] = useSearchParams()
	const doc_id = search_params.get('doc_id') as string
	const [doc_options_modal_open, { setTrue: show_doc_options_modal, setFalse: hide_doc_options_modal }] =
		useBoolean(false)

	const local_doc_content = useCreation(() => storage.local.get<string>('doc-content'))
	const editor = useEditor({
		content: local_doc_content ?? '',
		autofocus: 'end',
		onUpdate({ editor }) {
			const now = dayjs().toString()
			set_last_modify(now)
			modify()
			storage.local.set('doc-last-modify', now)
			storage.local.set('doc-content', editor.getHTML())
		}
	})

	const { data: doc_info, loading } = useFetch(get_doc_info, {
		ready: !!doc_id && !!editor,
		params: [
			{
				doc_id
			}
		],
		refreshDeps: [doc_id],
		onError(err: NetFetchError) {
			Toast.show({
				title: err.cause.msg
			})
		},
		onSuccess(res) {
			editor?.commands.setContent(res.content)
		}
	})

	if (!editor) return null
	const text_len = editor.storage.characterCount.characters()

	const update_doc_content = async () => {
		const payload = {
			doc_id,
			content: editor.getHTML()
		}
		try {
			const doc = await update_doc(payload)
			recording({
				action: '更新',
				target: '',
				target_id: '',
				obj_type: '文章',
				obj: doc.title,
				obj_id: doc.doc_id
			})
			Toast.show({ title: '更新成功' })
		} catch (error) {
			console.error('error: ', error)
		}
	}
	const go_doc_list = () => {
		navigate('/library/doc/doc-list')
	}

	const show_doc_delete_dialog = () => {
		Dialog.confirm({
			title: '删除文档',
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
				await delete_doc({ doc_ids: [doc_id] })
				go_doc_list()
			}
		})
	}

	if (!doc_id) {
		return null
	}

	const doc_tips = (
		<div className="flex">
			<div className="text-text-3">
				正文字数：<span className="inline-block">{text_len}</span>
			</div>
			{had_modify && (
				<>
					<span className="text-text-3 ml-16px mr-16px">·</span>
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
					<Button disabled={editor.isEmpty} primary onClick={update_doc_content}>
						更新
					</Button>
					{more_dropdown}
				</Space>
			</Header>

			<DocOptionsModal open={doc_options_modal_open} hide_modal={hide_doc_options_modal} doc_id={doc_id} />

			<div className="flex justify-center sticky top-56px z-10 bg-bg-0 b-b-bd-line b-b-1 b-b-solid">
				<div className="p-[12px_32px] bg-bg-0 shadow-[0_12px_16px_-8px_rgba(0,0,0,0.02)]">
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
