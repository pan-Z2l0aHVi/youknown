import { useModalStore, useUIStore } from '@/stores'
import { Card, CloseIcon, Overlay, Motion } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import Preferences from './components/preferences'

export default function PreferencesModal() {
	const modal_open = useModalStore(state => state.preferences_modal_open)
	const close_preferences_modal = useModalStore(state => state.close_preferences_modal)
	const is_dark_theme = useUIStore(state => state.is_dark_theme)

	return (
		<Overlay
			className={cls('backdrop-blur-xl', is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]')}
			open={modal_open}
			onCancel={close_preferences_modal}
			unmountOnExit
		>
			<Motion.Zoom in={modal_open}>
				<Card
					shadow
					header={
						<div className="flex justify-between p-[24px_24px_0]">
							<span className="text-16px">偏好设置</span>
							<CloseIcon onClick={close_preferences_modal} />
						</div>
					}
				>
					<Preferences />
				</Card>
			</Motion.Zoom>
		</Overlay>
	)
}
