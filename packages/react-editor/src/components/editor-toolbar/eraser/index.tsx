import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbEraser } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function Eraser() {
	const { editor } = useContext(ToolbarContext)
	return (
		<Tooltip placement="bottom" title="清除格式">
			<div
				className={cls('g-eraser', {
					disabled: !editor.can().unsetAllMarks()
				})}
				onClick={() => {
					editor.chain().focus().clearNodes().unsetAllMarks().run()
				}}
			>
				<TbEraser />
			</div>
		</Tooltip>
	)
}
