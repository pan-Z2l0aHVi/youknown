import { Dropdown } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext, useMemo, useState } from 'react'
import { TbChevronRight, TbTable } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function TablePicker() {
	const { editor } = useContext(ToolbarContext)
	const [row, setRow] = useState(3)
	const [col, setCol] = useState(3)

	const insertDisabled = !editor.can().insertTable({ rows: row, cols: col })
	const handleSelect = () => {
		editor.chain().focus().insertTable({ rows: row, cols: col }).run()
		Dropdown.close()
	}

	const tableList = useMemo(() => Array.from(Array(10)).map(() => Array.from(Array(10))), [])

	const contentEle = (
		<Dropdown.Menu>
			<div className="g-table-popup">
				<div className="g-table-list">
					{tableList.map((item, i) =>
						item.map((_, j) => (
							<div
								key={`${i}x${j}`}
								className={cls('g-table-ceil', {
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
				<div className="g-table-rows-cols">
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
					<div className="g-table-picker">
						<TbTable />
					</div>
				}
				suffix={<TbChevronRight />}
			>
				表格
			</Dropdown.Item>
		</Dropdown>
	)
}
