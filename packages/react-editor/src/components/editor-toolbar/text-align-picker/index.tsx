import { Popover, Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { ReactElement, useContext } from 'react'
import { TbAlignCenter, TbAlignJustified, TbAlignLeft, TbAlignRight } from 'react-icons/tb'
import { GoChevronDown } from 'react-icons/go'
import './index.scss'
import { useBoolean } from '@youknown/react-hook/src'
import ToolbarContext from '../toolbar-context'

export default function TextAlignPicker() {
	const { editor } = useContext(ToolbarContext)
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
	const [open, { setReverse: toggle, setFalse: hide, setBool: setOpen }] = useBoolean(false)

	const textAlginDisabled = options.some(opt => !editor.can().setTextAlign(opt.value))

	return (
		<Popover
			trigger="manual"
			open={open}
			onOpenChange={setOpen}
			onClickOutside={hide}
			placement="bottom"
			content={
				<div className="g-text-align-popup">
					{options.map(opt => {
						return (
							<Tooltip key={opt.value} placement="bottom" title={opt.label}>
								<div
									className={cls('g-align-icon-wrapper', {
										active: editor.isActive({ textAlign: opt.value }),
										disabled: !editor.can().setTextAlign(opt.value)
									})}
									onClick={() => handleSelect(opt)}
								>
									{opt.icon}
								</div>
							</Tooltip>
						)
					})}
				</div>
			}
		>
			<Tooltip placement="bottom" title="对齐方式">
				<div
					className={cls('g-text-align-picker', {
						disabled: textAlginDisabled
					})}
					onClick={textAlginDisabled ? undefined : toggle}
				>
					<div className="g-text-align-label">{selection.icon}</div>
					<div className="g-text-align-dropdown">
						<GoChevronDown />
					</div>
				</div>
			</Tooltip>
		</Popover>
	)
}
