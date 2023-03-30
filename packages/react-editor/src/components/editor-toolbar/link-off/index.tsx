import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbLinkOff } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'
import { UI_EDITOR_PREFIX } from '../../../constants'

export default function LinkOff() {
	const { editor } = useContext(ToolbarContext)
	const prefixCls = `${UI_EDITOR_PREFIX}-link-off`
	return (
		<Tooltip placement="bottom" title="取消链接">
			<div
				className={cls(prefixCls)}
				onClick={() => {
					editor.chain().focus().extendMarkRange('link').unsetLink().run()
				}}
			>
				<TbLinkOff />
			</div>
		</Tooltip>
	)
}
