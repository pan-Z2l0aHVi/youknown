import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbListNumbers } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function OrderList() {
	const { editor } = useContext(ToolbarContext)
	return (
		<Tooltip placement="bottom" title="有序列表">
			<div
				className={cls('g-order-list-icon', {
					active: editor.isActive('orderlist'),
					disabled: !editor.can().toggleOrderedList()
				})}
				onClick={() => {
					editor.chain().focus().toggleOrderedList().run()
				}}
			>
				<TbListNumbers />
			</div>
		</Tooltip>
	)
}
