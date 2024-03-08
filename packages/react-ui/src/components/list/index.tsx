import './list.scss'

import { cls } from '@youknown/utils/src'
import { Children, cloneElement, ComponentProps, ForwardedRef, forwardRef, HTMLAttributes, isValidElement } from 'react'

import { UI_PREFIX } from '../../constants'
import ListItem from './ListItem'

interface ListProps extends HTMLAttributes<HTMLDivElement> {
	size?: 'small' | 'medium' | 'large'
	bordered?: boolean
}

const List = (props: ListProps, propRef: ForwardedRef<HTMLDivElement>) => {
	const { className, children, size = 'medium', bordered = true, ...rest } = props

	const prefixCls = `${UI_PREFIX}-list`

	return (
		<div
			ref={propRef}
			className={cls(className, prefixCls, {
				[`${prefixCls}-bordered`]: bordered
			})}
			{...rest}
		>
			{Children.map(children, child => {
				if (!isValidElement<ComponentProps<typeof ListItem>>(child)) return child

				return cloneElement(child, { size, bordered })
			})}
		</div>
	)
}
List.displayName = 'List'

const RefList = forwardRef(List)
const ExportList = RefList as typeof RefList & {
	Item: typeof ListItem
}
ExportList.Item = ListItem

export default ExportList
