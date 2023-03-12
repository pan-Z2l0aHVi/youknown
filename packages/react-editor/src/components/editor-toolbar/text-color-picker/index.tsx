import { useBoolean } from '@youknown/react-hook/src'
import { Button, Divider, Popover, Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext, useState } from 'react'
import { BiFont } from 'react-icons/bi'
import { GoChevronDown } from 'react-icons/go'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function TextColorPicker() {
	const { editor } = useContext(ToolbarContext)
	const DEFAULT_COLOR = '#333333'
	const options = [
		'#ffffff',
		'#cccccc',
		'#999999',
		'#666666',
		'#333333',
		'#000000',
		'#ffa8a8',
		'#ffd800',
		'#faf594',
		'#a2ddb8',
		'#40a9ff',
		'#b197fc',
		'#d83931',
		'#de7802',
		'#dc9b04',
		'#21a121',
		'#245bdb',
		'#6425d0'
	]

	const [inkColor, setInkColor] = useState(DEFAULT_COLOR)
	const [open, { setBool: setOpen, setFalse: hide, setReverse: toggle }] = useBoolean(false)

	const hasActive = options.some(opt => editor.isActive('textStyle', { color: opt }))

	const handleSelect = (opt: string) => {
		setInkColor(opt)
		editor.chain().focus().setColor(opt).run()
	}

	const handleReset = () => {
		setInkColor(DEFAULT_COLOR)
		editor.chain().focus().setColor(DEFAULT_COLOR).run()
	}

	const setColorDisabled = !editor.can().setColor(inkColor)

	return (
		<Tooltip placement="bottom" title="文字颜色">
			<div className="g-text-color-picker">
				<div
					className={cls('g-text-color-setter', {
						active: hasActive,
						disabled: setColorDisabled
					})}
					onClick={() => {
						editor.chain().focus().setColor(inkColor).run()
					}}
				>
					<BiFont />
					<div className="g-text-color-line" style={{ backgroundColor: inkColor }}></div>
				</div>
				<Popover
					trigger="manual"
					open={open}
					onOpenChange={setOpen}
					onClickOutside={() => {
						hide()
					}}
					placement="bottom-start"
					crossOffset={-26}
					content={
						<div className="g-text-color-popup">
							<Button style={{ width: '100%' }} onClick={handleReset}>
								恢复默认
							</Button>
							<Divider />
							<div className="g-colors-wrapper">
								{options.map(opt => {
									return (
										<div
											key={opt}
											className={cls('g-color-item', {
												active: editor.isActive('textStyle', { color: opt })
											})}
											onClick={() => handleSelect(opt)}
											style={{ backgroundColor: opt }}
										></div>
									)
								})}
							</div>
						</div>
					}
				>
					<div
						className={cls('g-text-color-dropdown', {
							active: open,
							disabled: setColorDisabled
						})}
						onClick={setColorDisabled ? undefined : toggle}
					>
						<GoChevronDown />
					</div>
				</Popover>
			</div>
		</Tooltip>
	)
}
