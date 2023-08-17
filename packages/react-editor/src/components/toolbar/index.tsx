import './index.scss'

import { useState } from 'react'

import { Editor } from '@tiptap/react'
import { Divider, Space } from '@youknown/react-ui/src'

import { UI_EDITOR_PREFIX } from '../../constants'
import EditorContext from '../../contexts/editorContext'
import Blockquote from '../blockquote'
import Bold from '../bold'
import { BubbleBar } from '../bubble-bar'
import BulletList from '../bullet-list'
import Eraser from '../eraser'
import { FloatingBar } from '../floating-bar'
import HeadingPicker from '../heading-picker'
import HighlightPicker from '../highlight-picker'
import ImgModal from '../img-modal'
import InlineCode from '../inline-code'
import Insert from '../insert'
import Italic from '../italic'
import LinkModal from '../link-modal'
import OrderList from '../order-list'
import Redo from '../redo'
import Strike from '../strike'
import TextAlignPicker from '../text-align-picker'
import TextColorPicker from '../text-color-picker'
import Underline from '../underline'
import Undo from '../undo'

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
