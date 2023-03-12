import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbArrowForwardUp } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function Redo() {
	const { editor } = useContext(ToolbarContext)
	const disabled = !editor.can().redo()
	return (
		<Tooltip placement="bottom" title="重做">
			<div
				className={cls('g-redo', {
					disabled
				})}
				onClick={() => {
					if (disabled) return
					editor.chain().focus().redo().run()
				}}
			>
				<TbArrowForwardUp />
			</div>
		</Tooltip>
	)
}
