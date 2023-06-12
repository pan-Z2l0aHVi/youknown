import { ComponentProps, FC, ReactNode } from 'react'
import { cls } from '@youknown/utils/src'
import { UI_PREFIX } from '../../constants'
import './dialog.scss'
import Modal from '../modal'
import Space from '../space'
import Button from '../button'
import Card from '../card'
import Motion from '../motion'
import XIcon from '../x-icon'

interface DialogProps extends ComponentProps<typeof Modal> {
	hasCancel?: boolean
	closeIcon?: ReactNode
	maskClassName?: string
	title?: string
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
		maskClassName,
		maskClosable,
		hasCancel = true,
		title,
		okText = 'Ok',
		cancelText = 'Cancel',
		okLoading = false,
		okDanger = false,
		onCancel,
		onOk,
		closeIcon = <XIcon className={`${prefixCls}-close-icon`} onClick={onCancel} />,
		...rest
	} = props

	return (
		<Modal open={open} className={maskClassName} maskClosable={maskClosable} onCancel={onCancel} {...rest}>
			<Motion.Grow in={open}>
				<Card
					className={cls(className, prefixCls)}
					shadow
					header={
						<div className={`${prefixCls}-header`}>
							<strong className={`${prefixCls}-header-title`}>{title}</strong>
						</div>
					}
					footer={
						<div className={`${prefixCls}-footer`}>
							<Space>
								{hasCancel && <Button onClick={onCancel}>{cancelText}</Button>}
								<Button primary={!okDanger} danger={okDanger} loading={okLoading} onClick={onOk}>
									{okText}
								</Button>
							</Space>
						</div>
					}
				>
					{closeIcon}
					<div className={`${prefixCls}-content`}>{children}</div>
				</Card>
			</Motion.Grow>
		</Modal>
	)
}

export default Dialog
