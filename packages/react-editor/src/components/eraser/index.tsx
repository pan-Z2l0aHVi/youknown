import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { useContext } from 'react'
import { TbEraser } from 'react-icons/tb'
import './index.scss'
import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

export default function Eraser() {
	const { editor } = useContext(ToolbarContext)
	const prefixCls = `${UI_EDITOR_PREFIX}-eraser`
	return (
		<Tooltip placement="bottom" title="清除格式">
			<div
				className={cls(prefixCls, {
					disabled: !editor.can().unsetAllMarks()
				})}
				onClick={() => {
					editor.chain().focus().clearNodes().unsetAllMarks().run()
				}}
			>
				<TbEraser />
			</div>
		</Tooltip>
	)
}
