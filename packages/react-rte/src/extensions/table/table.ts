import type { TableOptions } from '@tiptap/extension-table'
import TiptapTable from '@tiptap/extension-table'

import TableItem from '../../components/table-item'
import TableOperator from '../../components/table-operator'
import { TableCell } from './cell'
import { TableHeader } from './header'
import { TableRow } from './row'

export const Table = TiptapTable.extend<
  TableOptions & {
    insert: typeof TableItem
    floating: typeof TableItem
    bubble: typeof TableOperator
  }
>({
  addOptions() {
    return {
      ...this.parent?.(),
      resizable: true,
      lastColumnResizable: false,
      insert: TableItem,
      floating: TableItem,
      bubble: TableOperator
    }
  },

  addExtensions() {
    return [TableHeader, TableRow, TableCell]
  }
})
