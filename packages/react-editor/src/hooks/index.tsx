import CharacterCount from '@tiptap/extension-character-count'
import Color from '@tiptap/extension-color'
import Document from '@tiptap/extension-document'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import Underline from '@tiptap/extension-underline'
import { EditorOptions, useEditor as useTiptapEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// import ImageResize from '../exts/tiptap-resizable-image'
import { UI_EDITOR_PREFIX } from '../constants'

export default function useEditor(options?: Partial<EditorOptions>) {
	return useTiptapEditor({
		extensions: [
			Document.extend({
				content: 'heading block*'
			}),
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
