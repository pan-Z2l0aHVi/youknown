import { cls } from '@youknown/utils/src'
import React, { forwardRef, HTMLAttributes } from 'react'
import { TbX } from 'react-icons/tb'
import { UI_PREFIX } from '../../constants'
import './index.scss'

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
