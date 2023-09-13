import { GrGithub } from 'react-icons/gr'
import { RiWechatFill } from 'react-icons/ri'

import { useModalStore, useUIStore, useUserStore } from '@/stores'
import { go_github_login } from '@/utils'
import { Button, Card, CloseIcon, Modal, Motion, Toast } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

export default function SignInModal() {
	const modal_open = useModalStore(state => state.login_modal_open)
	const close_login_modal = useModalStore(state => state.close_login_modal)
	const is_dark_theme = useUIStore(state => state.is_dark_theme)
	const fetch_profile = useUserStore(state => state.fetch_profile)
	const login = useUserStore(state => state.login)

	const handle_github_login = () => {
		go_github_login()
			.then(() => {
				login()
				fetch_profile()
				close_login_modal()
			})
			.catch(() => {
				Toast.error({
					content: 'closed'
				})
			})
	}
	return (
		<Modal
			className={cls('backdrop-blur-xl', is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]')}
			open={modal_open}
			onCancel={close_login_modal}
		>
			<Motion.Zoom in={modal_open}>
				<Card
					shadow
					bordered={true}
					header={
						<div className="flex justify-between p-[24px_24px_8px_24px]">
							<span className="text-16px">用户登录</span>
							<CloseIcon onClick={close_login_modal} />
						</div>
					}
				>
					<div className="flex flex-col items-center w-360px p-24px">
						<Button
							className="w-100%! mb-16px"
							size="large"
							prefixIcon={<GrGithub className="text-20px" />}
							onClick={handle_github_login}
						>
							通过Github 登录
						</Button>
						<Button
							className="w-100%! mb-16px"
							size="large"
							prefixIcon={<RiWechatFill className="text-20px color-#55B837" />}
						>
							通过微信登录
						</Button>
						<div className="color-text-3 text-12px">
							点击上方按钮，代表你同意
							<a className="ml-2px color-primary underline cursor-pointer">服务条款</a>
						</div>
					</div>
				</Card>
			</Motion.Zoom>
		</Modal>
	)
}
