import { EditorOptions, useEditor as useTiptapEditor } from '@tiptap/react'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import CharacterCount from '@tiptap/extension-character-count'

export default function useEditor(options?: Partial<EditorOptions>) {
	return useTiptapEditor({
		extensions: [
			StarterKit.configure({
				heading: { levels: [1, 2, 3, 4] }
			}),
			Typography,
			CharacterCount,
			Placeholder.configure({ placeholder: '写点什么...' }),
			Highlight.configure({
				multicolor: true
			}),
			Color.configure({
				types: ['textStyle']
			}),
			TextStyle,
			TextAlign.configure({
				types: ['heading', 'paragraph']
			}),
			Link.configure({
				openOnClick: false
			}),
			Underline,
			Table.configure({
				resizable: true
			}),
			TableRow,
			TableHeader,
			TableCell,
			Image.configure({
				inline: false,
				HTMLAttributes: {
					class: 'g-editor-image'
				}
			})
		],
		autofocus: false,
		...options
	})
}
