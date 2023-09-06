import './index.scss'

import { useMemo, useState } from 'react'
import { MdOutlineTableChart } from 'react-icons/md'
import { TbChevronRight } from 'react-icons/tb'

import { Editor } from '@tiptap/react'
import { Dropdown } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import { UI_EDITOR_PREFIX } from '../../common'

export default function TableItem(props: { editor: Editor }) {
	const { editor } = props
	const [row, setRow] = useState(3)
	const [col, setCol] = useState(3)

	const insertDisabled = !editor.can().insertTable({ rows: row, cols: col })
	const handleSelect = () => {
		editor.chain().focus().insertTable({ rows: row, cols: col }).run()
		Dropdown.close()
	}

	const tableList = useMemo(() => Array.from(Array(10)).map(() => Array.from(Array(10))), [])

	const prefixCls = `${UI_EDITOR_PREFIX}-table-item`

	const contentEle = (
		<Dropdown.Menu>
			<div className={`${prefixCls}-popup`}>
				<div className={`${prefixCls}-list`}>
					{tableList.map((item, i) =>
						item.map((_, j) => (
							<div
								key={`${i}x${j}`}
								className={cls(`${prefixCls}-ceil`, {
									active: i < row && j < col
								})}
								onMouseEnter={() => {
									setRow(i + 1)
									setCol(j + 1)
								}}
								onClick={handleSelect}
							></div>
						))
					)}
				</div>
				<div className={`${prefixCls}-rows-cols`}>
					{row} x {col}
				</div>
			</div>
		</Dropdown.Menu>
	)

	return (
		<Dropdown
			disabled={insertDisabled}
			trigger="hover"
			spacing={-2}
			placement="right-start"
			content={contentEle}
			appendTo={null}
		>
			<Dropdown.Item
				disabled={insertDisabled}
				prefix={
					<div className={prefixCls}>
						<MdOutlineTableChart />
					</div>
				}
				suffix={<TbChevronRight className={`${prefixCls}-chevron-icon`} />}
			>
				表格
			</Dropdown.Item>
		</Dropdown>
	)
}
