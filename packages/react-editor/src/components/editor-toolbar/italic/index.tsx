import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbItalic } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function Italic() {
	const { editor } = useContext(ToolbarContext)
	return (
		<Tooltip placement="bottom" title="斜体">
			<div
				className={cls('g-italic-icon', {
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
