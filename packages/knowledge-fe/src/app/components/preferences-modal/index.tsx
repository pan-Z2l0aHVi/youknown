import { Modal, Card, XIcon } from '@youknown/react-ui/src'
import Preferences from './components/preferences'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { close_preferences_modal } from '@/store/modal'

export default function PreferencesModal() {
	const dispatch = useAppDispatch()
	const modal_open = useAppSelector(state => state.modal.preferences_modal_open)
	const handle_close = () => {
		dispatch(close_preferences_modal())
	}
	return (
		<Modal className="backdrop-blur-md !bg-[rgba(0,0,0,0.2)]" open={modal_open} onCancel={handle_close}>
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
		</Modal>
	)
}
