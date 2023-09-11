import { Children, cloneElement, ComponentProps, ForwardedRef, forwardRef, ReactNode } from 'react'

import { pick, pickDataAttrs } from '@youknown/utils/src'

import Trigger, { EventsByTriggerNeed } from '../trigger'
import { closeDropdown } from './closeDropdown'
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
			zIndexLevel="popover"
			ariaRole="menu"
		>
			{cloneElement(Children.only(children), {
				...pick(rest, ...EventsByTriggerNeed),
				...pickDataAttrs(rest)
			})}
		</Trigger>
	)
}
Dropdown.displayName = 'Dropdown'

const RefDropdown = forwardRef(Dropdown)
const ExportDropdown = RefDropdown as typeof RefDropdown & {
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
