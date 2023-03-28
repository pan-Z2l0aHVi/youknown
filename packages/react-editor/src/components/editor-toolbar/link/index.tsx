import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbLink } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function Link() {
	const { editor, setLinkModalOpen } = useContext(ToolbarContext)
	return (
		<Tooltip placement="bottom" title="链接">
			<div
				className={cls('g-link', {
					active: editor.isActive('link'),
					disabled: !editor.can().setLink({ href: '' })
				})}
				onClick={() => {
					setLinkModalOpen(true)
				}}
			>
				<TbLink />
			</div>
		</Tooltip>
	)
}
