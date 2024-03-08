import './tag.scss'

import { useBoolean } from '@youknown/react-hook/src'
import { cls } from '@youknown/utils/src'
import { ForwardedRef, forwardRef, HTMLAttributes } from 'react'
import { TbX } from 'react-icons/tb'

import { UI_PREFIX } from '../../constants'
import Loading from '../loading'

interface TagProps extends HTMLAttributes<HTMLDivElement> {
	size?: 'small' | 'medium' | 'large'
	round?: boolean
	bordered?: boolean
	bgColor?: string
	color?: string
	borderColor?: string
	closable?: boolean
	onClose?: () => void | Promise<void>
}

const Tag = (props: TagProps, propRef: ForwardedRef<HTMLDivElement>) => {
	const {
		children,
		className,
		size = 'medium',
		round = false,
		bgColor,
		color,
		bordered = false,
		borderColor,
		closable = false,
		onClose,
		style,
		...rest
	} = props

	const [loading, { setTrue: showLoading, setFalse: hideLoading }] = useBoolean(false)

	const prefixCls = `${UI_PREFIX}-tag`

	return (
		<div
			ref={propRef}
			className={cls(className, prefixCls, `${prefixCls}-${size}`, {
				[`${prefixCls}-round`]: round,
				[`${prefixCls}-bordered`]: bordered
			})}
			style={{
				...style,
				color,
				borderColor,
				backgroundColor: bgColor
			}}
			{...rest}
		>
			<div>{children}</div>
			{closable && (
				<div className={`${prefixCls}-close`}>
					{loading ? (
						<Loading size="small" spinning />
					) : (
						<TbX
							onClick={() => {
								const res = onClose?.()
								if (res instanceof Promise) {
									showLoading()
									res.then(() => {
										hideLoading()
									})
								}
							}}
						/>
					)}
				</div>
			)}
		</div>
	)
}
Tag.displayName = 'Tag'
export default forwardRef(Tag)
