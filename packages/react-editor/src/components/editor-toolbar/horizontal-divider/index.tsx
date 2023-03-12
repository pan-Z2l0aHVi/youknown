import { Dropdown } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbLayoutDistributeHorizontal } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function HorizontalDivider() {
	const { editor } = useContext(ToolbarContext)
	const disabled = !editor.can().setHorizontalRule()
	return (
		<Dropdown.Item
			prefix={
				<div
					className={cls('g-horizontal-divider', {
						disabled
					})}
				>
					<TbLayoutDistributeHorizontal />
				</div>
			}
			closeAfterItemClick
			onClick={() => {
				if (disabled) return
				editor.chain().focus().setHorizontalRule().run()
			}}
		>
			分割线
		</Dropdown.Item>
	)
}
