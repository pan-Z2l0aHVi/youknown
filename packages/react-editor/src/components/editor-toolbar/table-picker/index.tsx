import { useBoolean } from '@youknown/react-hook/src'
import { Dropdown, Popover } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { TbChevronRight, TbTable } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function TablePicker() {
	const { editor } = useContext(ToolbarContext)
	const [open, { setBool: setOpen, setFalse: hide, setReverse: toggle }] = useBoolean(false)
	const [row, setRow] = useState(3)
	const [col, setCol] = useState(3)

	const handleReset = () => {
		setRow(3)
		setCol(3)
	}

	const handleSelect = () => {
		editor.chain().focus().insertTable({ rows: row, cols: col }).run()
		hide()
	}

	const tableList = useMemo(() => Array.from(Array(10)).map(() => Array.from(Array(10))), [])

	useEffect(() => {
		if (open) {
			handleReset()
		}
	}, [open])

	const contentEle = (
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
	)

	return (
		<Popover trigger="hover" open={open} onOpenChange={setOpen} placement="right-start" content={contentEle}>
			<Dropdown.Item
				prefix={
					<div className="g-table-picker">
						<TbTable />
					</div>
				}
				suffix={<TbChevronRight />}
				onClick={toggle}
			>
				表格
			</Dropdown.Item>
		</Popover>
	)
}
