import './popover.scss'

import { Children, cloneElement, ComponentProps, ForwardedRef, forwardRef, ReactNode } from 'react'

import { pick, pickDataAttrs } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import Trigger, { EventsByTriggerNeed } from '../trigger'

interface PopoverProps
	extends Omit<ComponentProps<typeof Trigger>, 'popup' | 'growTransformOrigin' | 'motion' | 'content'> {
	content?: ReactNode
}

const Popover = (props: PopoverProps, propRef: ForwardedRef<HTMLElement>) => {
	const {
		children,
		content,
		placement = 'bottom-start',
		open,
		defaultOpen,
		trigger,
		mouseEnterDelay,
		mouseLeaveDelay,
		spacing,
		crossOffset,
		disabled,
		unmountOnExit,
		appendTo,
		onClickOutside,
		onOpenChange,
		...rest
	} = props

	const prefixCls = `${UI_PREFIX}-popover`

	const popup = <div className={`${prefixCls}-content`}>{content}</div>

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
			motion="stretch"
			zIndexLevel="popover"
			ariaRole="tooltip"
		>
			{cloneElement(Children.only(children), {
				...pick(rest, ...EventsByTriggerNeed),
				...pickDataAttrs(rest)
			})}
		</Trigger>
	)
}
Popover.displayName = 'Popover'

const RefPopover = forwardRef(Popover)
export default RefPopover
