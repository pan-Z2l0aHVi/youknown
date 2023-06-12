import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { useContext } from 'react'
import { TbPhotoCancel } from 'react-icons/tb'
import './index.scss'
import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

export default function ImgRemove() {
	const { editor } = useContext(ToolbarContext)
	const prefixCls = `${UI_EDITOR_PREFIX}-img-remove`
	return (
		<Tooltip placement="bottom" title="删除图片">
			<div
				className={cls(prefixCls)}
				onClick={() => {
					editor.chain().focus().deleteSelection().run()
				}}
			>
				<TbPhotoCancel />
			</div>
		</Tooltip>
	)
}
