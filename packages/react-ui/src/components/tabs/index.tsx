import { cls } from '@youknown/utils/src'
import React, { ReactNode, useRef } from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import './tabs.scss'
import { UI_PREFIX } from '../../constants'
import Space from '../space'
import { TbX } from 'react-icons/tb'
import { useNextTickState } from '@youknown/react-hook/src'

interface TabOption {
	key: string
	name: ReactNode
	disabled?: boolean
	closable?: boolean
}

interface TabsProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
	trigger?: 'click' | 'hover'
	type?: 'line' | 'round' | 'segment'
	tabList?: TabOption[]
	onTabListChange?: (tabList: TabOption[]) => void
	value?: TabOption['key']
	onChange?: (value: TabOption['key']) => void
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>((props, propRef) => {
	const { className, type = 'line', tabList = [], onTabListChange, value, onChange, ...rest } = props

	const tabMapRef = useRef<Record<string, HTMLElement | null>>({})
	const [, setSelectedIndex] = useNextTickState(0)

	const changeFocus = (index: number) => {
		const selectedTabEle = tabMapRef.current[Object.keys(tabMapRef.current)[index]]
		selectedTabEle?.focus()
	}

	const prefixCls = `${UI_PREFIX}-tabs`

	const tabListEle = tabList.map(opt => {
		const isActive = opt.key === value

		const removeTab = (focusAfterRemoved = false) => {
			delete tabMapRef.current[opt.key]
			const nextTabList = tabList.filter(tab => tab.key !== opt.key)
			if (nextTabList.length) {
				let index = tabList.findIndex(tab => tab.key === opt.key)
				if (index > nextTabList.length - 1) {
					index = 0
				}
				if (focusAfterRemoved) {
					changeFocus(index)
				}
				if (isActive) {
					onChange?.(nextTabList[index].key)
				}
			}
			onTabListChange?.(nextTabList)
		}
		return (
			<div
				key={opt.key}
				ref={node => {
					if (opt.disabled) return
					tabMapRef.current[opt.key] = node
				}}
				role="tab"
				className={cls(`${prefixCls}-tab-item`, `${prefixCls}-tab-item-${type}`, {
					[`${prefixCls}-tab-item-${type}-active`]: isActive,
					[`${prefixCls}-tab-item-${type}-disabled`]: opt.disabled
				})}
				tabIndex={isActive ? 0 : -1}
				data-tabkey={opt.key}
				aria-selected={isActive}
				aria-disabled={opt.disabled}
				onClick={() => {
					if (opt.disabled) return
					onChange?.(opt.key)
				}}
				onKeyDown={event => {
					switch (event.key) {
						case ' ':
						case 'Enter':
							onChange?.(opt.key)
							break

						case 'Escape':
							if (opt.closable) {
								removeTab(true)
							}
							break

						case 'ArrowRight':
							setSelectedIndex(p => {
								return Math.min(p + 1, tabList.filter(tab => !tab.disabled).length - 1)
							}, changeFocus)
							break

						case 'ArrowLeft':
							setSelectedIndex(p => {
								return Math.max(p - 1, 0)
							}, changeFocus)
							break

						default:
							break
					}
				}}
			>
				{opt.name}
				{opt.closable && (
					<div
						className={`${prefixCls}-tab-item-close-icon`}
						onClick={event => {
							event.stopPropagation()
							removeTab()
						}}
					>
						<TbX />
					</div>
				)}
			</div>
		)
	})

	return (
		<div ref={propRef} className={cls(className, prefixCls)} role="tablist" {...rest}>
			{type === 'line' && <Space size="large">{tabListEle}</Space>}
			{type === 'round' && <Space>{tabListEle}</Space>}
			{type === 'segment' && <div className={`${prefixCls}-segment-list`}>{tabListEle}</div>}
		</div>
	)
})
Tabs.displayName = 'Tabs'
export default Tabs
