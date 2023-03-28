import { Editor } from '@tiptap/core'
import { createContext } from 'react'

const ToolbarContext = createContext<{
	editor: Editor
	linkModalOpen: boolean
	setLinkModalOpen: (open: boolean) => void
	imgModalOpen: boolean
	setImgModalOpen: (open: boolean) => void
}>(null as any)

export default ToolbarContext
