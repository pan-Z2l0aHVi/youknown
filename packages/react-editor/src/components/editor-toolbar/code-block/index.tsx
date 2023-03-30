import { Dropdown } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbSourceCode } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'
import { UI_EDITOR_PREFIX } from '../../../constants'

export default function CodeBlock() {
	const { editor } = useContext(ToolbarContext)
	const prefixCls = `${UI_EDITOR_PREFIX}-code-block-btn`
	return (
		<Dropdown.Item
			prefix={
				<div
					className={cls(prefixCls, {
						active: editor.isActive('codeBlock'),
						disabled: !editor.can().toggleCodeBlock()
					})}
				>
					<TbSourceCode />
				</div>
			}
			closeAfterItemClick
			onClick={() => {
				editor.chain().focus().toggleCodeBlock().run()
			}}
		>
			代码块
		</Dropdown.Item>
	)
}
