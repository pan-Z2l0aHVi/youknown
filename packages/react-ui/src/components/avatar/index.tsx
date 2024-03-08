import './avatar.scss'

import { cls, is } from '@youknown/utils/src'
import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode, useContext } from 'react'

import { UI_PREFIX } from '../../constants'
import Image from '../image/Image'
import { AvatarCtx } from './avatarCtx'
import AvatarGroup from './avatarGroup'

interface AvatarProps extends HTMLAttributes<HTMLElement> {
	size?: 'small' | 'medium' | 'large' | number
	round?: boolean
	bordered?: boolean
	color?: string
	src?: string
	badge?: ReactNode
	canPreview?: boolean
}

const Avatar = (props: AvatarProps, ref: ForwardedRef<HTMLDivElement>) => {
	const avatarCtx = useContext(AvatarCtx)

	const {
		children,
		className,
		src = '',
		size = avatarCtx.size ?? 'medium',
		round = avatarCtx.round ?? false,
		bordered = avatarCtx.bordered ?? false,
		color = 'var(--ui-bg-3)',
		badge,
		canPreview,
		style,
		...rest
	} = props

	const prefixCls = `${UI_PREFIX}-avatar`

	const imgEle = (
		<Image
			style={{ width: '100%', height: '100%', borderRadius: 'inherit' }}
			src={src}
			alt="Avatar"
			canPreview={canPreview}
		/>
	)

	const avatarStyle = is.number(size)
		? {
				...style,
				backgroundColor: color,
				width: `${size}px`,
				height: `${size}px`,
				minWidth: `${size}px`,
				minHeight: `${size}px`
			}
		: {
				...style,
				backgroundColor: color
			}

	return (
		<div
			ref={ref}
			className={cls(className, prefixCls, is.string(size) && `${prefixCls}-${size}`, {
				[`${prefixCls}-round`]: round,
				[`${prefixCls}-bordered`]: bordered
			})}
			style={avatarStyle}
			{...rest}
		>
			{children || imgEle}
			{badge && <div className={`${prefixCls}-badge`}>{badge}</div>}
		</div>
	)
}
Avatar.displayName = 'Avatar'

const RefAvatar = forwardRef(Avatar)
const ExportAvatar = RefAvatar as typeof RefAvatar & {
	Group: typeof AvatarGroup
}
ExportAvatar.Group = AvatarGroup

export default ExportAvatar
