import './drawer.scss'

import { CSSProperties, FC, HTMLAttributes } from 'react'
import { createPortal } from 'react-dom'

import { FloatingOverlay } from '@floating-ui/react'
import { cls } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import { useEscape } from '../../hooks/useEscape'
import { useZIndex } from '../../hooks/useZIndex'
import CloseIcon from '../close-icon'
import Motion from '../motion'

interface DrawerProps extends HTMLAttributes<HTMLElement> {
	open?: boolean
	placement?: 'left' | 'top' | 'right' | 'bottom'
	width?: number | string
	height?: number | string
	overlayStyle?: CSSProperties
	overlayClassName?: string
	overlayClosable?: boolean
	escClosable?: boolean
	closable?: boolean
	appendTo?: HTMLElement | null
	unmountOnExit?: boolean
	onCancel?: () => void
}

const Drawer: FC<DrawerProps> = props => {
	const {
		children,
		className,
		open = false,
		placement = 'right',
		width,
		height,
		overlayClassName,
		overlayClosable = true,
		escClosable = true,
		overlayStyle,
		closable = false,
		appendTo = document.body,
		unmountOnExit,
		onCancel,
		style,
		...rest
	} = props

	useEscape(open && escClosable, onCancel)
	const zIndex = useZIndex('popup', open)

	const prefixCls = `${UI_PREFIX}-drawer`

	const directionMap: Record<string, 'left' | 'right' | 'down' | 'up'> = {
		top: 'down',
		bottom: 'up',
		left: 'right',
		right: 'left'
	}
	const direction = directionMap[placement]

	const overlay = (
		<FloatingOverlay
			className={cls(overlayClassName, `${prefixCls}-overlay`)}
			onClick={event => {
				if (event.target === event.currentTarget) {
					if (overlayClosable) onCancel?.()
				}
			}}
			lockScroll={open}
			style={{ zIndex, ...overlayStyle }}
		/>
	)

	const ele = (
		<>
			<Motion.Fade in={open} mountOnEnter unmountOnExit={unmountOnExit}>
				{overlay}
			</Motion.Fade>
			<Motion.Slide in={open} mountOnEnter direction={direction}>
				<div
					className={cls(className, `${prefixCls}-wrap`, `${prefixCls}-wrap-${placement}`)}
					style={{ zIndex, ...style, width, height }}
					{...rest}
				>
					{closable && <CloseIcon className={`${prefixCls}-close-icon`} onClick={() => onCancel?.()} />}
					{children}
				</div>
			</Motion.Slide>
		</>
	)

	return appendTo ? createPortal(ele, appendTo) : ele
}
Drawer.displayName = 'Drawer'
export default Drawer
