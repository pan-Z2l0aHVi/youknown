import './index.scss'

import { EditorContent } from '@tiptap/react'
import { cls } from '@youknown/utils/src'
import type { ComponentProps } from 'react'
import { ForwardedRef, forwardRef } from 'react'

import { UI_EDITOR_PREFIX } from '../../common'
import type { BubbleListItem } from '../bubble'
import { Bubble } from '../bubble'
import type { FloatingListItem } from '../floating'
import { Floating } from '../floating'
import ImageResizer from '../image-resizer'
import TableMenus from '../table-menus'

interface RTEContentProps extends ComponentProps<typeof EditorContent> {
  className?: string
  tooltip?: boolean
  bubble?: boolean
  floating?: boolean
  bubbleList?: BubbleListItem[]
  floatingList?: FloatingListItem[]
}
function _RTEContent(props: RTEContentProps, ref: ForwardedRef<HTMLDivElement>) {
  const prefixCls = `${UI_EDITOR_PREFIX}-content`
  const { editor, className, tooltip = true, bubble = true, floating = true, floatingList, bubbleList, ...rest } = props
  const hasImageExt = editor && editor.extensionManager.extensions.some(ext => ext.name === 'image')
  const hasTableExt = editor && editor.extensionManager.extensions.some(ext => ext.name === 'table')
  return (
    <div ref={ref} className={cls(prefixCls, className)}>
      {floating && <Floating editor={editor} tooltip={tooltip} list={floatingList} />}
      {bubble && <Bubble editor={editor} tooltip={tooltip} list={bubbleList} />}
      {hasImageExt && <ImageResizer editor={editor} />}
      {hasTableExt && <TableMenus editor={editor} />}
      <EditorContent editor={editor} {...rest} />
    </div>
  )
}

_RTEContent.displayName = 'RTEContent'
export const RTEContent = forwardRef(_RTEContent)
