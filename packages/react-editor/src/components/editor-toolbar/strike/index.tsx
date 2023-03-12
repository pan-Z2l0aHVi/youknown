import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbStrikethrough } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function Strike() {
	const { editor } = useContext(ToolbarContext)
	return (
		<Tooltip placement="bottom" title="删除线">
			<div
				className={cls('g-strike-icon', {
					active: editor.isActive('strike'),
					disabled: !editor.can().toggleStrike()
				})}
				onClick={() => {
					editor.chain().focus().toggleStrike().run()
				}}
			>
				<TbStrikethrough />
			</div>
		</Tooltip>
	)
}
