import './popover.scss'

import { Children, cloneElement, ComponentProps, ForwardedRef, forwardRef, isValidElement, ReactNode } from 'react'

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
		unmountOnExit = true,
		appendTo,
		onClickOutside,
		onOpenChange,
		...rest
	} = props

	const prefixCls = `${UI_PREFIX}-popover`

	const popup = <div className={`${prefixCls}-content`}>{content}</div>
	const triggerEle = Children.map(children, child =>
		isValidElement(child)
			? cloneElement(child, {
					...pick(rest, ...EventsByTriggerNeed),
					...pickDataAttrs(rest)
			  })
			: child
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
			motion="stretch"
			ariaRole="tooltip"
		>
			{triggerEle}
		</Trigger>
	)
}
Popover.displayName = 'Popover'

const RefPopover = forwardRef(Popover)
export default RefPopover
