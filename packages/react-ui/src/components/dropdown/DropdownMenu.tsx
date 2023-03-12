import React, { forwardRef, HTMLAttributes } from 'react'
import { cls } from '@youknown/utils/src'
import { UI_PREFIX } from '../../constants'
import './dropdown-menu.scss'
import { MenuCtx } from './MenuCtx'

interface DropdownMenuProps extends HTMLAttributes<HTMLElement> {
	closeAfterItemClick?: boolean
}

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>((props, ref) => {
	const { className, children, closeAfterItemClick = false, ...rest } = props

	const closeDropdown = () => {
		document.documentElement.click()
	}

	const prefixCls = `${UI_PREFIX}-dropdown-menu`

	return (
		<MenuCtx.Provider
			value={{
				closeAfterItemClick,
				closeDropdown
			}}
		>
			<div ref={ref} className={cls(className, prefixCls)} {...rest}>
				{children}
			</div>
		</MenuCtx.Provider>
	)
})

export default DropdownMenu
