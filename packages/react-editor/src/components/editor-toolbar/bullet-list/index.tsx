import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbList } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function BulletList() {
	const { editor } = useContext(ToolbarContext)
	return (
		<Tooltip placement="bottom" title="无序列表">
			<div
				className={cls('g-bullet-list-icon', {
					active: editor.isActive('bulletlist'),
					disabled: !editor.can().toggleBulletList()
				})}
				onClick={() => {
					editor.chain().focus().toggleBulletList().run()
				}}
			>
				<TbList />
			</div>
		</Tooltip>
	)
}
