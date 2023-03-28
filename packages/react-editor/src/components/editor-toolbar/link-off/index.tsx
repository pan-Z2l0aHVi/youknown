import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbLinkOff } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function LinkOff() {
	const { editor } = useContext(ToolbarContext)
	return (
		<Tooltip placement="bottom" title="取消链接">
			<div
				className={cls('g-link-off')}
				onClick={() => {
					editor.chain().focus().extendMarkRange('link').unsetLink().run()
				}}
			>
				<TbLinkOff />
			</div>
		</Tooltip>
	)
}
