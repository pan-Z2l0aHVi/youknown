import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbCloudCheck, TbWorld, TbWorldOff } from 'react-icons/tb'

import { Doc, get_doc_drafts, get_doc_info, update_doc, update_doc_draft } from '@/apis/doc'
import Header from '@/app/components/header'
import { DOC_TITLE_MAX_LEN } from '@/consts'
import { useRecordStore } from '@/stores'
import { format_time } from '@/utils'
import { upload_cloudflare_r2 } from '@/utils/cloudflare-r2'
import { export_html, export_pdf } from '@/utils/exports'
import { NetFetchError, with_api } from '@/utils/request'
import { useBoolean, useDebounce, useFetch } from '@youknown/react-hook/src'
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
import { Button, Image as ImageUI, Input, Loading, Space, Toast, Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import CoverUpload from './components/cover-upload'
import DocHistoryDrawer from './components/doc-history-drawer'
import DocOptionsDropdown from './components/doc-options-dropdown'

const { useSearchParams } = await import('react-router-dom')

export default function Doc() {
	const { t } = useTranslation()
	const [search_params] = useSearchParams()
	const doc_id = search_params.get('doc_id') as string
	const recording = useRecordStore(state => state.recording)

	const [history_drawer_open, { setTrue: show_history_drawer, setFalse: hide_history_drawer }] = useBoolean(false)
	const [title_focus, { setTrue: focus_title, setFalse: blur_title }] = useBoolean(false)
	const [title_val, set_title_val] = useState('')
	const title_input_ref = useRef<HTMLInputElement>(null)
	const [publishing, set_publishing] = useState(false)

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
						ImageUI.crop({
							file,
							onCancel: reject,
							async onCrop(result) {
								try {
									const { compressImage } = await import('@youknown/img-wasm/src')
									const compressed_file = await compressImage(result, 1600, 1200)
									upload_cloudflare_r2(compressed_file, {
										complete(url) {
											resolve({
												src: url
											})
										},
										error(err) {
											Toast.error(t('upload.img.fail'))
											reject(err)
										}
									})
								} catch (err) {
									Toast.error(t('upload.img.fail'))
									reject(err)
								}
							}
						})
					})
			})
		],
		autofocus: 'end',
		placeholder: ({ node }) => {
			if (node.type.name === 'heading') {
				return t('placeholder.title')
			}
			return t('placeholder.more')
		},
		onUpdate({ editor }) {
			debounced_update(editor)
		}
	})

	const update_draft = async (content: string) => {
		const [err, res] = await with_api(update_doc_draft)({
			doc_id,
			content
		})
		if (err) {
			return
		}
		if (doc_info?.content === content) {
			return
		}
		set_draft([res])
	}

	const debounced_update = useDebounce(async (editor: Editor) => {
		update_draft(editor?.getHTML())
	}, 1000)

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
			Toast.error(err.cause.msg)
		}
	})

	const doc_title = doc_info?.title ?? ''
	useEffect(() => {
		if (doc_title) {
			set_title_val(doc_title)
		}
	}, [doc_title])

	if (!editor) return null
	const text_len = editor.storage.characterCount.characters()

	if (!doc_id) {
		return null
	}
	const record_update_doc = (new_doc: Doc) => {
		recording({
			action: '更新',
			target: '',
			target_id: '',
			obj_type: '文档',
			obj: new_doc.title,
			obj_id: new_doc.doc_id
		})
	}

	const update_doc_content = async () => {
		const payload = {
			doc_id,
			content: editor.getHTML(),
			summary: editor.getText()
		}
		const [err, res] = await with_api(update_doc)(payload)
		if (err) {
			return
		}
		set_doc_info(res)
		editor.commands.setContent(res.content)
		record_update_doc(res)
		Toast.success(t('update.success'))
	}

	const update_doc_title = async () => {
		blur_title()
		if (!title_val) {
			Toast.warning(t('validate.title_required'))
			set_title_val(doc_title)
			return
		}
		if (title_val === doc_info?.title) {
			return
		}
		const payload = {
			doc_id,
			title: title_val
		}
		const [err, res] = await with_api(update_doc)(payload)
		if (err) {
			set_title_val(doc_title)
			return
		}
		set_doc_info(res)
		Toast.success(t('update.title.success'))
	}

	const recovery_doc = (doc_content: string) => {
		editor.commands.setContent(doc_content)
		// 应用的内容与最新草稿不相同才更新草稿
		if (doc_content != draft.content) {
			update_draft(doc_content)
		}
	}

	const update_doc_public = async (is_public: boolean) => {
		set_publishing(true)
		const payload = {
			doc_id,
			public: is_public
		}
		const [err, res] = await with_api(update_doc)(payload)
		set_publishing(false)
		if (err) {
			return
		}
		set_doc_info(res)
		Toast.success(is_public ? t('doc.publish.ok') : t('doc.publish.cancel'))
	}

	const on_export_pdf = () => {
		export_pdf(editor.getHTML(), doc_info?.title + '.pdf')
			.then(() => {
				Toast.success(t('export.pdf.success'))
			})
			.catch(() => {
				Toast.error(t('export.pdf.fail'))
			})
	}
	const on_export_html = () => {
		export_html(editor.getHTML(), doc_info?.title + '.html')
		Toast.success(t('export.html.success'))
	}

	const doc_tips = (
		<div className="flex">
			<div className="text-text-3 text-12px">
				{t('doc.words_len')} <span className="inline-block">{text_len}</span>
			</div>
			{draft && (
				<>
					<span className="text-text-3 text-12px ml-8px mr-8px">·</span>
					<div className="text-text-3 text-12px">
						{t('doc.auto_save')} {format_time(draft.creation_time)}
					</div>
				</>
			)}
		</div>
	)

	const is_doc_public = doc_info?.public ?? false
	const public_icon = (
		<Tooltip placement="bottom" title={is_doc_public ? t('doc.public') : t('doc.private')}>
			<Button
				className="mr-8px"
				text
				square
				size="small"
				loading={publishing}
				onClick={() => update_doc_public(!is_doc_public)}
			>
				{is_doc_public ? (
					<TbWorld className="color-primary text-16px" />
				) : (
					<TbWorldOff className="color-text-3 text-16px" />
				)}
			</Button>
		</Tooltip>
	)

	const title_ele = (
		<>
			{title_focus ? (
				<div className="flex-1">
					<Input
						ref={title_input_ref}
						className="w-100%! max-w-400px"
						maxLength={DOC_TITLE_MAX_LEN}
						value={title_val}
						onChange={set_title_val}
						autoFocus
						placeholder={t('placeholder.title')}
						onBlur={update_doc_title}
					/>
				</div>
			) : (
				<div className="flex-1 w-0 truncate flex items-center h-24px">
					<span
						className="max-w-100% pl-8px pr-8px rd-radius-m color-text-2 [@media(hover:hover)]-hover-bg-hover cursor-default"
						onClick={focus_title}
					>
						{doc_title}
					</span>
				</div>
			)}
		</>
	)

	return (
		<>
			<Header heading={t('heading.doc')} bordered="visible">
				<div className="flex-1 flex items-center ml-24px mr-24px">
					{public_icon}
					{title_ele}
				</div>

				<Space align="center">
					{doc_tips}
					<Button
						onClick={show_history_drawer}
						prefixIcon={<TbCloudCheck className="color-text-2" size={16} />}
					>
						{t('draft.text')}
					</Button>
					<Button disabled={editor.isEmpty} primary onClick={update_doc_content}>
						{t('update.text')}
					</Button>
					<DocOptionsDropdown
						doc_id={doc_id}
						is_public={doc_info?.public ?? false}
						on_updated={set_doc_info}
						on_export_pdf={on_export_pdf}
						on_export_html={on_export_html}
					/>
				</Space>
			</Header>

			<DocHistoryDrawer
				open={history_drawer_open}
				on_close={hide_history_drawer}
				doc_id={doc_id}
				doc_content={doc_info?.content ?? ''}
				on_recovery={recovery_doc}
			/>

			<div
				className={cls(
					'z-10 sticky top-56px right-0',
					'w-100% flex justify-center p-[12px_32px] bg-bg-0',
					'after:content-empty after:absolute after:bottom-0 after:left-50% after:translate-x--50% after:w-100% after:h-1px after:bg-bd-line'
				)}
			>
				<RTE.Menu editor={editor} />
			</div>

			<Loading className="w-720px! pt-24px pb-24px m-[0_auto]" spinning={loading} size="large">
				<CoverUpload doc_id={doc_id} cover={doc_info?.cover} on_updated={set_doc_info} />
				<RTE.Content editor={editor} />
			</Loading>
		</>
	)
}
