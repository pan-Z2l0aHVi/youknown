import './index.scss'

import { cloneElement, createElement, useState } from 'react'

import { Editor, FloatingMenu } from '@tiptap/react'
import { useCreation } from '@youknown/react-hook/src'
import { Button, Divider, Dropdown } from '@youknown/react-ui/src'

import { UI_EDITOR_PREFIX } from '../../common'
import { TbPlus } from 'react-icons/tb'

export type FloatingListItem =
	| '-' // divider
	| 'blockquote'
	| 'image'
	| 'table'
	| 'bulletList'
	| 'orderedList'
	| 'codeBlock'
	| 'horizontalRule'
interface FloatingProps {
	editor: Editor | null
	tooltip?: boolean
	list?: FloatingListItem[]
}
export function Floating(props: FloatingProps) {
	const { editor, tooltip = true, list } = props

	const btnList = useCreation(() => {
		const defaultList = [
			'image',
			'table',
			'-',
			'blockquote',
			'codeBlock',
			'horizontalRule',
			'-',
			'bulletList',
			'orderedList'
		]
		return list ?? defaultList
	})
	const [open, setOpen] = useState(false)

	if (!editor) {
		return null
	}

	const prefixCls = `${UI_EDITOR_PREFIX}-floating`
	const divider = <Divider className={`${prefixCls}-divider`} size="small" />

	const renderFloatingContent = () => {
		const extensions = editor.extensionManager.extensions.filter(ext => ext.options.floating)
		return btnList.map((btn, index) => {
			if (btn === '-') {
				return cloneElement(divider, { key: index })
			}
			const extension = extensions.find(ext => ext.name === btn)
			if (extension) {
				const { floating, onCustomUpload } = extension.options
				const basicProps = {
					key: extension.name,
					editor,
					extension,
					tooltip
				}
				if (extension.name === 'image') {
					return createElement(floating, {
						...basicProps,
						onCustomUpload
					})
				}
				return createElement(floating, basicProps)
			}
			return null
		})
	}

	return (
		<FloatingMenu
			editor={editor}
			tippyOptions={{
				duration: 300,
				zIndex: 9,
				maxWidth: 'none',
				placement: 'left',
				onHide: () => {
					setOpen(false)
				}
			}}
		>
			<Dropdown
				trigger="manual"
				placement="bottom-start"
				appendTo={null}
				open={open}
				onOpenChange={setOpen}
				content={<Dropdown.Menu className={`${prefixCls}-dropdown`}>{renderFloatingContent()}</Dropdown.Menu>}
			>
				<Button
					size="small"
					square
					onClick={() => {
						setOpen(p => !p)
					}}
				>
					<TbPlus />
				</Button>
			</Dropdown>
		</FloatingMenu>
	)
}
