import './index.scss'

import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from 'react'
import { BiSolidChevronDown } from 'react-icons/bi'

import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import { UI_EDITOR_PREFIX } from '../../common'

interface CommandBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	tooltip?: string
	tooltipDisabled?: boolean
	active?: boolean
	disabled?: boolean
	arrow?: boolean
	onCommand?: () => void
}
function CommandBtn(props: CommandBtnProps, ref: ForwardedRef<HTMLButtonElement>) {
	const {
		className,
		children,
		tooltip,
		tooltipDisabled = false,
		active = false,
		disabled = false,
		arrow = false,
		onCommand,
		onClick,
		...rest
	} = props
	const prefixCls = `${UI_EDITOR_PREFIX}-command-btn`
	return (
		<Tooltip ref={ref} placement="bottom" title={tooltip} disabled={tooltipDisabled} appendTo={null}>
			<button
				className={cls(prefixCls, className, {
					active,
					disabled
				})}
				onClick={event => {
					onClick?.(event)
					onCommand?.()
				}}
				{...rest}
			>
				{children}
				{arrow && (
					<div className={`${prefixCls}-arrow`}>
						<BiSolidChevronDown />
					</div>
				)}
			</button>
		</Tooltip>
	)
}
CommandBtn.displayName = 'CommandBtn'
const RefCommandBtn = forwardRef(CommandBtn)
export default RefCommandBtn
