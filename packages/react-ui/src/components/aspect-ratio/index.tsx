import './aspect-ratio.scss'

import { FC, HTMLAttributes } from 'react'

import { cls } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'

interface AspectRatioProps extends HTMLAttributes<HTMLElement> {
	ratio: number
}

const AspectRatio: FC<AspectRatioProps> = props => {
	const { className, ratio = 1, children, style, ...rest } = props

	const prefixCls = `${UI_PREFIX}-aspect-ratio`

	return (
		<div
			className={cls(className, prefixCls)}
			style={{ ...style, paddingBottom: `calc(${ratio} * 100%)` }}
			{...rest}
		>
			<div className={`${prefixCls}-content`}>{children}</div>
		</div>
	)
}
AspectRatio.displayName = 'AspectRatio'
export default AspectRatio
