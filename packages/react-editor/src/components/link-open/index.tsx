import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbExternalLink } from 'react-icons/tb'
import './index.scss'
import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

export default function LinkOpen() {
	const { editor } = useContext(ToolbarContext)
	const prefixCls = `${UI_EDITOR_PREFIX}-link-off`
	return (
		<Tooltip placement="bottom" title="访问链接">
			<div
				className={cls(prefixCls)}
				onClick={() => {
					window.open(editor.getAttributes('link').href)
				}}
			>
				<TbExternalLink />
			</div>
		</Tooltip>
	)
}
