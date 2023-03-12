import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { AiOutlineUnderline } from 'react-icons/ai'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function Underline() {
	const { editor } = useContext(ToolbarContext)
	return (
		<Tooltip placement="bottom" title="下划线">
			<div
				className={cls('g-underline-icon', {
					active: editor.isActive('underline'),
					disabled: !editor.can().toggleUnderline()
				})}
				onClick={() => {
					editor.chain().focus().toggleUnderline().run()
				}}
			>
				<AiOutlineUnderline />
			</div>
		</Tooltip>
	)
}
