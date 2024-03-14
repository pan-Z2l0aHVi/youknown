import './list.scss'

import { cls } from '@youknown/utils/src'
import { ForwardedRef, forwardRef, HTMLAttributes } from 'react'

import { UI_PREFIX } from '../../constants'
import { ListCtx } from './ListCtx'
import ListItem from './ListItem'

interface ListProps extends HTMLAttributes<HTMLDivElement> {
	size?: 'small' | 'medium' | 'large'
	bordered?: boolean
}

const List = (props: ListProps, propRef: ForwardedRef<HTMLDivElement>) => {
	const { className, children, size = 'medium', bordered = true, ...rest } = props

	const prefixCls = `${UI_PREFIX}-list`

	return (
		<ListCtx.Provider value={{ size, bordered }}>
			<div
				ref={propRef}
				className={cls(className, prefixCls, {
					[`${prefixCls}-bordered`]: bordered
				})}
				{...rest}
			>
				{children}
			</div>
		</ListCtx.Provider>
	)
}
List.displayName = 'List'

const RefList = forwardRef(List)
const ExportList = RefList as typeof RefList & {
	Item: typeof ListItem
}
ExportList.Item = ListItem

export default ExportList
