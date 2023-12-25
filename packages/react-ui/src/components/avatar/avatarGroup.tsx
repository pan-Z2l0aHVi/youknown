import './avatar-group.scss'

import { Children, cloneElement, ComponentProps, FC, HTMLAttributes, isValidElement } from 'react'

import { cls } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import Avatar from './'

interface AvatarGroupProps extends HTMLAttributes<HTMLElement> {
	size?: 'small' | 'medium' | 'large'
	round?: boolean
	overlapFrom?: 'left' | 'right'
}

const AvatarGroup: FC<AvatarGroupProps> = props => {
	const { children, className, size = 'medium', round = true, overlapFrom = 'left', ...rest } = props
	let sign = 0
	if (overlapFrom === 'left') {
		sign = 1
	} else if (overlapFrom === 'right') {
		sign = -1
	}
	const prefixCls = `${UI_PREFIX}-avatar-group`
	return (
		<div className={cls(className, prefixCls, `${prefixCls}-overlap-${overlapFrom}`)} {...rest}>
			{Children.map(children, (child, index) =>
				isValidElement<ComponentProps<typeof Avatar>>(child)
					? cloneElement(child, {
							size,
							round,
							style: {
								zIndex: 99 - sign * index
							}
						})
					: child
			)}
		</div>
	)
}
AvatarGroup.displayName = 'AvatarGroup'
export default AvatarGroup
