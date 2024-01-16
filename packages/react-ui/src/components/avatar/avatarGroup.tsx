import './avatar-group.scss'

import { FC, HTMLAttributes } from 'react'

import { cls } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import { AvatarCtx } from './avatarCtx'

interface AvatarGroupProps extends HTMLAttributes<HTMLElement> {
	size?: 'small' | 'medium' | 'large' | number
	round?: boolean
	overlapFrom?: 'left' | 'right'
}

const AvatarGroup: FC<AvatarGroupProps> = props => {
	const { children, className, size, round = true, overlapFrom = 'left', ...rest } = props
	// TODO: 左右层级
	let sign = 0
	if (overlapFrom === 'left') {
		sign = 1
	} else if (overlapFrom === 'right') {
		sign = -1
	}
	const prefixCls = `${UI_PREFIX}-avatar-group`
	return (
		<AvatarCtx.Provider value={{ size, round }}>
			<div className={cls(className, prefixCls, `${prefixCls}-overlap-${overlapFrom}`)} {...rest}>
				{children}
			</div>
		</AvatarCtx.Provider>
	)
}
AvatarGroup.displayName = 'AvatarGroup'
export default AvatarGroup
