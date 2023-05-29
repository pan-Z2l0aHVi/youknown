import { Dropdown } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbLink } from 'react-icons/tb'
import './index.scss'
import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

export default function LinkItem() {
	const { editor, setLinkModalOpen } = useContext(ToolbarContext)
	const prefixCls = `${UI_EDITOR_PREFIX}-link-item`
	return (
		<Dropdown.Item
			prefix={
				<div
					className={cls(`${prefixCls}-icon`, {
						active: editor.isActive('link'),
						disabled: !editor.can().setLink({ href: '' })
					})}
				>
					<TbLink />
				</div>
			}
			closeAfterItemClick
			onClick={() => {
				setLinkModalOpen(true)
			}}
		>
			链接
		</Dropdown.Item>
	)
}
