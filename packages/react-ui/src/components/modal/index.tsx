import Motion from '../motion'
import { cls } from '@youknown/utils/src'
import React, { FC, HTMLAttributes, useRef } from 'react'
import { createPortal } from 'react-dom'
import { UI_PREFIX } from '../../constants'
import './modal.scss'
import { FloatingOverlay } from '@floating-ui/react'
import { useZIndex } from '../../hooks/useZIndex'

interface ModalProps extends HTMLAttributes<HTMLElement> {
	open?: boolean
	maskClosable?: boolean
	unmountOnExit?: boolean
	alignCenter?: boolean
	onCancel?: () => void
}

const Modal: FC<ModalProps> = props => {
	const {
		children,
		className,
		maskClosable = true,
		unmountOnExit = false,
		alignCenter = true,
		open = false,
		onCancel,
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

	const zIndex = useZIndex(open)

	const prefixCls = `${UI_PREFIX}-modal`

	return createPortal(
		<Motion.Fade
			in={open}
			mountOnEnter
			unmountOnExit={unmountOnExit}
			onEnter={setBodyOverflowHidden}
			onExited={resetBodyOverflowHidden}
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
