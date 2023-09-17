import './index.scss'

import { ComponentProps, lazy, Suspense } from 'react'

import { EditorContent } from '@tiptap/react'
import { cls } from '@youknown/utils/src'

import { UI_EDITOR_PREFIX } from '../../common'
import { Bubble, BubbleListItem } from '../bubble'
import { Floating, FloatingListItem } from '../floating'

const ImageResizer = lazy(() => import('../image-resizer'))

interface RichTextContentProps extends ComponentProps<typeof EditorContent> {
	tooltip?: boolean
	bubble?: boolean
	floating?: boolean
	bubbleList?: BubbleListItem[]
	floatingList?: FloatingListItem[]
}
export function RichTextContent(props: RichTextContentProps) {
	const prefixCls = `${UI_EDITOR_PREFIX}-content`
	const { editor, tooltip = true, bubble = true, floating = true, floatingList, bubbleList } = props
	const hasImageExt = editor && editor.extensionManager.extensions.some(ext => ext.name === 'image')
	return (
		<div
			className={cls(prefixCls)}
			onClick={() => {
				editor?.chain().focus().run()
			}}
		>
			{floating && <Floating editor={editor} tooltip={tooltip} list={floatingList} />}
			{bubble && <Bubble editor={editor} tooltip={tooltip} list={bubbleList} />}
			{hasImageExt && (
				<Suspense>
					<ImageResizer editor={editor} />
				</Suspense>
			)}
			<EditorContent {...props} />
		</div>
	)
}
RichTextContent.displayName = 'RichTextContent'
