import React, { forwardRef, HTMLAttributes, useContext, useEffect } from 'react'
import { cls } from '@youknown/utils/src'
import { UI_PREFIX } from '../../constants'
import './tab-panel.scss'
import { TabsCtx } from './TabsCtx'

interface TabPanelProps extends HTMLAttributes<HTMLElement> {
	name: string | number
	tab?: string
}

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>((props, propRef) => {
	const { children, className, name, tab, ...rest } = props

	const { subscribe, lazyLoad = false, selection } = useContext(TabsCtx)
	const isActive = selection === name

	useEffect(() => {
		const unsubscribe = subscribe?.({ name, tab })
		return () => {
			unsubscribe?.()
		}
	}, [name, subscribe, tab])

	const prefixCls = `${UI_PREFIX}-tab-panel`

	if (lazyLoad && !isActive) {
		return null
	}

	return (
		<div
			ref={propRef}
			className={cls(className, prefixCls, {
				[`${prefixCls}-active`]: isActive
			})}
			{...rest}
		>
			{children}
		</div>
	)
})
TabPanel.displayName = 'TabPanel'
export default TabPanel
