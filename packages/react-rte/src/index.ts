export { Editor } from '@tiptap/core'
import { MenuBar } from './components/menu-bar'
import { RichTextContent } from './components/rich-text-content'
import { useRTE } from './hooks/useRTE'

export const RTE = {
	Menu: MenuBar,
	Content: RichTextContent,
	use: useRTE
}

export { loadLanguages } from './utils/load-langs'

export { default as Underline } from './extensions/underline'
export { default as Heading } from './extensions/heading'
export { default as CodeBlock } from './extensions/code-block'
export { default as Bold } from './extensions/bold'
export { default as Italic } from './extensions/italic'
export { default as Strike } from './extensions/strike'
export { default as Code } from './extensions/code'
export { default as TextAlign } from './extensions/text-align'
export { default as Blockquote } from './extensions/blockquote'
export { default as Highlight } from './extensions/highlight'
export { default as TextColor } from './extensions/text-color'
export { default as HorizontalRule } from './extensions/horizontal-rule'
export { default as BulletList } from './extensions/bullet-list'
export { default as OrderedList } from './extensions/ordered-list'
export { default as Link } from './extensions/link'
export { default as Image } from './extensions/image'
export { default as Table } from './extensions/table'
