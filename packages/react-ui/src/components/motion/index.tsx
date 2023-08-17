import './stretch.scss'
import './slip.scss'

import { FC } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

import { Collapse, Fade, Grow, Slide, Zoom } from '@mui/material'

type StretchProps = Omit<CSSTransitionProps, 'addEventListener'> & {
	direction?: 'top' | 'bottom' | 'left' | 'right'
}

const Stretch: FC<StretchProps> = props => {
	const { children, direction = 'bottom', ...rest } = props

	return (
		<CSSTransition timeout={225} classNames={`stretch-${direction}`} {...rest}>
			{children}
		</CSSTransition>
	)
}
Stretch.displayName = 'Stretch'

type SlipProps = Omit<CSSTransitionProps, 'addEventListener'> & {
	direction?: 'top' | 'bottom' | 'left' | 'right'
}

const Slip: FC<SlipProps> = props => {
	const { children, direction = 'top', ...rest } = props

	return (
		<CSSTransition timeout={225} classNames={`slip-${direction}`} {...rest}>
			{children}
		</CSSTransition>
	)
}
Slip.displayName = 'Slip'

const Motion = {
	Fade,
	Grow,
	Slide,
	Zoom,
	Collapse,
	Stretch,
	Slip
}
export default Motion
