import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbTrashX } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function ImgCleaner() {
	const { editor } = useContext(ToolbarContext)
	return (
		<Tooltip placement="bottom" title="删除图片">
			<div
				className={cls('g-img-cleaner')}
				onClick={() => {
					editor.commands.deleteSelection()
					editor.commands.focus()
				}}
			>
				<TbTrashX />
			</div>
		</Tooltip>
	)
}
