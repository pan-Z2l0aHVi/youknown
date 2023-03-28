import React, { ComponentPropsWithoutRef, forwardRef } from 'react'
import { EditorContent as TiptapEditorContent } from '@tiptap/react'
import './index.scss'

const EditorContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof TiptapEditorContent>>((props, ref) => {
	return (
		<div ref={ref} className="g-editor-content">
			<TiptapEditorContent {...props} />
		</div>
	)
})

export default EditorContent
