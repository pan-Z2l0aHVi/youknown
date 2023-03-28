import { Dropdown } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbLink } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function LinkItem() {
	const { editor, setLinkModalOpen } = useContext(ToolbarContext)
	return (
		<Dropdown.Item
			prefix={
				<div
					className={cls('g-link-item-icon', {
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
