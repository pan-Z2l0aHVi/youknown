import { Popover, Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { ReactElement, useContext } from 'react'
import { TbAlignCenter, TbAlignJustified, TbAlignLeft, TbAlignRight } from 'react-icons/tb'
import { GoChevronDown } from 'react-icons/go'
import './index.scss'
import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

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
								<div
									className={cls(`${prefixCls}-icon-wrapper`, {
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
					className={cls(prefixCls, {
						disabled: textAlginDisabled
					})}
				>
					<div className={`${prefixCls}-label`}>{selection.icon}</div>
					<div className={`${prefixCls}-dropdown`}>
						<GoChevronDown />
					</div>
				</div>
			</Tooltip>
		</Popover>
	)
}
