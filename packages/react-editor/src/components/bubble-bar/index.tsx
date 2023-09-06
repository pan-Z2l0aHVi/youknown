import { ReactNode, useContext } from 'react'

import { BubbleMenu } from '@tiptap/react'
import { Space } from '@youknown/react-ui/src'

import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'
import Bold from '../bold'
import CodeOff from '../code-off'
import ImgEdit from '../img-edit'
import ImgRemove from '../img-remove'
import InlineCode from '../inline-code'
import Italic from '../italic'
import Link from '../link'
import LinkCopy from '../link-copy'
import LinkEdit from '../link-edit'
import LinkOff from '../link-off'
import LinkOpen from '../link-open'
import Strike from '../strike'
import Underline from '../underline'

export function BubbleBar() {
	const { editor } = useContext(ToolbarContext)
	const prefixCls = `${UI_EDITOR_PREFIX}-bubble-menu`

	let bubbleContent: ReactNode
	if (editor.isActive('link')) {
		bubbleContent = (
			<>
				<LinkOpen />
				<LinkCopy />
				<LinkEdit />
				<LinkOff />
			</>
		)
	} else if (editor.isActive('code')) {
		bubbleContent = (
			<>
				<CodeOff />
			</>
		)
	} else if (editor.isActive('image')) {
		bubbleContent = (
			<>
				<ImgEdit />
				<ImgRemove />
			</>
		)
	} else if (editor.isActive('heading') || editor.isActive('paragraph')) {
		bubbleContent = (
			<>
				<Bold />
				<Italic />
				<Underline />
				<Strike />
				<InlineCode />
				<Link />
			</>
		)
	} else {
		bubbleContent = null
	}

	return (
		<BubbleMenu
			pluginKey="bubbleBar"
			editor={editor}
			updateDelay={100}
			tippyOptions={{
				duration: 300,
				zIndex: 9,
				maxWidth: 'none',
				appendTo: 'parent'
			}}
			shouldShow={() => {
				if (editor.isActive('image')) return true
				if (!editor.view.state.selection.content().size) return false

				return (
					editor.isActive('heading') ||
					editor.isActive('paragraph') ||
					editor.isActive('code') ||
					editor.isActive('link')
				)
			}}
		>
			<Space className={prefixCls} size="small">
				{bubbleContent}
			</Space>
		</BubbleMenu>
	)
}
