import type { Editor } from '@tiptap/react'

import TableColumnMenu from './table-column'
import TableRowMenu from './table-row'

interface TableMenusProps {
  editor: Editor
}
export default function TableMenus(props: TableMenusProps) {
  const { editor } = props
  return (
    <>
      <TableRowMenu editor={editor} />
      <TableColumnMenu editor={editor} />
    </>
  )
}
