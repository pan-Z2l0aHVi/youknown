import React, { forwardRef, HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import { cls } from '@youknown/utils/src'
import { UI_PREFIX } from '../../constants'
import './tabs.scss'
import TabPanel from './TabPanel'
import { PanelItem, TabsCtx } from './TabsCtx'
import Radio from '../radio'

interface TabsProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
	trigger?: 'click' | 'hover'
	type?: 'line' | 'round' | 'segment'
	size?: 'small' | 'medium' | 'large'
	lazyLoad?: boolean
	value?: PanelItem['name']
	onChange?: (name: PanelItem['name']) => void
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>((props, propRef) => {
	const { children, className, type = 'line', size = 'large', lazyLoad = false, value, onChange, ...rest } = props

	const containerRef = useRef<HTMLDivElement>(null)

	const [selection, setSelection] = useState<PanelItem['name']>()
	const [tabs, setTabs] = useState<PanelItem[]>([])

	const subscribe = useCallback((panel: PanelItem) => {
		setTabs(p => [...p, panel])
		return () => {
			setTabs(p => p.filter(tab => tab.name !== panel.name))
		}
	}, [])

	useEffect(() => {
		if (tabs.length) {
			if (value) {
				setSelection(value)
				onChange?.(value)
			} else {
				const { name } = tabs[0]
				setSelection(name)
				onChange?.(name)
			}
		}
	}, [onChange, value, tabs])

	const isRound = type === 'round'
	const isSegment = type === 'segment'
	const prefixCls = `${UI_PREFIX}-tabs`

	const segmentTabsEle = (
		<Radio.Group type="tab" size={size} value={selection} onChange={setSelection}>
			{tabs.map(tab => (
				<Radio key={tab.name} label={tab.name}>
					{tab.tab}
				</Radio>
			))}
		</Radio.Group>
	)
	const tabsEle = tabs.map(tab => (
		<div
			key={tab.name}
			className={cls(`${prefixCls}-tab`, `${prefixCls}-tab-${type}`, `${prefixCls}-tab-${size}`, {
				[`${prefixCls}-tab-${type}-active`]: selection === tab.name
			})}
			onClick={() => {
				setSelection(tab.name)
				onChange?.(tab.name)
			}}
		>
			{isRound ? <div className={`${prefixCls}-round-wrap`}>{tab.tab}</div> : tab.tab}
		</div>
	))

	const container = containerRef.current ?? undefined

	return (
		<TabsCtx.Provider value={{ subscribe, lazyLoad, selection, container }}>
			<div ref={propRef} className={cls(className, prefixCls)} {...rest}>
				<div className={`${prefixCls}-header`}>{isSegment ? segmentTabsEle : tabsEle}</div>
				<div
					ref={containerRef}
					className={cls(`${prefixCls}-container`, {
						[`${prefixCls}-container-segment-type`]: isSegment
					})}
				>
					{children}
				</div>
			</div>
		</TabsCtx.Provider>
	)
})
Tabs.displayName = 'Tabs'

const ExportTabs = Tabs as typeof Tabs & {
	Panel: typeof TabPanel
}
ExportTabs.Panel = TabPanel

export default ExportTabs
