import './drawer.scss'

import { CSSProperties, FC, HTMLAttributes } from 'react'
import { createPortal } from 'react-dom'
import { Transition } from 'react-transition-group'

import { FloatingOverlay } from '@floating-ui/react'
import { cls } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import { useEscape } from '../../hooks/useEscape'
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
	escClosable?: boolean
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
		escClosable = true,
		maskStyle,
		closable = false,
		unmountOnExit,
		onCancel,
		style,
		...rest
	} = props

	useEscape(open && escClosable, onCancel)

	const prefixCls = `${UI_PREFIX}-drawer`

	const directionMap: Record<string, 'left' | 'right' | 'down' | 'up'> = {
		top: 'down',
		bottom: 'up',
		left: 'right',
		right: 'left'
	}
	const direction = directionMap[placement]

	return createPortal(
		<Transition in={open} mountOnEnter unmountOnExit={unmountOnExit} timeout={225}>
			{state => (
				<FloatingOverlay
					className={cls(maskClassName, `${prefixCls}-mask`)}
					onClick={event => {
						if (event.target === event.currentTarget) {
							if (maskClosable) onCancel?.()
						}
					}}
					lockScroll={open}
					style={{
						...maskStyle,
						visibility: state === 'exited' && !open ? 'hidden' : undefined
					}}
				>
					<Motion.Slide in={open} direction={direction}>
						<div
							className={cls(className, `${prefixCls}-wrap`, `${prefixCls}-wrap-${placement}`)}
							style={{ ...style, width, height }}
							{...rest}
						>
							{closable && (
								<CloseIcon className={`${prefixCls}-close-icon`} onClick={() => onCancel?.()} />
							)}
							{children}
						</div>
					</Motion.Slide>
				</FloatingOverlay>
			)}
		</Transition>,
		document.body
	)
}
Drawer.displayName = 'Drawer'
export default Drawer
