import './index.scss'

import { ChangeEvent, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { TbPhotoPlus } from 'react-icons/tb'

import { Editor } from '@tiptap/react'
import { Dropdown } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import { UI_EDITOR_PREFIX } from '../../common'

interface UploadResult {
	src: string
	alt?: string
	title?: string
	width?: number
	height?: number
}
interface ImageItemProps {
	editor: Editor
	onCustomUpload?: (file: File) => Promise<UploadResult>
}
export default function ImageItem(props: ImageItemProps) {
	const { editor, onCustomUpload } = props

	const { t } = useTranslation()
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleFiles = async (event: ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target
		if (!files || !files.length) {
			return
		}
		Dropdown.close()
		if (!onCustomUpload) {
			return
		}
		for await (const file of files) {
			try {
				const imgRes = await onCustomUpload(file)
				editor.chain().focus().setImage(imgRes).setTextSelection(editor.state.selection.to).run()
			} catch (error) {
				console.error('onCustomUpload error: ', error)
			}
		}
		// 重置 files，允许再次上传同一个 file
		event.target.value = ''
	}

	const prefixCls = `${UI_EDITOR_PREFIX}-img-item`
	return (
		<Dropdown.Item
			prefix={
				<div className={cls(prefixCls)}>
					<TbPhotoPlus />
				</div>
			}
			onClick={() => {
				fileInputRef.current?.click()
			}}
		>
			{t('react_rte.image.text')}
			<input
				type="file"
				multiple
				accept="image/*"
				ref={fileInputRef}
				className={cls(`${prefixCls}-file-input`)}
				onChange={handleFiles}
			/>
		</Dropdown.Item>
	)
}
