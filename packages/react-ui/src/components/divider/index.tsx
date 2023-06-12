import { cls } from '@youknown/utils/src'
import { forwardRef, HTMLAttributes } from 'react'
import { UI_PREFIX } from '../../constants'
import './divider.scss'

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
	size?: 'small' | 'medium' | 'large'
	direction?: 'horizontal' | 'vertical'
}

const Divider = forwardRef<HTMLDivElement, DividerProps>((props, propRef) => {
	const { children, className, size = 'medium', direction = 'horizontal' } = props
	const prefixCls = `${UI_PREFIX}-divider`
	return (
		<div
			ref={propRef}
			className={cls(className, prefixCls, `${prefixCls}-${direction}`, `${prefixCls}-${direction}-${size}`)}
		>
			{children}
		</div>
	)
})
Divider.displayName = 'Divider'
export default Divider
