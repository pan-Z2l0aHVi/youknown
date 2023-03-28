import { useBoolean } from '@youknown/react-hook/src'
import { Button, Dropdown, Input, Popover, Space } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext, useState } from 'react'
import { TbLink, TbX } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

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

	const contentEle = (
		<div className="g-link-popup">
			<div className="g-link-header">
				链接
				<div className="g-link-close">
					<TbX />
				</div>
			</div>
			<Input placeholder="链接地址" value={href} onChange={val => setHref(val as string)} />
			<Space className="g-link-footer">
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
						className={cls('g-link-picker', {
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
