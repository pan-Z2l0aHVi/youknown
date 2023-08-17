import './index.scss'

import { useContext } from 'react'
import { TbBold } from 'react-icons/tb'

import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

export default function Bold() {
	const { editor } = useContext(ToolbarContext)
	const prefixCls = `${UI_EDITOR_PREFIX}-bold-btn`
	return (
		<Tooltip placement="bottom" title="粗体">
			<div
				className={cls(prefixCls, {
					active: editor.isActive('bold'),
					disabled: !editor.can().toggleBold()
				})}
				onClick={() => {
					editor.chain().focus().toggleBold().run()
				}}
			>
				<TbBold />
			</div>
		</Tooltip>
	)
}
