import { Divider, Space } from '@youknown/react-ui/src'
import { Editor } from '@tiptap/react'
import React, { useState } from 'react'
import './index.scss'
import Bold from '../bold'
import BulletList from '../bullet-list'
import Eraser from '../eraser'
import HeadingPicker from '../heading-picker'
import InlineCode from '../inline-code'
import Italic from '../italic'
import OrderList from '../order-list'
import Redo from '../redo'
import Strike from '../strike'
import Underline from '../underline'
import Undo from '../undo'
import TextAlignPicker from '../text-align-picker'
import Blockquote from '../blockquote'
import HighlightPicker from '../highlight-picker'
import TextColorPicker from '../text-color-picker'
import Insert from '../insert'
import EditorContext from '../../contexts/editorContext'
import LinkModal from '../link-modal'
import ImgModal from '../img-modal'
import { BubbleBar } from '../bubble-bar'
import { FloatingBar } from '../floating-bar'
import { UI_EDITOR_PREFIX } from '../../constants'

export default function EditorToolbar({ editor }: { editor: Editor | null }) {
	const [linkModalOpen, setLinkModalOpen] = useState(false)
	const [imgModalOpen, setImgModalOpen] = useState(false)

	if (!editor) return null
	;(window as any).editor = editor // FIXME:

	const verticalDivider = <Divider className={`${UI_EDITOR_PREFIX}-toolbar-divider`} direction="vertical" />

	const toolbarEle = (
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

			{verticalDivider}

			<BulletList />
			<OrderList />
			<TextAlignPicker />

			{verticalDivider}

			<Blockquote />
		</Space>
	)

	return (
		<EditorContext.Provider
			value={{
				editor,
				linkModalOpen,
				setLinkModalOpen,
				imgModalOpen,
				setImgModalOpen
			}}
		>
			{toolbarEle}

			<BubbleBar />
			<FloatingBar />
			<LinkModal />
			<ImgModal />
		</EditorContext.Provider>
	)
}
