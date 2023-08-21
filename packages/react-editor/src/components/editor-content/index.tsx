import './index.scss'

import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react'

import { EditorContent as TiptapEditorContent } from '@tiptap/react'
import { cls } from '@youknown/utils/src'

import { UI_EDITOR_PREFIX } from '../../constants'

const EditorContent = (
	props: ComponentPropsWithoutRef<typeof TiptapEditorContent>,
	ref: ForwardedRef<HTMLDivElement>
) => {
	const prefixCls = `${UI_EDITOR_PREFIX}-content`
	return (
		<div ref={ref} className={cls(prefixCls)}>
			<TiptapEditorContent {...props} />
		</div>
	)
}
EditorContent.displayName = 'EditorContent'
const RefEditorContent = forwardRef(EditorContent)
export default RefEditorContent
