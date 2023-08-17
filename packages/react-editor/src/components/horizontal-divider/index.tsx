import './index.scss'

import { useContext } from 'react'
import { TbLayoutDistributeHorizontal } from 'react-icons/tb'

import { Dropdown } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

export default function HorizontalDivider() {
	const { editor } = useContext(ToolbarContext)
	const disabled = !editor.can().setHorizontalRule()
	const prefixCls = `${UI_EDITOR_PREFIX}-horizontal-divider`
	return (
		<Dropdown.Item
			prefix={
				<div
					className={cls(prefixCls, {
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
