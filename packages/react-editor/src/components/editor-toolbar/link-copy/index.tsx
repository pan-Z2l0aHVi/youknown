import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbCopy } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function LinkCopy() {
	const { editor } = useContext(ToolbarContext)
	return (
		<Tooltip placement="bottom" title="复制 URL">
			<div
				className={cls('g-link-copy')}
				onClick={() => {
					alert(editor.getAttributes('link').href)
				}}
			>
				<TbCopy />
			</div>
		</Tooltip>
	)
}
