import './index.scss'

import { createElement } from 'react'
import { PiPlusCircleBold } from 'react-icons/pi'

import { useBoolean, useCreation } from '@youknown/react-hook/src'
import { Divider, Dropdown } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../common'
import CommandBtn from '../command-btn'

export type insertListItem =
	| '-' // divider
	| 'blockquote'
	| 'image'
	| 'table'
	| 'bulletList'
	| 'orderedList'
	| 'codeBlock'
	| 'horizontalRule'
interface InsertPickerProps extends ButtonProps {
	list?: insertListItem[]
}
export default function InsertPicker(props: InsertPickerProps) {
	const { editor, tooltip = true, list } = props
	const [open, { setBool: setOpen }] = useBoolean(false)

	const optionList = useCreation(() => {
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

	const extensions = editor.extensionManager.extensions.filter(ext => ext.options.insert)
	const ele = optionList.map((opt, index) => {
		if (opt === '-') {
			return <Divider key={index} size="small" />
		}
		const extension = extensions.find(ext => ext.name === opt)
		if (extension) {
			const { insert, onCustomUpload } = extension.options
			const basicProps = {
				key: extension.name,
				editor,
				extension
			}
			if (extension.name === 'image') {
				return createElement(insert, {
					...basicProps,
					onCustomUpload
				})
			}
			return createElement(insert, basicProps)
		}
		return null
	})

	const prefixCls = `${UI_EDITOR_PREFIX}-insert-picker`
	return (
		<Dropdown
			trigger="click"
			onOpenChange={setOpen}
			content={<Dropdown.Menu className={`${prefixCls}-dropdown`}>{ele}</Dropdown.Menu>}
		>
			<CommandBtn
				className={cls(`${prefixCls}-label`)}
				tooltip="插入"
				tooltipDisabled={!tooltip}
				arrow
				active={open}
			>
				<PiPlusCircleBold className={`${prefixCls}-icon`} />
			</CommandBtn>
		</Dropdown>
	)
}
