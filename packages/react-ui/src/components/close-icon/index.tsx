import './index.scss'

import { ForwardedRef, forwardRef, HTMLAttributes } from 'react'
import { TbX } from 'react-icons/tb'

import { cls } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'

const CloseIcon = (props: HTMLAttributes<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) => {
	const { className, ...rest } = props
	const prefixCls = `${UI_PREFIX}-close-icon`
	return (
		<div ref={ref} className={cls(className, prefixCls)} {...rest}>
			<TbX />
		</div>
	)
}
CloseIcon.displayName = 'CloseIcon'
export default forwardRef(CloseIcon)
