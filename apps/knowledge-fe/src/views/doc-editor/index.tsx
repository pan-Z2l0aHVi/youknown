import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbChecklist, TbCloudCheck, TbWorld, TbWorldOff } from 'react-icons/tb'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'

import { Doc, get_doc_drafts, get_doc_info, update_doc, update_doc_drafts } from '@/apis/doc'
import Header from '@/app/components/header'
import { DOC_TITLE_MAX_LEN } from '@/consts'
import { useTransitionNavigate } from '@/hooks/use-transition-navigate'
import { is_dark_theme_getter, useRecordStore, useUIStore } from '@/stores'
import { format_time } from '@/utils'
import { upload_cloudflare_r2 } from '@/utils/cloudflare-r2'
import { download_html } from '@/utils/exports'
import { NetFetchError, with_api } from '@/utils/request'
import { useBoolean, useDebounce, useFetch } from '@youknown/react-hook/src'
import { RTEMenuBar } from '@youknown/react-rte/src/components/menu-bar'
import { RTEContent } from '@youknown/react-rte/src/components/rich-text-content'
import Blockquote from '@youknown/react-rte/src/extensions/blockquote'
import Bold from '@youknown/react-rte/src/extensions/bold'
import BulletList from '@youknown/react-rte/src/extensions/bullet-list'
import Code from '@youknown/react-rte/src/extensions/code'
import CodeBlock from '@youknown/react-rte/src/extensions/code-block'
import Heading from '@youknown/react-rte/src/extensions/heading'
import Highlight from '@youknown/react-rte/src/extensions/highlight'
import HorizontalRule from '@youknown/react-rte/src/extensions/horizontal-rule'
import Image from '@youknown/react-rte/src/extensions/image'
import Italic from '@youknown/react-rte/src/extensions/italic'
import Link from '@youknown/react-rte/src/extensions/link'
import OrderedList from '@youknown/react-rte/src/extensions/ordered-list'
import Strike from '@youknown/react-rte/src/extensions/strike'
import Table from '@youknown/react-rte/src/extensions/table'
import TextAlign from '@youknown/react-rte/src/extensions/text-align'
import TextColor from '@youknown/react-rte/src/extensions/text-color'
import Underline from '@youknown/react-rte/src/extensions/underline'
import { useRTE } from '@youknown/react-rte/src/hooks/useRTE'
import { Button, Dialog, Image as ImageUI, Input, Loading, Space, Toast, Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import CoverUpload from './components/cover-upload'
import DocHistoryDrawer from './components/doc-history-drawer'
import DocOptionsDropdown from './components/doc-options-dropdown'

import type { Editor } from '@youknown/react-rte/src'
export default function Doc() {
	const { t } = useTranslation()
	const navigate = useTransitionNavigate()
	const { space_id } = useParams()
	const [search_params] = useSearchParams()
	const doc_id = search_params.get('doc_id') as string
	const recording = useRecordStore(state => state.recording)
	const is_mobile = useUIStore(state => state.is_mobile)
	const is_dark_theme = useUIStore(is_dark_theme_getter)

	const [history_drawer_open, { setTrue: show_history_drawer, setFalse: hide_history_drawer }] = useBoolean(false)
	const [title_focus, { setTrue: focus_title, setFalse: blur_title }] = useBoolean(false)
	const [title_val, set_title_val] = useState('')
	const title_input_ref = useRef<HTMLInputElement>(null)
	const [publishing, set_publishing] = useState(false)
	const [saving, set_saving] = useState(false)

	const editor = useRTE({
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

	const update_drafts = async (content: string) => {
		const [err, res] = await with_api(update_doc_drafts)({
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
		update_drafts(editor?.getHTML())
	}, 1000)

	const { state: doc_state }: { state: Doc } = useLocation()
	useEffect(() => {
		if (editor && doc_state) {
			editor.commands.setContent(doc_state.content)
		}
	}, [doc_state, editor])

	const doc_ready = !!doc_id && !!editor
	const {
		data: doc_info,
		loading,
		mutate: set_doc_info
	} = useFetch(get_doc_info, {
		initialData: doc_state,
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
			action: 'record.update',
			target: '',
			target_id: '',
			obj_type: 'record.doc',
			obj: new_doc.title,
			obj_id: new_doc.doc_id
		})
	}

	const save_doc = async () => {
		set_saving(true)
		const payload = {
			doc_id,
			content: editor.getHTML(),
			summary: editor.getText()
		}
		const [err, res] = await with_api(update_doc)(payload)
		set_saving(false)
		if (err) {
			return
		}
		set_doc_info(res)
		editor.commands.setContent(res.content)
		record_update_doc(res)
		Toast.success(t('update.success'))
		navigate(`/library/${space_id}`)
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
			update_drafts(doc_content)
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

	const get_doc_html_str = () => {
		const html_content = document.documentElement.outerHTML
		const html = html_content.replace(
			/<body.*?>[\s\S]*?<\/body>/i,
			`<body>
				<article class="rich-text-container max-w-720px p-[8px_8px_8px_16px] m-[0_auto]">
					<h1 class="text-center">${doc_title}</h1>
					<img class="w-100% max-h-30vh min-h-40px object-cover rd-radius-m mb-40px" src=${doc_info?.cover}>
					${editor.getHTML()}
				</article>
			</body>
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
			<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
			<script>
				const root = document.querySelector(':root')
				root.classList.add('light-theme')
				root.classList.remove('dark-theme')
				hljs.highlightAll();
				const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
				window.addEventListener("afterprint", function() {
					if (isSafari) {
						window.alert("Accomplish.");
					}
					window.close();
				})
				window.print();
			</script>
			`
		)
		return html
	}

	const on_export_html = () => {
		const html = get_doc_html_str()
		const filename = doc_info?.title + '.html'
		download_html(html, filename)
		Toast.success(t('export.html.success'))
	}

	const on_export_pdf = () => {
		const html = get_doc_html_str()
		const new_window = window.open('', '_blank') as Window
		new_window?.focus()
		new_window.document.write(html)
	}

	const doc_tips = (
		<>
			{draft && (
				<div className="text-text-3 text-12px">
					{t('doc.draft_auto_save')} {format_time(draft.creation_time)}
				</div>
			)}
		</>
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
				onClick={() => {
					const next_doc_public = !is_doc_public
					if (!next_doc_public) {
						Dialog.confirm({
							title: t('heading.delete_feed'),
							content: t('feed.delete_tip'),
							overlayClassName: cls(
								'backdrop-blur-xl',
								is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]'
							),
							okDanger: true,
							okText: t('confirm'),
							cancelText: t('cancel.text'),
							closeIcon: null,
							onOk: () => {
								update_doc_public(next_doc_public)
							}
						})
					} else {
						update_doc_public(next_doc_public)
					}
				}}
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
				{is_mobile || (
					<div className="flex-1 flex items-center ml-24px mr-24px">
						{public_icon}
						{title_ele}
					</div>
				)}

				<Space align="center">
					{is_mobile ? (
						<>
							<Button square onClick={show_history_drawer}>
								<TbCloudCheck className="color-primary text-16px" />
							</Button>
							<Button square disabled={editor.isEmpty} loading={saving} primary onClick={save_doc}>
								<TbChecklist className="text-16px" />
							</Button>
						</>
					) : (
						<>
							{doc_tips}
							<Button
								onClick={show_history_drawer}
								prefixIcon={<TbCloudCheck className="color-primary text-16px" />}
							>
								{t('draft.text')}
							</Button>
							<Button disabled={editor.isEmpty} loading={saving} primary onClick={save_doc}>
								{t('save.text')}
							</Button>
						</>
					)}

					{doc_info && (
						<DocOptionsDropdown
							doc_info={doc_info}
							text_len={text_len}
							on_updated={set_doc_info}
							on_export_pdf={on_export_pdf}
							on_export_html={on_export_html}
						/>
					)}
				</Space>
			</Header>

			<DocHistoryDrawer
				open={history_drawer_open}
				on_close={hide_history_drawer}
				doc_id={doc_id}
				doc_content={doc_info?.content ?? ''}
				on_recovery={recovery_doc}
			/>

			{is_mobile || (
				<div
					className={cls(
						'z-10 sticky top-56px right-0',
						'w-100% flex justify-center p-[12px_32px] bg-bg-0',
						'after:content-empty after:absolute after:bottom-0 after:left-50% after:translate-x--50% after:w-100% after:h-1px after:bg-divider'
					)}
				>
					<RTEMenuBar editor={editor} />
				</div>
			)}

			<Loading
				className="can-print w-720px! max-w-100% pt-24px pb-24px <sm:pl-16px <sm-pr-16px sm:m-[0_auto]"
				spinning={!doc_state && loading}
				size="large"
			>
				<CoverUpload doc_id={doc_id} cover={doc_info?.cover} on_updated={set_doc_info} />
				<RTEContent editor={editor} floating={!is_mobile} />
			</Loading>
		</>
	)
}
