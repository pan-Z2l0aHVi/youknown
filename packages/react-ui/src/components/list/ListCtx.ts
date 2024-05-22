import { createContext } from 'react'

export interface ListContext {
  size?: 'small' | 'medium' | 'large'
  bordered?: boolean
  clickable?: boolean
}
export const ListCtx = createContext<Partial<ListContext>>({})
