import { Dropdown } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbCodePlus } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function CodeBlock() {
	const { editor } = useContext(ToolbarContext)
	return (
		<Dropdown.Item
			prefix={
				<div
					className={cls('g-code-block-icon', {
						active: editor.isActive('codeBlock'),
						disabled: !editor.can().toggleCodeBlock()
					})}
				>
					<TbCodePlus />
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
