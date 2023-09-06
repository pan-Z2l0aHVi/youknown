import { Dispatch, SetStateAction } from 'react'

import { Editor } from '@tiptap/react'

import LinkPicker from '../../../link-picker'
import LinkCopyBtn from './components/link-copy-btn'
import LinkOpenBtn from './components/link-open-btn'
import UnLinkBtn from './components/unlink-btn'

interface LinkBubbleProps {
	editor: Editor
	linkPopOpen: boolean
	setLinkPopOpen: Dispatch<SetStateAction<boolean>>
}
export default function LinkBubble(props: LinkBubbleProps) {
	const { editor, linkPopOpen, setLinkPopOpen } = props
	return (
		<>
			<LinkPicker editor={editor} isEdit linkPopOpen={linkPopOpen} setLinkPopOpen={setLinkPopOpen} />
			<UnLinkBtn editor={editor} />
			<LinkCopyBtn editor={editor} />
			<LinkOpenBtn editor={editor} />
		</>
	)
}
