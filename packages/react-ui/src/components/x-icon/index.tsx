import './index.scss'

import { ForwardedRef, forwardRef, HTMLAttributes } from 'react'
import { TbX } from 'react-icons/tb'

import { cls } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'

const XIcon = (props: HTMLAttributes<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) => {
	const { className, ...rest } = props
	const prefixCls = `${UI_PREFIX}-x-icon`
	return (
		<div ref={ref} className={cls(className, prefixCls)} {...rest}>
			<TbX />
		</div>
	)
}
XIcon.displayName = 'XIcon'
const RefXIcon = forwardRef(XIcon)
export default RefXIcon
