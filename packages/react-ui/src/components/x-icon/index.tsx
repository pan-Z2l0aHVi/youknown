import './index.scss'

import { forwardRef, HTMLAttributes } from 'react'
import { TbX } from 'react-icons/tb'

import { cls } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'

const XIcon = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
	const { className, ...rest } = props
	const prefixCls = `${UI_PREFIX}-x-icon`
	return (
		<div ref={ref} className={cls(className, prefixCls)} {...rest}>
			<TbX />
		</div>
	)
})

export default XIcon
