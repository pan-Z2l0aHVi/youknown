import FileHandler from '@tiptap/extension-file-handler'
import type { Extensions } from '@youknown/react-rte/src'
import Blockquote from '@youknown/react-rte/src/extensions/blockquote'
import Bold from '@youknown/react-rte/src/extensions/bold'
import BulletList from '@youknown/react-rte/src/extensions/bullet-list'
import Code from '@youknown/react-rte/src/extensions/code'
import CodeBlock from '@youknown/react-rte/src/extensions/code-block'
import Heading from '@youknown/react-rte/src/extensions/heading'
import Highlight from '@youknown/react-rte/src/extensions/highlight'
import HorizontalRule from '@youknown/react-rte/src/extensions/horizontal-rule'
import Image from '@youknown/react-rte/src/extensions/image'
import Italic from '@youknown/react-rte/src/extensions/italic'
import Link from '@youknown/react-rte/src/extensions/link'
import OrderedList from '@youknown/react-rte/src/extensions/ordered-list'
import Strike from '@youknown/react-rte/src/extensions/strike'
import Table from '@youknown/react-rte/src/extensions/table'
import TextAlign from '@youknown/react-rte/src/extensions/text-align'
import TextColor from '@youknown/react-rte/src/extensions/text-color'
import Underline from '@youknown/react-rte/src/extensions/underline'

import { onCustomDrop, onCustomPaste, onCustomUpload } from '@/utils/rte-custom'

import { customEmojis } from './emojis'
const { Emoji, emojis } = await import('@tiptap/extension-emoji')

export const DOC_EDITOR_KIT: Extensions = [
  Heading,
  Bold,
  Strike,
  Italic,
  Underline,
  Code,
  Link,
  TextColor,
  Highlight,
  TextAlign,
  Blockquote,
  Table,
  BulletList,
  OrderedList,
  CodeBlock,
  HorizontalRule,
  Image.configure({ onCustomUpload }),
  FileHandler.configure({
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    onPaste: onCustomPaste,
    onDrop: onCustomDrop
  })
]

export const COMMENT_EDITOR_KIT: Extensions = [
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Link,
  Blockquote,
  CodeBlock,
  Image.configure({ onCustomUpload }),
  FileHandler.configure({
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    onPaste: onCustomPaste,
    onDrop: onCustomDrop
  }),
  Emoji.configure({ emojis: emojis.concat(customEmojis) })
]
