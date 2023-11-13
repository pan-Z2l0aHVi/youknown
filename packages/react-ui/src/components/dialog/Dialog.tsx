import './dialog.scss'

import { ComponentProps, FC, ReactNode } from 'react'

import { cls, is } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import Button from '../button'
import Card from '../card'
import CloseIcon from '../close-icon'
import Motion from '../motion'
import Overlay from '../overlay'
import Space from '../space'

export interface DialogProps extends ComponentProps<typeof Overlay> {
	hasCancel?: boolean
	closeIcon?: ReactNode
	overlayClassName?: string
	title?: string
	footer?: ReactNode
	header?: ReactNode
	okText?: string
	cancelText?: string
	okLoading?: boolean
	okDanger?: boolean
	onCancel?: () => void
	onOk?: () => void
}

const Dialog: FC<DialogProps> = props => {
	const prefixCls = `${UI_PREFIX}-dialog`
	const {
		children,
		className,
		open,
		overlayClassName,
		overlayClosable,
		hasCancel = true,
		title,
		okText = 'Ok',
		cancelText = 'Cancel',
		okLoading = false,
		okDanger = false,
		onCancel,
		onOk,
		closeIcon,
		footer,
		header,
		...rest
	} = props

	return (
		<Overlay
			open={open}
			className={overlayClassName}
			overlayClosable={overlayClosable}
			onCancel={onCancel}
			{...rest}
		>
			<Motion.Zoom in={open}>
				<Card
					className={cls(className, prefixCls)}
					shadow
					header={
						is.undefined(header) ? (
							<div className={`${prefixCls}-header`}>
								<strong className={`${prefixCls}-header-title`}>{title}</strong>
							</div>
						) : (
							header
						)
					}
					footer={
						is.undefined(footer) ? (
							<div className={`${prefixCls}-footer`}>
								<Space>
									{hasCancel && <Button onClick={onCancel}>{cancelText}</Button>}
									<Button primary={!okDanger} danger={okDanger} loading={okLoading} onClick={onOk}>
										{okText}
									</Button>
								</Space>
							</div>
						) : (
							footer
						)
					}
				>
					{is.undefined(closeIcon) ? (
						<CloseIcon className={`${prefixCls}-close-icon`} onClick={onCancel} />
					) : (
						closeIcon
					)}
					<div className={`${prefixCls}-content`}>{children}</div>
				</Card>
			</Motion.Zoom>
		</Overlay>
	)
}

Dialog.displayName = 'Dialog'
export default Dialog
