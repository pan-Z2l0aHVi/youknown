import './collapse-panel.scss'

import { FC, HTMLAttributes, ReactNode } from 'react'
import { TbChevronDown } from 'react-icons/tb'

import { cls, omit } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import Motion from '../motion'

interface CollapsePanelProps extends Omit<HTMLAttributes<HTMLElement>, 'title' | 'onChange'> {
	itemKey?: string | number
	custom?: ReactNode
	title?: ReactNode
	bordered?: boolean
	mountOnEnter?: boolean
	unmountOnExit?: boolean
	expand?: boolean
	onChange?: (expand: boolean) => void
}

const CollapsePanel: FC<CollapsePanelProps> = props => {
	const {
		className,
		children,
		expand,
		title,
		custom,
		bordered = true,
		mountOnEnter = true,
		unmountOnExit = false,
		onChange,
		onClick,
		...rest
	} = omit(props, 'itemKey')

	const prefixCls = `${UI_PREFIX}-collapse-panel`

	return (
		<div
			className={cls(prefixCls, {
				[`${prefixCls}-bordered`]: bordered,
				[`${prefixCls}-default`]: !custom
			})}
		>
			{custom ?? (
				<div
					className={cls(className, `${prefixCls}-header`)}
					onClick={event => {
						onClick?.(event)
						onChange?.(!expand)
					}}
					{...rest}
				>
					<div>{title}</div>
					<TbChevronDown
						className={`${prefixCls}-header-icon`}
						style={{ transform: `rotate(${expand ? 0 : -90}deg)` }}
					/>
				</div>
			)}
			<Motion.Collapse in={expand} mountOnEnter={mountOnEnter} unmountOnExit={unmountOnExit}>
				{children}
			</Motion.Collapse>
		</div>
	)
}

export default CollapsePanel
