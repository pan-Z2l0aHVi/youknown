import './index.scss'

import { Dispatch, SetStateAction, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { TbLink } from 'react-icons/tb'

import { Button, Input, Popover, Space } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../common'
import CommandBtn from '../command-btn'

interface LinkPickerProps extends ButtonProps {
	linkPopOpen: boolean
	setLinkPopOpen: Dispatch<SetStateAction<boolean>>
	isEdit?: boolean
}
export default function LinkPicker(props: LinkPickerProps) {
	const { editor, tooltip = true, linkPopOpen, setLinkPopOpen, isEdit = false } = props

	const [href, setHref] = useState('')

	const saveLinkHref = () => {
		editor.chain().setLink({ href }).focus().run()
		setLinkPopOpen(false)
	}
	const disabled = !editor.can().toggleLink({ href: '' })

	const prefixCls = `${UI_EDITOR_PREFIX}-link-picker`
	const linkPopup = (
		<Space
			size="small"
			onClick={e => {
				e.stopPropagation()
			}}
		>
			<Input
				className={cls(`${prefixCls}-href-input`)}
				autoFocus
				bordered={false}
				placeholder="输入链接"
				value={href}
				onChange={setHref}
				onEnter={saveLinkHref}
			/>
			<Button primary onClick={saveLinkHref}>
				确认
			</Button>
		</Space>
	)

	return (
		<Popover
			trigger="click"
			placement="bottom"
			spacing={12}
			disabled={disabled}
			content={linkPopup}
			open={linkPopOpen}
			onOpenChange={setLinkPopOpen}
		>
			<CommandBtn
				className={cls(prefixCls)}
				arrow
				tooltip={isEdit ? '编辑链接' : '链接'}
				tooltipDisabled={!tooltip}
				active={linkPopOpen}
				disabled={disabled}
				onCommand={() => {
					const selectedLink: string = editor.getAttributes('link').href ?? ''
					setHref(selectedLink)
				}}
				onClick={e => {
					e.stopPropagation()
				}}
			>
				{isEdit ? <BiEditAlt /> : <TbLink />}
			</CommandBtn>
		</Popover>
	)
}
