import { matchPath, useOutlet } from 'react-router-dom'

const KEEP_ALIVE_PATHS: string[] = [
	// '/browse',
	// '/library'
	// '/wallpapers'
]

export const outlet_cache = new Map<string, ReturnType<typeof useOutlet>>()

export const check_keep_alive = (pathname: string) =>
	KEEP_ALIVE_PATHS.some(path => matchPath({ path, end: true }, pathname))
