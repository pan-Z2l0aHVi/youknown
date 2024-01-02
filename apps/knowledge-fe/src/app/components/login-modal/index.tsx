import { useTranslation } from 'react-i18next'

import { useModalStore, useUIStore } from '@/stores'
import { Card, CloseIcon, Motion, Overlay } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import GithubCard from './components/github-card'
import WeChatCard from './components/wechat-card'

export default function LoginModal() {
	const { t } = useTranslation()
	const modal_open = useModalStore(state => state.login_modal_open)
	const close_login_modal = useModalStore(state => state.close_login_modal)
	const is_dark_theme = useUIStore(state => state.is_dark_theme)

	return (
		<Overlay
			className={cls('backdrop-blur-xl', is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]')}
			open={modal_open}
			onCancel={close_login_modal}
			unmountOnExit
		>
			<Motion.Zoom in={modal_open}>
				<Card
					shadow
					header={
						<div className="flex justify-between p-[24px_24px_8px_24px]">
							<span className="text-16px font-500">{t('heading.user_login')}</span>
							<CloseIcon onClick={close_login_modal} />
						</div>
					}
				>
					<div className="flex flex-col items-center w-360px p-24px">
						<div className="w-100% grid grid-cols-[repeat(2,1fr)] grid-rows-[repeat(1,152px)] gap-16px">
							<GithubCard />
							<WeChatCard />
						</div>
					</div>
				</Card>
			</Motion.Zoom>
		</Overlay>
	)
}
