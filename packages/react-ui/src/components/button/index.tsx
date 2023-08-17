import './button.scss'

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

import { cls } from '@youknown/utils/src'

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
	icon?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
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
		icon = null,
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
					{children && <span className={`${prefixCls}-inner-ml`}>{children}</span>}
				</>
			)
		}

		if (icon) {
			return (
				<>
					{icon}
					{children && <span className={`${prefixCls}-inner-ml`}>{children}</span>}
				</>
			)
		}
		return circle || square ? children : <span>{children}</span>
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
})
Button.displayName = 'Button'
export default Button
