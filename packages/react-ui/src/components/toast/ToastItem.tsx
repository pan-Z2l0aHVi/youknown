import './toast-item.scss'

import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from 'react'
import { TbX } from 'react-icons/tb'

import { cls } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'

interface ToastItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	title?: ReactNode
	icon?: ReactNode
	closable?: boolean
	onClose?: () => void
}

const ToastItem = (props: ToastItemProps, propRef: ForwardedRef<HTMLDivElement>) => {
	const { className, title, icon, closable = false, onClose, ...rest } = props

	const prefixCls = `${UI_PREFIX}-toast-item`

	return (
		<div ref={propRef} className={cls(className, prefixCls)} {...rest}>
			{icon && <div className={`${prefixCls}-icon`}>{icon}</div>}
			<div className={`${prefixCls}-title-wrap`}>{title}</div>
			{closable && (
				<div className={`${prefixCls}-close-icon`}>
					<TbX onClick={() => onClose?.()} />
				</div>
			)}
		</div>
	)
}
ToastItem.displayName = 'ToastItem'
const RefToastItem = forwardRef(ToastItem)
export default RefToastItem
