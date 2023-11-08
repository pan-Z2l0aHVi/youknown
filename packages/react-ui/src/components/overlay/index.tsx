import './overlay.scss'

import { FC, HTMLAttributes } from 'react'
import { createPortal } from 'react-dom'

import { FloatingOverlay } from '@floating-ui/react'
import { cls } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import { useEscape } from '../../hooks/useEscape'
import { useZIndex } from '../../hooks/useZIndex'
import Motion from '../motion'

interface OverlayProps extends HTMLAttributes<HTMLElement> {
	open?: boolean
	overlayClosable?: boolean
	escClosable?: boolean
	unmountOnExit?: boolean
	alignCenter?: boolean
	appendTo?: HTMLElement | null
	onCancel?: () => void
	afterClose?: () => void
}

const Overlay: FC<OverlayProps> = props => {
	const {
		children,
		className,
		overlayClosable = true,
		escClosable = true,
		unmountOnExit,
		alignCenter = true,
		appendTo = document.body,
		open = false,
		onCancel,
		afterClose,
		onClick,
		style,
		...rest
	} = props

	useEscape(open && escClosable, onCancel)

	const zIndex = useZIndex('popup', open)

	const prefixCls = `${UI_PREFIX}-modal`
	const ele = (
		<Motion.Fade
			in={open}
			unmountOnExit={unmountOnExit}
			onExited={() => {
				afterClose?.()
			}}
		>
			<FloatingOverlay
				className={cls(className, prefixCls, {
					[`${prefixCls}-align-center`]: alignCenter
				})}
				lockScroll={open}
				onClick={event => {
					if (event.target === event.currentTarget) {
						onClick?.(event)
						if (overlayClosable) {
							onCancel?.()
						}
					}
				}}
				style={{
					zIndex,
					...style
				}}
				{...rest}
			>
				{children}
			</FloatingOverlay>
		</Motion.Fade>
	)

	return appendTo ? createPortal(ele, appendTo) : ele
}
Overlay.displayName = 'Overlay'
export default Overlay
