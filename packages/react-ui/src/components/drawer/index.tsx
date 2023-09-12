import './drawer.scss'

import { CSSProperties, FC, HTMLAttributes, useRef } from 'react'
import { createPortal } from 'react-dom'

import { FloatingOverlay } from '@floating-ui/react'
import { cls } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import CloseIcon from '../close-icon'
import Motion from '../motion'

interface DrawerProps extends HTMLAttributes<HTMLElement> {
	open?: boolean
	placement?: 'left' | 'top' | 'right' | 'bottom'
	width?: number | string
	height?: number | string
	maskStyle?: CSSProperties
	maskClassName?: string
	maskClosable?: boolean
	closable?: boolean
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
		maskClassName,
		maskClosable = true,
		maskStyle,
		closable = false,
		unmountOnExit = false,
		onCancel,
		style,
		...rest
	} = props

	const prefixCls = `${UI_PREFIX}-drawer`

	const directionMap: Record<string, 'left' | 'right' | 'down' | 'up'> = {
		top: 'down',
		bottom: 'up',
		left: 'right',
		right: 'left'
	}
	const direction = directionMap[placement]
	const preBodyOverflowRef = useRef('')

	const setBodyOverflowHidden = () => {
		preBodyOverflowRef.current = document.body.style.getPropertyValue('overflow')
		document.body.style.setProperty('overflow', 'hidden')
	}

	const resetBodyOverflowHidden = () => {
		document.body.style.setProperty('overflow', preBodyOverflowRef.current)
	}

	return createPortal(
		<Motion.Fade
			in={open}
			mountOnEnter
			unmountOnExit={unmountOnExit}
			onEnter={setBodyOverflowHidden}
			onExited={resetBodyOverflowHidden}
		>
			<FloatingOverlay
				className={cls(maskClassName, `${prefixCls}-mask`)}
				onClick={event => {
					if (event.target === event.currentTarget) {
						if (maskClosable) onCancel?.()
					}
				}}
				lockScroll
				style={maskStyle}
			>
				<Motion.Slide in={open} direction={direction}>
					<div
						className={cls(className, `${prefixCls}-wrap`, `${prefixCls}-wrap-${placement}`)}
						style={{ ...style, width, height }}
						{...rest}
					>
						{closable && <CloseIcon className={`${prefixCls}-close-icon`} onClick={() => onCancel?.()} />}
						{children}
					</div>
				</Motion.Slide>
			</FloatingOverlay>
		</Motion.Fade>,
		document.body
	)
}
Drawer.displayName = 'Drawer'
export default Drawer
