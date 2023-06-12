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
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import CharacterCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import Image from '@tiptap/extension-image'
// import ImageResize from '../exts/tiptap-resizable-image'
import { UI_EDITOR_PREFIX } from '../constants'

const CustomDocument = Document.extend({
	content: 'heading block*'
})

export default function useEditor(options?: Partial<EditorOptions>) {
	return useTiptapEditor({
		extensions: [
			CustomDocument,
			StarterKit.configure({
				heading: { levels: [1, 2, 3, 4] },
				document: false // use customDoc
			}),
			Typography,
			CharacterCount,
			Placeholder.configure({
				placeholder: ({ node }) => {
					if (node.type.name === 'heading') {
						return '请输入标题'
					}
					return '输入内容 / 唤起更多'
				}
			}),
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
				openOnClick: false,
				validate: href => /^https?:\/\//.test(href)
			}),
			Underline,
			Table.configure({
				resizable: true
			}),
			TableRow,
			TableHeader,
			TableCell,
			// ImageResize.configure({
			// 	inline: false,
			// 	HTMLAttributes: {
			// 		class: `${UI_EDITOR_PREFIX}-image`
			// 	},
			// 	resizeIcon: <>ResizeMe</>
			// })
			Image.configure({
				inline: false,
				HTMLAttributes: {
					class: `${UI_EDITOR_PREFIX}-image`
				}
			})
		],
		autofocus: false,
		...options
	})
}
