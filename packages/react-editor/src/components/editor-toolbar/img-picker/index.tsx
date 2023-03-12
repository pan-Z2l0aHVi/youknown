import { Dropdown } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext, useState } from 'react'
import { HiOutlinePhotograph } from 'react-icons/hi'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function ImgPicker() {
	const { editor } = useContext(ToolbarContext)
	const [picURL, setPicURL] = useState('http://pic.5tu.cn/uploads/allimg/2010/pic_5tu_big_202009292005352919.jpg')
	return (
		<Dropdown.Item
			prefix={
				<div className={cls('g-img-picker')}>
					<HiOutlinePhotograph />
				</div>
			}
			closeAfterItemClick
			onClick={() => {
				editor
					.chain()
					.focus()
					.setImage({
						src: picURL
					})
					.run()
			}}
		>
			图片
		</Dropdown.Item>
	)
}
