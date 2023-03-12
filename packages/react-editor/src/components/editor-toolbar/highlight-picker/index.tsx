import { useBoolean } from '@youknown/react-hook/src'
import { Button, Divider, Popover, Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext, useState } from 'react'
import { GoChevronDown } from 'react-icons/go'
import { RiMarkPenLine } from 'react-icons/ri'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function HighlightPicker() {
	const { editor } = useContext(ToolbarContext)
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

	const [inkColor, setInkColor] = useState('#faf594')
	const [open, { setBool: setOpen, setFalse: hide, setReverse: toggle }] = useBoolean(false)

	const hasActive = options.some(opt => editor.isActive('highlight', { color: opt }))

	const handleSelect = (opt: string) => {
		setInkColor(opt)
		editor.chain().focus().setHighlight({ color: opt }).run()
	}

	const highlightDisabled = !editor.can().toggleHighlight()

	return (
		<Tooltip placement="bottom" title="标记">
			<div className="g-highlight-picker">
				<div
					className={cls('g-highlight-setter', {
						active: hasActive,
						disabled: highlightDisabled
					})}
					onClick={() => {
						editor.chain().focus().toggleHighlight({ color: inkColor }).run()
					}}
				>
					<RiMarkPenLine />
					<div className="g-highlight-line" style={{ backgroundColor: inkColor }}></div>
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
						<div className="g-highlight-popup">
							<Button
								style={{ width: '100%' }}
								onClick={() => editor.chain().focus().unsetHighlight().run()}
							>
								无背景色
							</Button>
							<Divider />
							<div className="g-colors-wrapper">
								{options.map(opt => {
									return (
										<div
											key={opt}
											className={cls('g-color-item', {
												active: editor.isActive('highlight', { color: opt })
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
						className={cls('g-highlight-dropdown', {
							active: open,
							disabled: highlightDisabled
						})}
						onClick={highlightDisabled ? undefined : toggle}
					>
						<GoChevronDown />
					</div>
				</Popover>
			</div>
		</Tooltip>
	)
}
