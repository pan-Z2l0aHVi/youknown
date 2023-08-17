import './index.scss'

import { useContext } from 'react'
import { TbList } from 'react-icons/tb'

import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

export default function BulletList() {
	const { editor } = useContext(ToolbarContext)
	const prefixCls = `${UI_EDITOR_PREFIX}-bullet-list-btn`
	return (
		<Tooltip placement="bottom" title="无序列表">
			<div
				className={cls(prefixCls, {
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
