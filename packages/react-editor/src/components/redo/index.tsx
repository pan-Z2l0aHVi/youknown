import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbArrowForwardUp } from 'react-icons/tb'
import './index.scss'
import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

export default function Redo() {
	const { editor } = useContext(ToolbarContext)
	const disabled = !editor.can().redo()
	const prefixCls = `${UI_EDITOR_PREFIX}-redo-btn`
	return (
		<Tooltip placement="bottom" title="重做">
			<div
				className={cls(prefixCls, {
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
