import { Divider, Space } from '@youknown/react-ui/src'
import { BubbleMenu, Editor } from '@tiptap/react'
import React, { ReactNode } from 'react'
import './index.scss'
import Bold from './bold'
import BulletList from './bullet-list'
import CodeBlock from './code-block'
import Eraser from './eraser'
import HeadingPicker from './heading-picker'
import InlineCode from './inline-code'
import Italic from './italic'
import OrderList from './order-list'
import Redo from './redo'
import Strike from './strike'
import TablePicker from './table-picker'
import Underline from './underline'
import Undo from './undo'
import TextAlignPicker from './text-align-picker'
import ImgPicker from './img-picker'
import Blockquote from './blockquote'
import HighlightPicker from './highlight-picker'
import TextColorPicker from './text-color-picker'
import LinkPicker from './link-picker'
import ImgCleaner from './img-cleaner'
import ImgEditor from './img-editor'
import Insert from './insert'
import HorizontalDivider from './horizontal-divider'
import ToolbarContext from './toolbar-context'
import CodeOff from './code-off'

export default function EditorToolbar({ editor }: { editor: Editor | null }) {
	if (!editor) return null

	const tippyOptions = {
		duration: 100,
		zIndex: 2000,
		maxWidth: 'none'
	}

	let bubbleContent: ReactNode = null
	if (editor.isActive('code')) {
		bubbleContent = <CodeOff />
	} else if (editor.isActive('image')) {
		bubbleContent = (
			<>
				<ImgEditor />
				<ImgCleaner />
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
			</>
		)
	}

	const bubbleMenu = (
		<BubbleMenu
			pluginKey="textStyle"
			editor={editor}
			updateDelay={0}
			tippyOptions={tippyOptions}
			shouldShow={() =>
				editor.isActive('code') ||
				editor.isActive('image') ||
				editor.isActive('heading') ||
				editor.isActive('paragraph')
			}
		>
			<Space className="g-bubble-menu" size="small">
				{bubbleContent}
			</Space>
		</BubbleMenu>
	)
	const verticalDivider = <Divider className="toolbar-divider" direction="vertical" />

	return (
		<ToolbarContext.Provider value={{ editor }}>
			{bubbleMenu}

			<Space align="center">
				<Undo />
				<Redo />
				<Eraser />

				{verticalDivider}

				<Insert />

				{verticalDivider}

				<HeadingPicker />
				<Bold />
				<Italic />
				<Underline />
				<Strike />
				<InlineCode />
				<HighlightPicker />
				<TextColorPicker />
				{/* <LinkPicker /> */}

				{verticalDivider}

				<BulletList />
				<OrderList />
				<TextAlignPicker />

				{verticalDivider}

				<Blockquote />
				{/* <CodeBlock  />
				<HorizontalDivider  />
				<TablePicker  />
				<ImgPicker  /> */}
			</Space>
		</ToolbarContext.Provider>
	)
}
