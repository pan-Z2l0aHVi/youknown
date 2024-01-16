import { createContext } from 'react'

export interface AvatarContext {
	size: 'small' | 'medium' | 'large' | number
	round: boolean
}
export const AvatarCtx = createContext<Partial<AvatarContext>>({})
