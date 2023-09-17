import './modal.scss'

import { FC, HTMLAttributes, useRef } from 'react'
import { createPortal } from 'react-dom'

import { FloatingOverlay } from '@floating-ui/react'
import { cls } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import { useZIndex } from '../../hooks/useZIndex'
import Motion from '../motion'

interface ModalProps extends HTMLAttributes<HTMLElement> {
	open?: boolean
	maskClosable?: boolean
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
		unmountOnExit,
		alignCenter = true,
		open = false,
		onCancel,
		afterClose,
		onClick,
		style,
		...rest
	} = props

	const preBodyOverflowRef = useRef('')

	const setBodyOverflowHidden = () => {
		preBodyOverflowRef.current = document.body.style.getPropertyValue('overflow')
		document.body.style.setProperty('overflow', 'hidden')
	}

	const resetBodyOverflowHidden = () => {
		document.body.style.setProperty('overflow', preBodyOverflowRef.current)
	}

	const zIndex = useZIndex('modal', open)

	const prefixCls = `${UI_PREFIX}-modal`

	return createPortal(
		<Motion.Fade
			in={open}
			mountOnEnter
			unmountOnExit={unmountOnExit}
			onEnter={setBodyOverflowHidden}
			onExited={() => {
				afterClose?.()
				resetBodyOverflowHidden()
			}}
		>
			<FloatingOverlay
				className={cls(className, prefixCls, {
					[`${prefixCls}-align-center`]: alignCenter
				})}
				lockScroll
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
