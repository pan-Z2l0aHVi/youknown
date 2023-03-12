import { cls, is, omit } from '@youknown/utils/src'
import React, { FC, HTMLAttributes, ReactNode } from 'react'
import { TbChevronDown } from 'react-icons/tb'
import './collapse-panel.scss'
import { UI_PREFIX } from '../../constants'
import Motion from '../motion'

interface CollapsePanelProps extends Omit<HTMLAttributes<HTMLElement>, 'title' | 'onChange'> {
	itemKey?: string | number
	title?: ReactNode
	expend?: boolean
	onChange?: (expend: boolean) => void
}

const CollapsePanel: FC<CollapsePanelProps> = props => {
	const { className, children, expend, title, onChange, onClick, ...rest } = omit(props, 'itemKey')

	const prefixCls = `${UI_PREFIX}-collapse-panel`

	const isCustomHeader = !is.string(title)

	return (
		<div
			className={cls(prefixCls, {
				[`${prefixCls}-is-custom-header`]: isCustomHeader
			})}
		>
			{isCustomHeader ? (
				title
			) : (
				<div
					className={cls(className, `${prefixCls}-header`)}
					onClick={event => {
						onClick?.(event)
						onChange?.(!expend)
					}}
					{...rest}
				>
					<div>{title}</div>
					<TbChevronDown
						className={`${prefixCls}-header-icon`}
						style={{ transform: `rotate(${expend ? 0 : -90}deg)` }}
					/>
				</div>
			)}
			<Motion.Collapse in={expend}>{children}</Motion.Collapse>
		</div>
	)
}

export default CollapsePanel
