import './index.scss'

import { ComponentProps, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { TbLink } from 'react-icons/tb'

import { Button, Input, Popover, Space } from '@youknown/react-ui/src'
import { cls, omit } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../common'
import CommandBtn from '../command-btn'
import { useControllable } from '@youknown/react-hook/src'

interface LinkPickerProps extends ButtonProps, ComponentProps<typeof Popover> {
	isEdit?: boolean
}
export default function LinkPicker(props: LinkPickerProps) {
	const {
		editor,
		tooltip = true,
		isEdit = false,
		trigger = 'click',
		...rest
	} = omit(props, 'defaultOpen', 'open', 'onOpenChange')

	const [href, setHref] = useState('')
	const [open, onOpenChange] = useControllable(props, {
		defaultValue: false,
		defaultValuePropName: 'defaultOpen',
		valuePropName: 'open',
		trigger: 'onOpenChange'
	})

	const saveLinkHref = () => {
		editor.chain().focus().setLink({ href }).run()
		onOpenChange?.(false)
	}
	const disabled = !editor.can().toggleLink({ href: '' })

	const prefixCls = `${UI_EDITOR_PREFIX}-link-picker`
	const linkPopup = (
		<Space size="small">
			<Input
				className={cls(`${prefixCls}-href-input`)}
				bordered={false}
				autoFocus
				placeholder="输入链接"
				value={href}
				onChange={setHref}
				onEnter={saveLinkHref}
				onClick={event => {
					event.stopPropagation()
				}}
			/>
			<Button primary onClick={saveLinkHref}>
				确认
			</Button>
		</Space>
	)

	return (
		<Popover
			placement="bottom"
			disabled={disabled}
			content={linkPopup}
			trigger={trigger}
			open={open}
			onOpenChange={onOpenChange}
			unmountOnExit
			{...rest}
		>
			<CommandBtn
				className={cls(prefixCls)}
				arrow
				tooltip={isEdit ? '编辑链接' : '链接'}
				tooltipDisabled={!tooltip}
				active={open}
				disabled={disabled}
				onCommand={() => {
					if (trigger === 'manual') {
						onOpenChange?.(!open)
					}
					const selectedLink: string = editor.getAttributes('link').href ?? ''
					setHref(selectedLink)
				}}
			>
				{isEdit ? <BiEditAlt /> : <TbLink />}
			</CommandBtn>
		</Popover>
	)
}
