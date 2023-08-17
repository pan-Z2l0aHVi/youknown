import { GrGithub } from 'react-icons/gr'
import { RiWechatFill } from 'react-icons/ri'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { close_login_modal } from '@/store/modal'
import { fetch_profile, login } from '@/store/user'
import { go_github_login } from '@/utils'
import { Button, Card, Modal, Motion, Toast, XIcon } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

export default function SignInModal() {
	const dispatch = useAppDispatch()
	const modal_open = useAppSelector(state => state.modal.login_modal_open)
	const is_dark_theme = useAppSelector(state => state.ui.is_dark_theme)
	const handle_close = () => {
		dispatch(close_login_modal())
	}
	const handle_github_login = () => {
		go_github_login()
			.then(() => {
				dispatch(login())
				dispatch(fetch_profile())
				handle_close()
			})
			.catch(() => {
				Toast.show({
					title: 'closed'
				})
			})
	}
	return (
		<Modal
			className={cls('backdrop-blur-xl', is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]')}
			open={modal_open}
			onCancel={handle_close}
		>
			<Motion.Zoom in={modal_open}>
				<Card
					shadow
					bordered={true}
					header={
						<div className="flex justify-between p-[24px_24px_8px_24px]">
							<span className="text-16px">用户登录</span>
							<XIcon onClick={handle_close} />
						</div>
					}
				>
					<div className="flex flex-col items-center w-360px p-24px">
						<Button
							className="w-100%! mb-16px"
							size="large"
							icon={<GrGithub className="text-20px" />}
							onClick={handle_github_login}
						>
							通过Github 登录
						</Button>
						<Button
							className="w-100%! mb-16px"
							size="large"
							icon={<RiWechatFill className="text-20px color-#55B837" />}
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
