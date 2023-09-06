import './index.scss'

import { ReactElement, useState } from 'react'
import { TbAlignCenter, TbAlignJustified, TbAlignLeft, TbAlignRight } from 'react-icons/tb'

import { Popover, Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../common'
import CommandBtn from '../command-btn'

export default function TextAlignPicker(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const [open, setOpen] = useState(false)
	interface Option {
		value: string
		label: string
		icon: ReactElement
	}
	const options: Option[] = [
		{
			value: 'left',
			label: '左对齐',
			icon: <TbAlignLeft />
		},
		{
			value: 'center',
			label: '居中对齐',
			icon: <TbAlignCenter />
		},
		{
			value: 'right',
			label: '右对齐',
			icon: <TbAlignRight />
		},
		{
			value: 'justify',
			label: '两端对齐',
			icon: <TbAlignJustified />
		}
	]

	let selection = options[0]
	for (const opt of options) {
		if (editor.isActive({ textAlign: opt.value })) {
			selection = opt
			break
		}
	}

	const handleSelect = (opt: Option) => {
		editor.chain().focus().setTextAlign(opt.value).run()
	}

	const textAlginDisabled = options.some(opt => !editor.can().setTextAlign(opt.value))
	const prefixCls = `${UI_EDITOR_PREFIX}-text-align-picker`

	return (
		<Popover
			disabled={textAlginDisabled}
			trigger="click"
			placement="bottom"
			content={
				<div className={`${prefixCls}-popup`}>
					{options.map(opt => {
						return (
							<Tooltip key={opt.value} placement="bottom" title={opt.label}>
								<button
									className={cls(`${prefixCls}-icon-wrapper`, {
										active: editor.isActive({ textAlign: opt.value }),
										disabled: !editor.can().setTextAlign(opt.value)
									})}
									onClick={() => handleSelect(opt)}
								>
									{opt.icon}
								</button>
							</Tooltip>
						)
					})}
				</div>
			}
			onOpenChange={setOpen}
		>
			<CommandBtn
				className={cls(prefixCls)}
				tooltip="对齐方式"
				tooltipDisabled={!tooltip}
				active={open}
				disabled={textAlginDisabled}
				arrow
			>
				{selection.icon}
			</CommandBtn>
		</Popover>
	)
}
