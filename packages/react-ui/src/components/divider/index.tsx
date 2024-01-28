import './divider.scss'

import { ForwardedRef, forwardRef, HTMLAttributes } from 'react'

import { cls } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
	size?: 'small' | 'medium' | 'large'
	direction?: 'horizontal' | 'vertical'
}

const Divider = (props: DividerProps, propRef: ForwardedRef<HTMLDivElement>) => {
	const { children, className, size = 'medium', direction = 'horizontal', ...rest } = props
	const prefixCls = `${UI_PREFIX}-divider`
	return (
		<div
			ref={propRef}
			className={cls(className, prefixCls, `${prefixCls}-${direction}`, `${prefixCls}-${direction}-${size}`)}
			{...rest}
		>
			{children}
		</div>
	)
}
Divider.displayName = 'Divider'

export default forwardRef(Divider)
