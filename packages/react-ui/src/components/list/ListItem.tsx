import './list-item.scss'

import { cls } from '@youknown/utils/src'
import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode, useContext } from 'react'

import { UI_PREFIX } from '../../constants'
import { ListCtx } from './ListCtx'

interface ListItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'prefix'> {
	prefix?: ReactNode
	suffix?: ReactNode
	size?: 'small' | 'medium' | 'large'
	bordered?: boolean
}

const ListItem = (props: ListItemProps, propRef: ForwardedRef<HTMLDivElement>) => {
	const listCtx = useContext(ListCtx)
	const {
		className,
		children,
		prefix,
		suffix,
		size = listCtx.size ?? 'medium',
		bordered = listCtx.bordered ?? true,
		...rest
	} = props

	const prefixCls = `${UI_PREFIX}-list-item`

	return (
		<div
			ref={propRef}
			className={cls(className, prefixCls, `${prefixCls}-${size}`, {
				[`${prefixCls}-bordered`]: bordered
			})}
			{...rest}
		>
			{prefix && <div className={`${prefixCls}-mr`}>{prefix}</div>}
			<div className={`${prefixCls}-content`}>{children}</div>
			{suffix && <div className={`${prefixCls}-ml`}>{suffix}</div>}
		</div>
	)
}
ListItem.displayName = 'ListItem'
export default forwardRef(ListItem)
