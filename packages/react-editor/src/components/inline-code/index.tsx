import './index.scss'

import { useContext } from 'react'
import { TbCode } from 'react-icons/tb'

import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

export default function InlineCode() {
	const { editor } = useContext(ToolbarContext)
	const prefixCls = `${UI_EDITOR_PREFIX}-inline-code-btn`
	return (
		<Tooltip placement="bottom" title="代码">
			<div
				className={cls(prefixCls, {
					active: editor.isActive('code'),
					disabled: !editor.can().toggleCode()
				})}
				onClick={() => {
					editor.chain().focus().toggleCode().run()
				}}
			>
				<TbCode />
			</div>
		</Tooltip>
	)
}
