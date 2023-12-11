import { MouseEvent, useCallback, useState } from 'react'

export function useContextMenu() {
	const [open, setOpen] = useState(false)
	const [x, setX] = useState(0)
	const [y, setY] = useState(0)
	const closeContextMenu = useCallback(() => {
		setOpen(false)
	}, [])
	const onContextMenu = useCallback((event: MouseEvent) => {
		event.preventDefault()
		setX(event.clientX)
		setY(event.clientY)
		setOpen(true)
	}, [])
	const contextMenuProps = { x, y, open, onOpenChange: setOpen }
	return { onContextMenu, contextMenuProps, closeContextMenu }
}
