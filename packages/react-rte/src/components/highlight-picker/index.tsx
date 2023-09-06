import './index.scss'

import { useState } from 'react'
import { BiSolidChevronDown } from 'react-icons/bi'
import { LuHighlighter } from 'react-icons/lu'

import { useBoolean } from '@youknown/react-hook/src'
import { Button, Divider, Popover, Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../common'
import CommandBtn from '../command-btn'

export default function HighlightPicker(props: ButtonProps) {
	const { editor, tooltip = true } = props
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

	const select = (opt: string) => {
		setInkColor(opt)
		editor.chain().focus().setHighlight({ color: opt }).run()
	}

	const highlightDisabled = !editor.can().toggleHighlight()
	const prefixCls = `${UI_EDITOR_PREFIX}-highlight-picker`

	const popContentEle = (
		<div className={`${prefixCls}-popup`}>
			<Button style={{ width: '100%' }} onClick={() => editor.chain().focus().unsetHighlight().run()}>
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
							onClick={() => select(opt)}
							style={{ backgroundColor: opt }}
						></div>
					)
				})}
			</div>
		</div>
	)

	return (
		<Tooltip disabled={!tooltip} placement="bottom" title="标记">
			<div className={prefixCls}>
				<CommandBtn
					className={cls(`${prefixCls}-setter`)}
					tooltipDisabled
					active={hasActive}
					disabled={highlightDisabled}
					onCommand={() => {
						editor.chain().focus().toggleHighlight({ color: inkColor }).run()
					}}
				>
					<LuHighlighter size={15} />
					<div className={`${prefixCls}-line`} style={{ backgroundColor: inkColor }}></div>
				</CommandBtn>

				<Popover
					disabled={highlightDisabled}
					trigger="click"
					onOpenChange={setOpen}
					placement="bottom-start"
					crossOffset={-26}
					content={popContentEle}
				>
					<button
						className={cls(`${prefixCls}-arrow-btn`, {
							active: open,
							disabled: highlightDisabled
						})}
					>
						<BiSolidChevronDown />
					</button>
				</Popover>
			</div>
		</Tooltip>
	)
}
