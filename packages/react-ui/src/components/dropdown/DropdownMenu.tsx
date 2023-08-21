import './dropdown-menu.scss'

import { ForwardedRef, forwardRef, HTMLAttributes } from 'react'

import { cls } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import { MenuCtx } from './MenuCtx'

interface DropdownMenuProps extends HTMLAttributes<HTMLElement> {
	closeAfterItemClick?: boolean
}

const DropdownMenu = (props: DropdownMenuProps, ref: ForwardedRef<HTMLDivElement>) => {
	const { className, children, closeAfterItemClick = false, ...rest } = props

	const closeDropdown = () => {
		const event = new Event('pointerdown', {
			bubbles: true,
			cancelable: true
		})
		document.documentElement.dispatchEvent(event)
	}

	const prefixCls = `${UI_PREFIX}-dropdown-menu`

	return (
		<MenuCtx.Provider
			value={{
				closeAfterItemClick,
				closeDropdown
			}}
		>
			<div ref={ref} className={cls(className, prefixCls)} role="listbox" {...rest}>
				{children}
			</div>
		</MenuCtx.Provider>
	)
}
DropdownMenu.displayName = 'DropdownMenu'
const RefDropdownMenu = forwardRef(DropdownMenu)
export default RefDropdownMenu
