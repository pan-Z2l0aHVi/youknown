import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbPhotoEdit } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function ImgEdit() {
	const { editor, setImgModalOpen } = useContext(ToolbarContext)

	return (
		<Tooltip placement="bottom" title="编辑图片">
			<div
				className={cls('g-img-edit')}
				onClick={() => {
					setImgModalOpen(true)
				}}
			>
				<TbPhotoEdit />
			</div>
		</Tooltip>
	)
}
