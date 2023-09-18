import { cloneElement, ForwardedRef, forwardRef, HTMLAttributes, isValidElement, ReactNode, useRef } from 'react'
import { Transition } from 'react-transition-group'
import { TransitionProps } from 'react-transition-group/Transition'

import { Collapse, Fade, Grow, Slide, Zoom } from '@mui/material'
import { useComposeRef } from '@youknown/react-hook/src'

interface StretchProps
	extends Pick<
			TransitionProps,
			| 'in'
			| 'mountOnEnter'
			| 'unmountOnExit'
			| 'onEnter'
			| 'onEntering'
			| 'onEntered'
			| 'onExit'
			| 'onExiting'
			| 'onExited'
			| 'nodeRef'
		>,
		HTMLAttributes<HTMLElement> {
	children?: ReactNode
	direction?: 'top' | 'bottom' | 'left' | 'right'
}

const Stretch = (props: StretchProps, ref: ForwardedRef<HTMLElement>) => {
	const { children, direction = 'bottom', in: inProp, style, ...rest } = props

	const getTransformStyle = () => {
		switch (direction) {
			case 'top':
			case 'bottom':
				return 'scaleY(0.8)'
			case 'left':
			case 'right':
				return 'scaleX(0.8)'
		}
	}

	const getTransformOrigin = () => {
		switch (direction) {
			case 'top':
				return 'bottom'
			case 'bottom':
				return 'top'
			case 'left':
				return 'right'
			case 'right':
				return 'left'
			default:
				return 'center'
		}
	}
	const nodeRef = useRef(null)
	const handleRef = useComposeRef(ref, nodeRef, (children as any).ref)

	return (
		<Transition nodeRef={nodeRef} in={inProp} timeout={225} {...rest}>
			{(state, childProps) =>
				isValidElement<any>(children)
					? cloneElement(children, {
							style: {
								visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
								opacity: state === 'entering' || state === 'entered' ? 1 : 0,
								transformOrigin: getTransformOrigin(),
								transform:
									state === 'entering' || state === 'entered' ? 'scale(1)' : getTransformStyle(),
								transition:
									'opacity 0.225s cubic-bezier(0.4, 0, 0.2, 1), transform 0.225s cubic-bezier(0.4, 0, 0.2, 1)',
								...style,
								...children.props.style
							},
							ref: handleRef,
							...childProps
					  })
					: children
			}
		</Transition>
	)
}
Stretch.displayName = 'Stretch'

const Motion = {
	Fade,
	Grow,
	Slide,
	Zoom,
	Collapse,
	Stretch: forwardRef(Stretch)
}
export default Motion
