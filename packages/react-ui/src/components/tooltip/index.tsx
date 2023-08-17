import './tooltip.scss'

import { Children, cloneElement, ComponentProps, forwardRef } from 'react'

import { cls, pick, pickDataAttrs } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import Trigger, { EventsByTriggerNeed } from '../trigger'

interface TooltipProps extends Omit<ComponentProps<typeof Trigger>, 'popup' | 'growTransformOrigin' | 'motion'> {
	title?: string
	light?: boolean
}

const Tooltip = forwardRef<HTMLElement, TooltipProps>((props, propRef) => {
	const {
		children,
		title = '',
		light = false,
		placement = 'top',
		open,
		defaultOpen,
		trigger,
		mouseEnterDelay,
		mouseLeaveDelay,
		spacing,
		crossOffset,
		disabled,
		unmountOnExit = true,
		appendTo,
		onClickOutside,
		onOpenChange,
		...rest
	} = props

	const originMap = {
		'top-start': 'bottom left',
		top: 'bottom',
		'top-end': 'bottom right',
		'bottom-start': 'top left',
		bottom: 'top',
		'bottom-end': 'top right',
		'left-start': 'top right',
		left: 'right',
		'left-end': 'bottom right',
		'right-start': 'top left',
		right: 'left',
		'right-end': 'bottom left'
	}
	const growTransformOrigin = originMap[placement]
	const prefixCls = `${UI_PREFIX}-tooltip`

	const popup = (
		<div className={cls(`${prefixCls}-content`, `${prefixCls}-content-${light ? 'light' : 'dark'}`)}>{title}</div>
	)

	return (
		<Trigger
			ref={propRef}
			popup={popup}
			placement={placement}
			open={open}
			defaultOpen={defaultOpen}
			trigger={trigger}
			disabled={disabled}
			mouseEnterDelay={mouseEnterDelay}
			mouseLeaveDelay={mouseLeaveDelay}
			spacing={spacing}
			unmountOnExit={unmountOnExit}
			crossOffset={crossOffset}
			appendTo={appendTo}
			onClickOutside={onClickOutside}
			onOpenChange={onOpenChange}
			motion="grow"
			growTransformOrigin={growTransformOrigin}
			ariaRole="tooltip"
		>
			{cloneElement(Children.only(children), {
				...pick(rest, ...EventsByTriggerNeed),
				...pickDataAttrs(rest)
			})}
		</Trigger>
	)
})
Tooltip.displayName = 'Tooltip'
export default Tooltip
