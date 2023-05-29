import { useBoolean } from '@youknown/react-hook/src'
import { Button, Dropdown, Input, Popover, Space } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext, useState } from 'react'
import { TbLink, TbX } from 'react-icons/tb'
import './index.scss'
import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

export default function LinkPicker() {
	const { editor } = useContext(ToolbarContext)
	const [open, { setBool: setOpen, setFalse: hide, setReverse: toggle }] = useBoolean(false)
	const [href, setHref] = useState('')

	const unsetLink = () => {
		editor.chain().focus().extendMarkRange('link').unsetLink().run()
		setHref('')
		hide()
	}

	const setLink = () => {
		editor.chain().focus().extendMarkRange('link').setLink({ href }).run()
		setHref('')
		hide()
	}

	const isLink = editor.isActive('link')
	const prefixCls = `${UI_EDITOR_PREFIX}-link-picker`

	const contentEle = (
		<div className={`${prefixCls}-popup`}>
			<div className={`${prefixCls}-header`}>
				链接
				<div className={`${prefixCls}-close`}>
					<TbX />
				</div>
			</div>
			<Input placeholder="链接地址" value={href} onChange={val => setHref(val as string)} />
			<Space className={`${prefixCls}-footer`}>
				{isLink && <Button onClick={unsetLink}>移除</Button>}
				<Button primary disabled={!href} onClick={setLink}>
					确定
				</Button>
			</Space>
		</div>
	)

	return (
		<Popover
			trigger="hover"
			open={open}
			onOpenChange={setOpen}
			spacing={-2}
			placement="right-start"
			content={contentEle}
		>
			<Dropdown.Item
				prefix={
					<div
						className={cls(prefixCls, {
							active: isLink
						})}
					>
						<TbLink />
					</div>
				}
				onClick={() => {
					const previousUrl = editor.getAttributes('link').href ?? ''
					setHref(previousUrl)
					toggle()
				}}
			>
				链接
			</Dropdown.Item>
		</Popover>
	)
}
