import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbBold } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function Bold() {
	const { editor } = useContext(ToolbarContext)
	return (
		<Tooltip placement="bottom" title="粗体">
			<div
				className={cls('g-bold-icon', {
					active: editor.isActive('bold'),
					disabled: !editor.can().toggleBold()
				})}
				onClick={() => {
					editor.chain().focus().toggleBold().run()
				}}
			>
				<TbBold />
			</div>
		</Tooltip>
	)
}
