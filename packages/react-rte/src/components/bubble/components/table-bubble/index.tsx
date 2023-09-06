import './index.scss'

import { Editor } from '@tiptap/react'
import { Divider } from '@youknown/react-ui/src'

import { UI_EDITOR_PREFIX } from '../../../../common'
import CellMergeBtn from './components/cell-merge-btn'
import CellSplitBtn from './components/cell-split-btn'
import ColAfterAddBtn from './components/col-after-add-btn'
import ColBeforeAddBtn from './components/col-before-add-btn'
import ColDeleteBtn from './components/col-delete-btn'
import RowAfterAddBtn from './components/row-after-add-btn'
import RowBeforeAddBtn from './components/row-before-add-btn'
import RowDeleteBtn from './components/row-delete-btn'
import TableDeleteBtn from './components/table-delete-btn'

interface TableBubbleProps {
	editor: Editor
}
export default function TableBubble(props: TableBubbleProps) {
	const { editor } = props
	const prefixCls = `${UI_EDITOR_PREFIX}-table-bubble`
	const verticalDivider = <Divider className={`${prefixCls}-divider`} size="small" direction="vertical" />
	return (
		<>
			<CellMergeBtn editor={editor} />
			<CellSplitBtn editor={editor} />
			<ColBeforeAddBtn editor={editor} />
			<ColAfterAddBtn editor={editor} />
			<RowBeforeAddBtn editor={editor} />
			<RowAfterAddBtn editor={editor} />
			<RowDeleteBtn editor={editor} />
			<ColDeleteBtn editor={editor} />
			{verticalDivider}
			<TableDeleteBtn editor={editor} />
		</>
	)
}
