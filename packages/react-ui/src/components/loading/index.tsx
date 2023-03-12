import { cls } from '@youknown/utils/src'
import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'
import SpinSvg from './SpinSvg'
import './loading.scss'
import { UI_PREFIX } from '../../constants'
import Motion from '../motion'

interface LoadingProps extends HTMLAttributes<HTMLElement> {
	spinning?: boolean
	size?: 'small' | 'medium' | 'large'
	speed?: 'slow' | 'normal' | 'fast'
	icon?: ReactNode
	description?: ReactNode
}

const Loading = forwardRef<HTMLDivElement, LoadingProps>((props, propRef) => {
	const {
		className,
		children,
		spinning = false,
		size = 'medium',
		speed = 'normal',
		icon = <SpinSvg />,
		description,
		...rest
	} = props

	const isWrap = Boolean(children)
	const prefixCls = `${UI_PREFIX}-loading`
	const iconWrapCls = cls(className, `${prefixCls}-icon`, {
		[`${prefixCls}-icon-${size}`]: size,
		[`${prefixCls}-icon-spinning`]: spinning,
		[`${prefixCls}-icon-spinning-${speed}`]: speed
	})

	if (isWrap)
		return (
			<div ref={propRef} className={cls(className, prefixCls, `${prefixCls}-is-wrap`)} {...rest}>
				<div
					className={cls(`${prefixCls}-content`, {
						[`${prefixCls}-content-spinning`]: spinning
					})}
				>
					{children}
				</div>

				<Motion.Fade in={spinning}>
					<div className={`${prefixCls}-layer`}>
						<div className={iconWrapCls}>{icon}</div>
						{description && <span className={`${prefixCls}-description`}>{description}</span>}
					</div>
				</Motion.Fade>
			</div>
		)

	return (
		<Motion.Fade in={spinning}>
			<div ref={propRef} className={iconWrapCls} {...rest}>
				{icon}
			</div>
		</Motion.Fade>
	)
})
Loading.displayName = 'Loading'
export default Loading
