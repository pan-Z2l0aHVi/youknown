import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbPhotoCancel } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function ImgRemove() {
	const { editor } = useContext(ToolbarContext)
	return (
		<Tooltip placement="bottom" title="删除图片">
			<div
				className={cls('g-img-remove')}
				onClick={() => {
					editor.chain().focus().deleteSelection().run()
				}}
			>
				<TbPhotoCancel />
			</div>
		</Tooltip>
	)
}
