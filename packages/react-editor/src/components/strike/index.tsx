import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { useContext } from 'react'
import { TbStrikethrough } from 'react-icons/tb'
import './index.scss'
import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

export default function Strike() {
	const { editor } = useContext(ToolbarContext)
	const prefixCls = `${UI_EDITOR_PREFIX}-strike-btn`
	return (
		<Tooltip placement="bottom" title="删除线">
			<div
				className={cls(prefixCls, {
					active: editor.isActive('strike'),
					disabled: !editor.can().toggleStrike()
				})}
				onClick={() => {
					editor.chain().focus().toggleStrike().run()
				}}
			>
				<TbStrikethrough />
			</div>
		</Tooltip>
	)
}
