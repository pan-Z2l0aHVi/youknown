import { useAppDispatch, useAppSelector } from '@/hooks'
import { close_login_modal } from '@/store/modal/slice'
import { go_github_login } from '@/utils'
import { Modal, Card, XIcon, Button } from '@youknown/react-ui/src'
import { GrGithub } from 'react-icons/gr'
import { RiWechatFill } from 'react-icons/ri'

export default function SignInModal() {
	const dispatch = useAppDispatch()
	const modal_open = useAppSelector(state => state.modal.login_modal_open)
	const handle_close = () => {
		dispatch(close_login_modal())
	}
	return (
		<Modal className="backdrop-blur-md !bg-[rgba(0,0,0,0.2)]" open={modal_open} onCancel={handle_close}>
			<Card
				shadow
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
						onClick={() => {
							go_github_login()
						}}
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
		</Modal>
	)
}
