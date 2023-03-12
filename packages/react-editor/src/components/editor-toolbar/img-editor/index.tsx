import { useBoolean } from '@youknown/react-hook/src'
import { Button, Input, Popover, Space, Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext, useState } from 'react'
import { TbEdit, TbX } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function ImgEditor() {
	const { editor } = useContext(ToolbarContext)
	const [open, { setBool: setOpen, setFalse: hide, setReverse: toggle }] = useBoolean(false)
	const [src, setSrc] = useState('')

	const contentEle = (
		<div className="g-img-popup">
			<div className="g-img-header">
				编辑图片
				<div className="g-img-close">
					<TbX onClick={hide} />
				</div>
			</div>
			<Input.Textarea
				style={{ width: 100 }}
				autosize
				minRows={3}
				placeholder="图片地址"
				value={src}
				onChange={val => setSrc(val as string)}
			/>
			<Space className="g-img-footer">
				<Button
					primary
					disabled={!src}
					onClick={() => {
						editor.commands.updateAttributes('image', { src })
					}}
				>
					确定
				</Button>
			</Space>
		</div>
	)

	return (
		<Popover
			trigger="manual"
			open={open}
			onOpenChange={setOpen}
			onClickOutside={() => {
				hide()
			}}
			placement="bottom"
			content={contentEle}
		>
			<Tooltip placement="bottom" title="编辑图片">
				<div
					className={cls('g-img-editor')}
					onClick={() => {
						const previousUrl = editor.getAttributes('image').src ?? ''
						setSrc(previousUrl)
						toggle()
					}}
				>
					<TbEdit />
				</div>
			</Tooltip>
		</Popover>
	)
}
