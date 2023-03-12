import { Editor } from '@tiptap/core'
import { createContext } from 'react'

const ToolbarContext = createContext<{
	editor: Editor
}>(null as any)

export default ToolbarContext
