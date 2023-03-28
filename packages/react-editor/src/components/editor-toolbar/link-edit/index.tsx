import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { RiEditLine } from 'react-icons/ri'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function LinkEdit() {
	const { editor, setLinkModalOpen } = useContext(ToolbarContext)
	return (
		<Tooltip placement="bottom" title="编辑链接">
			<div
				className={cls('g-link-edit')}
				onClick={() => {
					setLinkModalOpen(true)
				}}
			>
				<RiEditLine />
			</div>
		</Tooltip>
	)
}
