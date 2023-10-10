import './modal.scss'

import { FC, HTMLAttributes } from 'react'
import { createPortal } from 'react-dom'

import { FloatingOverlay } from '@floating-ui/react'
import { cls } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import { useEscape } from '../../hooks/useEscape'
import { useZIndex } from '../../hooks/useZIndex'
import Motion from '../motion'

interface ModalProps extends HTMLAttributes<HTMLElement> {
	open?: boolean
	maskClosable?: boolean
	escClosable?: boolean
	unmountOnExit?: boolean
	alignCenter?: boolean
	onCancel?: () => void
	afterClose?: () => void
}

const Modal: FC<ModalProps> = props => {
	const {
		children,
		className,
		maskClosable = true,
		escClosable = true,
		unmountOnExit,
		alignCenter = true,
		open = false,
		onCancel,
		afterClose,
		onClick,
		style,
		...rest
	} = props

	useEscape(open && escClosable, onCancel)

	const zIndex = useZIndex('modal', open)

	const prefixCls = `${UI_PREFIX}-modal`

	return createPortal(
		<Motion.Fade
			in={open}
			mountOnEnter
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
						if (maskClosable) {
							onCancel?.()
						}
					}
				}}
				style={{
					zIndex,
					overflow: 'overlay',
					...style
				}}
				{...rest}
			>
				{children}
			</FloatingOverlay>
		</Motion.Fade>,
		document.body
	)
}
Modal.displayName = 'Modal'
export default Modal
