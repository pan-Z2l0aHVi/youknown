import './index.scss'

import { useContext } from 'react'
import { TbCopy } from 'react-icons/tb'

import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

export default function LinkCopy() {
	const { editor } = useContext(ToolbarContext)
	const prefixCls = `${UI_EDITOR_PREFIX}-link-copy`
	return (
		<Tooltip placement="bottom" title="复制 URL">
			<div
				className={cls(prefixCls)}
				onClick={() => {
					alert(editor.getAttributes('link').href)
				}}
			>
				<TbCopy />
			</div>
		</Tooltip>
	)
}
