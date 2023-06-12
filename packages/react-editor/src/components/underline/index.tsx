import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { useContext } from 'react'
import { AiOutlineUnderline } from 'react-icons/ai'
import './index.scss'
import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

export default function Underline() {
	const { editor } = useContext(ToolbarContext)
	const prefixCls = `${UI_EDITOR_PREFIX}-underline-btn`
	return (
		<Tooltip placement="bottom" title="下划线">
			<div
				className={cls(prefixCls, {
					active: editor.isActive('underline'),
					disabled: !editor.can().toggleUnderline()
				})}
				onClick={() => {
					editor.chain().focus().toggleUnderline().run()
				}}
			>
				<AiOutlineUnderline />
			</div>
		</Tooltip>
	)
}
