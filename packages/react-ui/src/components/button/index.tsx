import './button.scss'

import { cls } from '@youknown/utils/src'
import { ButtonHTMLAttributes, ForwardedRef, forwardRef, ReactNode } from 'react'

import { UI_PREFIX } from '../../constants'
import Loading from '../loading'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: 'small' | 'medium' | 'large'
	primary?: boolean
	danger?: boolean
	text?: boolean
	round?: boolean
	circle?: boolean
	square?: boolean
	loading?: boolean
	disabled?: boolean
	prefixIcon?: ReactNode
	suffixIcon?: ReactNode
}

const Button = (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
	const {
		children,
		className,
		type = 'button',
		size = 'medium',
		primary = false,
		danger = false,
		text = false,
		round = false,
		circle = false,
		square = false,
		loading = false,
		disabled = false,
		prefixIcon = null,
		suffixIcon = null,
		...rest
	} = props

	const prefixCls = `${UI_PREFIX}-button`
	const loadingEle = <Loading spinning style={{ color: 'inherit', fontSize: 'inherit' }} />

	const renderContentEle = () => {
		if (loading) {
			if (circle || square) {
				return loadingEle
			}
			return (
				<>
					{loadingEle}
					{children && (
						<span
							className={cls(`${prefixCls}-inner-ml`, {
								[`${prefixCls}-inner-mr`]: suffixIcon
							})}
						>
							{children}
						</span>
					)}
					{suffixIcon}
				</>
			)
		}
		if (prefixIcon || suffixIcon) {
			return (
				<>
					{prefixIcon}
					{children && (
						<span
							className={cls({
								[`${prefixCls}-inner-ml`]: prefixIcon,
								[`${prefixCls}-inner-mr`]: suffixIcon
							})}
						>
							{children}
						</span>
					)}
					{suffixIcon}
				</>
			)
		}
		return children
	}

	return (
		<button
			className={cls(className, prefixCls, `${prefixCls}-${size}`, {
				[`${prefixCls}-primary`]: primary,
				[`${prefixCls}-danger`]: danger,
				[`${prefixCls}-text`]: text,
				[`${prefixCls}-round`]: round,
				[`${prefixCls}-circle`]: circle,
				[`${prefixCls}-square`]: square,
				[`${prefixCls}-disabled`]: disabled || loading
			})}
			ref={ref}
			type={type}
			disabled={disabled || loading}
			aria-disabled={disabled || loading}
			{...rest}
		>
			{renderContentEle()}
		</button>
	)
}
Button.displayName = 'Button'
export default forwardRef(Button)
