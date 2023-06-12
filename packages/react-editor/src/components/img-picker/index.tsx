import { Dropdown } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { useContext, useState } from 'react'
import { TbPhoto } from 'react-icons/tb'
import './index.scss'
import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

export default function ImgPicker() {
	const { editor } = useContext(ToolbarContext)
	const [picURL, setPicURL] = useState('http://pic.5tu.cn/uploads/allimg/2010/pic_5tu_big_202009292005352919.jpg')
	const prefixCls = `${UI_EDITOR_PREFIX}-img-picker`
	return (
		<Dropdown.Item
			prefix={
				<div className={cls(prefixCls)}>
					<TbPhoto />
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
