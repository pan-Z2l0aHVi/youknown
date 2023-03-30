import { useBoolean } from '@youknown/react-hook/src'
import { Button, Divider, Popover, Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext, useState } from 'react'
import { GoChevronDown } from 'react-icons/go'
import { RiMarkPenLine } from 'react-icons/ri'
import ToolbarContext from '../toolbar-context'
import './index.scss'
import { UI_EDITOR_PREFIX } from '../../../constants'

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
	const [open, { setBool: setOpen }] = useBoolean(false)

	const hasActive = options.some(opt => editor.isActive('highlight', { color: opt }))

	const handleSelect = (opt: string) => {
		setInkColor(opt)
		editor.chain().focus().setHighlight({ color: opt }).run()
	}

	const highlightDisabled = !editor.can().toggleHighlight()
	const prefixCls = `${UI_EDITOR_PREFIX}-highlight-picker`

	return (
		<Tooltip placement="bottom" title="标记">
			<div className={prefixCls}>
				<div
					className={cls(`${prefixCls}-setter`, {
						active: hasActive,
						disabled: highlightDisabled
					})}
					onClick={() => {
						editor.chain().focus().toggleHighlight({ color: inkColor }).run()
					}}
				>
					<RiMarkPenLine />
					<div className={`${prefixCls}-line`} style={{ backgroundColor: inkColor }}></div>
				</div>
				<Popover
					disabled={highlightDisabled}
					trigger="click"
					onOpenChange={setOpen}
					placement="bottom-start"
					crossOffset={-26}
					content={
						<div className={`${prefixCls}-popup`}>
							<Button
								style={{ width: '100%' }}
								onClick={() => editor.chain().focus().unsetHighlight().run()}
							>
								无背景色
							</Button>
							<Divider />
							<div className={`${prefixCls}-colors-wrapper`}>
								{options.map(opt => {
									return (
										<div
											key={opt}
											className={cls(`${prefixCls}-color-item`, {
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
						className={cls(`${prefixCls}-dropdown`, {
							active: open,
							disabled: highlightDisabled
						})}
					>
						<GoChevronDown />
					</div>
				</Popover>
			</div>
		</Tooltip>
	)
}
