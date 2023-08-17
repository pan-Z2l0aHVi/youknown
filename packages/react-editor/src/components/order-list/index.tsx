import './index.scss'

import { useContext } from 'react'
import { TbListNumbers } from 'react-icons/tb'

import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

export default function OrderList() {
	const { editor } = useContext(ToolbarContext)
	const prefixCls = `${UI_EDITOR_PREFIX}-order-list-btn`
	return (
		<Tooltip placement="bottom" title="有序列表">
			<div
				className={cls(prefixCls, {
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
