import { createContext } from 'react'

export interface PanelItem {
	name: string | number
	tab?: string
}
export interface TabsContext {
	subscribe: (panel: PanelItem) => () => void
	lazyLoad: boolean
	selection: string | number
	container: HTMLElement
}
export const TabsCtx = createContext<Partial<TabsContext>>({})
