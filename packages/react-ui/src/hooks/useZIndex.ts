import { useEffect, useState } from 'react'

// Zero Level (1级)：默认层级，用于大多数组件。通常不需要特别设置 z-index 值的组件都属于这一级别。
// Tooltip Level (2级)：用于工具提示（Tooltip）组件，通常位于所有弹出层之上。
// Popover Level (3级)：用于气泡框（Popover）组件，位于 Tooltip Level 之上。
// Modal Level (4级)：用于模态框（Modal）组件，通常位于所有其他层级之上。
// Message Level (5级)：用于通知（Message）组件，通常位于所有其他层级之上。
export class ZIndexManager {
	public zero: number
	public tooltip: number
	public popover: number
	public modal: number
	public message: number
	constructor() {
		this.zero = 0
		this.tooltip = 2000
		this.popover = 3000
		this.modal = 5000
		this.message = 9000
	}
}

export type ZIndexLevel = keyof ZIndexManager

const zIndexInst = new ZIndexManager()

export function useZIndex(level: ZIndexLevel, open = false) {
	const [zIndex, setZIndex] = useState(zIndexInst[level])
	useEffect(() => {
		if (open) {
			setZIndex(++zIndexInst[level])
		}
	}, [level, open])
	return zIndex
}
