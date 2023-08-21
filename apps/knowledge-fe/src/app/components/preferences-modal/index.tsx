import { useAppDispatch, useAppSelector } from '@/hooks'
import { close_preferences_modal } from '@/store/modal'
import { Card, Modal, Motion, XIcon } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import Preferences from './components/preferences'

export default function PreferencesModal() {
	const dispatch = useAppDispatch()
	const modal_open = useAppSelector(state => state.modal.preferences_modal_open)
	const is_dark_theme = useAppSelector(state => state.ui.is_dark_theme)
	const handle_close = () => {
		dispatch(close_preferences_modal())
	}
	return (
		<Modal
			className={cls('backdrop-blur-xl', is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]')}
			open={modal_open}
			onCancel={handle_close}
			unmountOnExit
		>
			<Motion.Zoom in={modal_open}>
				<Card
					shadow
					header={
						<div className="flex justify-between p-[24px_24px_0]">
							<span className="text-16px">偏好设置</span>
							<XIcon onClick={handle_close} />
						</div>
					}
				>
					<Preferences />
				</Card>
			</Motion.Zoom>
		</Modal>
	)
}
