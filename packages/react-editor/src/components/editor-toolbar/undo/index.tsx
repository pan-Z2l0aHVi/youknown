import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbArrowBackUp } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function Undo() {
	const { editor } = useContext(ToolbarContext)
	const disabled = !editor.can().undo()
	return (
		<Tooltip placement="bottom" title="撤销">
			<div
				className={cls('g-undo', {
					disabled
				})}
				onClick={() => {
					if (disabled) return
					editor.chain().focus().undo().run()
				}}
			>
				<TbArrowBackUp />
			</div>
		</Tooltip>
	)
}
