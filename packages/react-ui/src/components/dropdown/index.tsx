import { Children, cloneElement, ComponentProps, ForwardedRef, forwardRef, isValidElement, ReactNode } from 'react'

import { pick, pickDataAttrs } from '@youknown/utils/src'

import Trigger, { EventsByTriggerNeed } from '../trigger'
import { clickOutside } from './clickOutside'
import DropdownItem from './DropdownItem'
import DropdownMenu from './DropdownMenu'
import DropdownTitle from './DropdownTitle'

interface DropdownProps
	extends Omit<ComponentProps<typeof Trigger>, 'popup' | 'growTransformOrigin' | 'content' | 'motion'> {
	content?: ReactNode
}

const Dropdown = (props: DropdownProps, propRef: ForwardedRef<HTMLElement>) => {
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
		unmountOnExit = true,
		onClickOutside,
		onOpenChange,
		...rest
	} = props

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
			{triggerEle}
		</Trigger>
	)
}
Dropdown.displayName = 'Dropdown'

const RefDropdown = forwardRef(Dropdown)
const ExportDropdown = RefDropdown as typeof RefDropdown & {
	Menu: typeof DropdownMenu
	Item: typeof DropdownItem
	Title: typeof DropdownTitle
	close: typeof clickOutside
}
ExportDropdown.Menu = DropdownMenu
ExportDropdown.Item = DropdownItem
ExportDropdown.Title = DropdownTitle
ExportDropdown.close = clickOutside

export default ExportDropdown
