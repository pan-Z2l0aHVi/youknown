import dayjs from 'dayjs'
import { useRef } from 'react'
import { LuSettings2 } from 'react-icons/lu'
import { TbTrash } from 'react-icons/tb'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { delete_doc, get_doc_drafts, get_doc_info, update_doc, update_doc_draft } from '@/apis/doc'
import Header from '@/app/components/header'
import DocOptionsModal from '@/components/doc-options-modal'
import More from '@/components/more'
import { useRecordStore, useUIStore } from '@/stores'
import { upload_file } from '@/utils/qiniu'
import { NetFetchError } from '@/utils/request'
import { useBoolean, useDebounce, useFetch, useUnmount } from '@youknown/react-hook/src'
import {
	Blockquote,
	Bold,
	BulletList,
	Code,
	CodeBlock,
	Editor,
	Heading,
	Highlight,
	HorizontalRule,
	Image,
	Italic,
	Link,
	OrderedList,
	RTE,
	Strike,
	Table,
	TextAlign,
	TextColor,
	Underline
} from '@youknown/react-rte/src'
import { Button, Dialog, Divider, Dropdown, Space, Toast } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

const EMPTY_CONTENT = '<p></p>'

export default function Doc() {
	const navigate = useNavigate()
	const [search_params] = useSearchParams()
	const doc_id = search_params.get('doc_id') as string
	const recording = useRecordStore(state => state.recording)
	const is_dark_theme = useUIStore(state => state.is_dark_theme)
	const [had_modify, { setTrue: modify }] = useBoolean(false)
	const [doc_options_modal_open, { setTrue: show_doc_options_modal, setFalse: hide_doc_options_modal }] =
		useBoolean(false)
	const dialogRef = useRef<ReturnType<typeof Dialog.confirm>>()

	const editor = RTE.use({
		extensions: [
			Heading,
			Bold,
			Strike,
			Italic,
			Underline,
			Code,
			Link,
			TextColor,
			Highlight,
			TextAlign,
			Blockquote,
			Table,
			BulletList,
			OrderedList,
			CodeBlock,
			HorizontalRule,
			Image.configure({
				onCustomUpload: file =>
					new Promise((resolve, reject) => {
						upload_file(file, {
							complete(url) {
								resolve({
									src: url
								})
							},
							error(err) {
								Toast.error({ content: '上传图片失败' })
								reject(err)
							}
						})
					})
			})
		],
		autofocus: 'end',
		placeholder: ({ node }) => {
			if (node.type.name === 'heading') {
				return '请输入标题'
			}
			return '输入内容 / 唤起更多'
		},
		onUpdate({ editor }) {
			debounced_update(editor)
		}
	})

	const update_draft = async (content: string) => {
		try {
			const new_draft = await update_doc_draft({
				doc_id,
				content
			})
			set_draft([new_draft])
		} catch (error) {
			console.error('error: ', error)
		}
	}

	const debounced_update = useDebounce(async (editor: Editor) => {
		modify()
		update_draft(editor?.getHTML())
	}, 500)

	const doc_ready = !!doc_id && !!editor

	const {
		data: doc_info,
		loading,
		mutate: set_doc_info
	} = useFetch(get_doc_info, {
		ready: doc_ready,
		params: [
			{
				doc_id
			}
		],
		refreshDeps: [doc_id],
		onError(err: NetFetchError) {
			Toast.error({
				content: err.cause.msg
			})
		},
		onSuccess(res) {
			editor?.commands.setContent(res.content)
		}
	})
	const { data: [draft] = [], mutate: set_draft } = useFetch(get_doc_drafts, {
		ready: doc_ready,
		params: [
			{
				doc_id,
				page: 1,
				page_size: 1
			}
		],
		refreshDeps: [doc_id],
		onError(err: NetFetchError) {
			Toast.error({
				content: err.cause.msg
			})
		},
		onSuccess([res]) {
			if (res.content === EMPTY_CONTENT || res.creation_time === res.update_time) {
				return
			}
			dialogRef.current = Dialog.confirm({
				title: '草稿箱',
				content: `检测到上次内容修改于${dayjs(res.update_time).format('YYYY-MM-DD')}，是否立即恢复？`,
				okText: '恢复',
				cancelText: '取消',
				onOk() {
					editor?.commands.setContent(res.content)
				}
			})
		}
	})

	useUnmount(() => {
		dialogRef.current?.close()
	})

	if (!editor) return null
	const text_len = editor.storage.characterCount.characters()

	const update_doc_content = async () => {
		const payload = {
			doc_id,
			content: editor.getHTML()
		}
		try {
			const new_doc = await update_doc(payload)
			set_doc_info(new_doc)
			recording({
				action: '更新',
				target: '',
				target_id: '',
				obj_type: '文章',
				obj: new_doc.title,
				obj_id: new_doc.doc_id
			})
			Toast.success({ content: '更新成功' })
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
					{draft?.update_time && (
						<div className="text-text-3">最近保存：{dayjs(draft.update_time).format('HH:mm')}</div>
					)}
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
						prefix={<LuSettings2 className="ml-8px text-18px" />}
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
				<span className="flex-1 truncate ml-24px mr-24px color-text-2">{doc_info?.title}</span>
				<Space align="center" size="large">
					{doc_tips}
					<Button disabled={editor.isEmpty} primary onClick={update_doc_content}>
						更新
					</Button>
					{more_dropdown}
				</Space>
			</Header>

			<DocOptionsModal
				open={doc_options_modal_open}
				hide_modal={hide_doc_options_modal}
				doc_id={doc_id}
				on_updated={set_doc_info}
			/>

			<div
				className={cls(
					'z-10 fixed top-56px left-50% translate-x--50%',
					'w-max flex p-[12px_32px] bg-bg-0',
					'after:content-empty after:absolute after:bottom-0 after:left-50% after:translate-x--50% after:w-100vw after:h-1px after:bg-bd-line'
				)}
			>
				<RTE.Menu editor={editor} />
			</div>

			{loading || (
				<div className="flex pt-80px pb-24px">
					<div className="w-720px m-auto">
						<RTE.Content editor={editor} />
					</div>
				</div>
			)}
		</>
	)
}
