import './index.scss'

import { ComponentProps, lazy, Suspense } from 'react'

import { EditorContent } from '@tiptap/react'
import { cls } from '@youknown/utils/src'

import { UI_EDITOR_PREFIX } from '../../common'
import { Bubble, BubbleListItem } from '../bubble'

const ImageResizer = lazy(() => import('../image-resizer'))

type EditorContentProps = ComponentProps<typeof EditorContent>
interface RichTextContentProps extends EditorContentProps {
	tooltip?: boolean
	bubble?: boolean
	bubbleList?: BubbleListItem[]
}
export function RichTextContent(props: RichTextContentProps) {
	const prefixCls = `${UI_EDITOR_PREFIX}-content`
	const { editor, tooltip = true, bubble = true, bubbleList } = props
	return (
		<div
			className={cls(prefixCls)}
			onClick={() => {
				editor?.chain().focus().run()
			}}
		>
			{bubble && <Bubble editor={editor} tooltip={tooltip} list={bubbleList} />}
			<Suspense>{editor?.isActive('image') && <ImageResizer editor={editor} />}</Suspense>
			<EditorContent {...props} />
		</div>
	)
}
RichTextContent.displayName = 'RichTextContent'
