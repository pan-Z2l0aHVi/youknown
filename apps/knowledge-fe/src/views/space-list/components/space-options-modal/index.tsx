import { useUIStore } from '@/stores'
import { Card, CloseIcon, Motion, Overlay } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import SpaceOptions from './components/space-options'

interface SpaceOptionsModalProps {
	open: boolean
	hide_modal: () => void
	space_id?: string
	on_save: (name: string, desc: string) => Promise<void>
}
export default function SpaceOptionsModal(props: SpaceOptionsModalProps) {
	const { open, hide_modal, space_id, on_save } = props
	const is_dark_theme = useUIStore(state => state.is_dark_theme)
	const is_edit = !!space_id

	return (
		<Overlay
			className={cls('backdrop-blur-xl', is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]')}
			open={open}
			onCancel={hide_modal}
			unmountOnExit
		>
			<Motion.Zoom in={open}>
				<Card
					shadow
					header={
						<div className="flex justify-between p-[24px_24px_0]">
							<span className="text-16px">{is_edit ? '管理空间' : '新建空间'}</span>
							<CloseIcon onClick={hide_modal} />
						</div>
					}
				>
					<SpaceOptions space_id={space_id} hide_modal={hide_modal} on_save={on_save} />
				</Card>
			</Motion.Zoom>
		</Overlay>
	)
}
