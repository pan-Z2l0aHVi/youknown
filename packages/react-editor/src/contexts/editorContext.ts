import { createContext } from 'react'

import { Editor } from '@tiptap/core'

const EditorContext = createContext<{
	editor: Editor
	linkModalOpen: boolean
	setLinkModalOpen: (open: boolean) => void
	imgModalOpen: boolean
	setImgModalOpen: (open: boolean) => void
}>(null as any)

export default EditorContext
