import type { Editor } from '@tiptap/react'
import { lazy, Suspense } from 'react'

const TableColumnMenu = lazy(() => import('./table-column'))
const TableRowMenu = lazy(() => import('./table-row'))

interface TableMenusProps {
  editor: Editor
}
export default function TableMenus(props: TableMenusProps) {
  const { editor } = props
  return (
    <Suspense>
      <TableRowMenu editor={editor} />
      <TableColumnMenu editor={editor} />
    </Suspense>
  )
}
