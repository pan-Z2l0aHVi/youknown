import { cls } from '@youknown/utils/src'
import React, { Children, cloneElement, ComponentProps, forwardRef, HTMLAttributes, isValidElement } from 'react'
import { UI_PREFIX } from '../../constants'
import './list.scss'
import ListItem from './ListItem'

interface ListProps extends HTMLAttributes<HTMLDivElement> {
	size?: 'small' | 'medium' | 'large'
	bordered?: boolean
}

const List = forwardRef<HTMLDivElement, ListProps>((props, propRef) => {
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
})
List.displayName = 'List'

const ExportList = List as typeof List & {
	Item: typeof ListItem
}
ExportList.Item = ListItem

export default ExportList
