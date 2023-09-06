import './index.scss'

import { cloneElement, createElement } from 'react'

import { Editor } from '@tiptap/react'
import { useCreation } from '@youknown/react-hook/src'
import { Divider, Space } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import { UI_EDITOR_PREFIX } from '../../common'
import { useLink } from '../../hooks/useLink'
import EraserBtn from '../eraser-btn'
import InsertPicker, { insertListItem } from '../insert-picker'
import RedoBtn from '../redo-btn'
import UndoBtn from '../undo-btn'

type MenuListItem =
	| '|' // divider
	| 'heading'
	| 'bold'
	| 'italic'
	| 'strike'
	| 'underline'
	| 'code'
	| 'link'
	| 'highlight'
	| 'color'
	| 'textAlign'
interface MenuBarProps {
	editor: Editor | null
	tooltip?: boolean
	list?: MenuListItem[]
	insertList?: insertListItem[]
}
export function MenuBar(props: MenuBarProps) {
	const { editor, tooltip = true, list, insertList } = props
	const linkProps = useLink()

	const btnList = useCreation(() => {
		const defaultList = [
			'|',
			'heading',
			'bold',
			'italic',
			'underline',
			'strike',
			'code',
			'link',
			'|',
			'highlight',
			'color',
			'|',
			'textAlign'
		]
		return list ?? defaultList
	})

	if (!editor) {
		return null
	}

	const prefixCls = `${UI_EDITOR_PREFIX}-menu-bar`
	const verticalDivider = <Divider className={`${prefixCls}-divider`} direction="vertical" />

	const extensions = editor.extensionManager.extensions.filter(ext => ext.options.menu)
	const ele = btnList.map((btn, index) => {
		if (btn === '|') {
			return cloneElement(verticalDivider, { key: index })
		}
		const extension = extensions.find(ext => ext.name === btn)
		if (extension) {
			const { menu } = extension.options
			if (extension.name === 'link') {
				return createElement(menu, {
					key: extension.name,
					editor,
					extension,
					tooltip,
					...linkProps
				})
			}
			return createElement(menu, {
				key: extension.name,
				editor,
				extension,
				tooltip
			})
		}
		return null
	})

	return (
		<Space className={cls(prefixCls)} size="small" align="center">
			<UndoBtn editor={editor} tooltip={tooltip} />
			<RedoBtn editor={editor} tooltip={tooltip} />
			<EraserBtn editor={editor} tooltip={tooltip} />
			<InsertPicker editor={editor} tooltip={tooltip} list={insertList} />
			{ele}
		</Space>
	)
}
