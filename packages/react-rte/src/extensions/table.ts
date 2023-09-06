import TiptapTable, { TableOptions } from '@tiptap/extension-table'
import TiptapTableCell from '@tiptap/extension-table-cell'
import TiptapTableHeader from '@tiptap/extension-table-header'
import TiptapTableRow from '@tiptap/extension-table-row'

import TableItem from '../components/table-item'

export default TiptapTable.extend<
	TableOptions & {
		insert: typeof TableItem
	}
>({
	addOptions() {
		return {
			...this.parent?.(),
			resizable: true,
			insert: TableItem
		}
	},

	addExtensions() {
		return [TiptapTableHeader, TiptapTableRow, TiptapTableCell]
	}
})
