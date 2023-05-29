import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbItalic } from 'react-icons/tb'
import './index.scss'
import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

export default function Italic() {
	const { editor } = useContext(ToolbarContext)
	const prefixCls = `${UI_EDITOR_PREFIX}-italic-btn`
	return (
		<Tooltip placement="bottom" title="斜体">
			<div
				className={cls(prefixCls, {
					active: editor.isActive('italic'),
					disabled: !editor.can().toggleItalic()
				})}
				onClick={() => {
					editor.chain().focus().toggleItalic().run()
				}}
			>
				<TbItalic />
			</div>
		</Tooltip>
	)
}
