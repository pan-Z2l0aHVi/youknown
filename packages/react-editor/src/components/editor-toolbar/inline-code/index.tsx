import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbCode } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function InlineCode() {
	const { editor } = useContext(ToolbarContext)
	return (
		<Tooltip placement="bottom" title="代码">
			<div
				className={cls('g-inline-code-icon', {
					active: editor.isActive('code'),
					disabled: !editor.can().toggleCode()
				})}
				onClick={() => {
					editor.chain().focus().toggleCode().run()
				}}
			>
				<TbCode />
			</div>
		</Tooltip>
	)
}
