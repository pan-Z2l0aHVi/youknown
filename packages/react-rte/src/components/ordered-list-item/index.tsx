import './index.scss'

import { TbListNumbers } from 'react-icons/tb'

import { Editor } from '@tiptap/react'
import { Dropdown } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import { UI_EDITOR_PREFIX } from '../../common'

export default function OrderedListItem(props: { editor: Editor }) {
	const { editor } = props
	const prefixCls = `${UI_EDITOR_PREFIX}-ordered-list-item`
	return (
		<Dropdown.Item
			prefix={
				<div
					className={cls(prefixCls, {
						active: editor.isActive('orderedlist'),
						disabled: !editor.can().toggleOrderedList()
					})}
				>
					<TbListNumbers />
				</div>
			}
			closeAfterItemClick
			onClick={() => {
				editor.chain().focus().toggleOrderedList().run()
			}}
		>
			有序列表
		</Dropdown.Item>
	)
}
