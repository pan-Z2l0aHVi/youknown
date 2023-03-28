import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbExternalLink } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function LinkOpen() {
	const { editor } = useContext(ToolbarContext)
	return (
		<Tooltip placement="bottom" title="访问链接">
			<div
				className={cls('g-link-open')}
				onClick={() => {
					window.open(editor.getAttributes('link').href)
				}}
			>
				<TbExternalLink />
			</div>
		</Tooltip>
	)
}
