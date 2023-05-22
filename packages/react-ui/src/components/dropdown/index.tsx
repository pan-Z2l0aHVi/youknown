import React, { Children, cloneElement, ComponentProps, forwardRef, ReactNode } from 'react'
import DropdownMenu from './DropdownMenu'
import DropdownItem from './DropdownItem'
import DropdownTitle from './DropdownTitle'
import Trigger, { EventsByTriggerNeed } from '../trigger'
import { pick, pickDataAttrs } from '@youknown/utils/src'
import { closeDropdown } from './closeDropdown'

interface DropdownProps
	extends Omit<ComponentProps<typeof Trigger>, 'popup' | 'growTransformOrigin' | 'content' | 'motion'> {
	content?: ReactNode
}

const Dropdown = forwardRef<HTMLElement, DropdownProps>((props, propRef) => {
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
		appendTo,
		unmountOnExit,
		onClickOutside,
		onOpenChange,
		...rest
	} = props

	return (
		<Trigger
			ref={propRef}
			popup={content}
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
			ariaRole="menu"
		>
			{cloneElement(Children.only(children), {
				...pick(rest, ...EventsByTriggerNeed),
				...pickDataAttrs(rest)
			})}
		</Trigger>
	)
})
Dropdown.displayName = 'Dropdown'

const ExportDropdown = Dropdown as typeof Dropdown & {
	Menu: typeof DropdownMenu
	Item: typeof DropdownItem
	Title: typeof DropdownTitle
	close: typeof closeDropdown
}
ExportDropdown.Menu = DropdownMenu
ExportDropdown.Item = DropdownItem
ExportDropdown.Title = DropdownTitle
ExportDropdown.close = closeDropdown

export default ExportDropdown
