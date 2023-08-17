import './index.scss'

import { useContext } from 'react'
import { RiEditLine } from 'react-icons/ri'

import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

export default function LinkEdit() {
	const { editor, setLinkModalOpen } = useContext(ToolbarContext)
	const prefixCls = `${UI_EDITOR_PREFIX}-link-edit`
	return (
		<Tooltip placement="bottom" title="编辑链接">
			<div
				className={cls(prefixCls)}
				onClick={() => {
					setLinkModalOpen(true)
				}}
			>
				<RiEditLine />
			</div>
		</Tooltip>
	)
}
