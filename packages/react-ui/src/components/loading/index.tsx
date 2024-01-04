import './loading.scss'

import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from 'react'

import { cls } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import Motion from '../motion'
import SpinSvg from './SpinSvg'

interface LoadingProps extends HTMLAttributes<HTMLElement> {
	spinning?: boolean
	bordered?: boolean
	size?: 'small' | 'medium' | 'large'
	icon?: ReactNode
	description?: ReactNode
}

const Loading = (props: LoadingProps, propRef: ForwardedRef<HTMLDivElement>) => {
	const {
		className,
		children,
		spinning = false,
		bordered = false,
		size = 'medium',
		icon,
		description,
		...rest
	} = props

	const isWrap = Boolean(children)
	const prefixCls = `${UI_PREFIX}-loading`
	const iconWrapCls = cls(`${prefixCls}-icon`, {
		[`${prefixCls}-icon-${size}`]: size,
		[`${prefixCls}-icon-bordered`]: bordered,
		[`${prefixCls}-icon-custom`]: icon
	})

	if (isWrap)
		return (
			<div
				ref={propRef}
				className={cls(className, prefixCls, `${prefixCls}-is-wrap`, {
					[`${prefixCls}-spinning`]: spinning
				})}
				{...rest}
			>
				{children}

				<Motion.Fade in={spinning}>
					<div className={`${prefixCls}-layer`}>
						<div className={iconWrapCls}>{icon || <SpinSvg />}</div>
						{description && <span className={`${prefixCls}-description`}>{description}</span>}
					</div>
				</Motion.Fade>
			</div>
		)

	return (
		<Motion.Zoom in={spinning} mountOnEnter unmountOnExit>
			<div ref={propRef} className={cls(className, iconWrapCls)} {...rest}>
				{icon || <SpinSvg />}
			</div>
		</Motion.Zoom>
	)
}
Loading.displayName = 'Loading'
export default forwardRef(Loading)
