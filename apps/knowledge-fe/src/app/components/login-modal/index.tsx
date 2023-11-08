import { useState } from 'react'
import { GrGithub } from 'react-icons/gr'
import { RiWechatFill } from 'react-icons/ri'

import { useModalStore, useUIStore, useUserStore } from '@/stores'
import { go_github_login } from '@/utils'
import { Button, Card, CloseIcon, Overlay, Motion, Toast } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import LoginCard from './components/login-card'

const enum LOGIN_METHOD {
	GITHUB = 1,
	WECHAT = 2
}

export default function LoginModal() {
	const modal_open = useModalStore(state => state.login_modal_open)
	const close_login_modal = useModalStore(state => state.close_login_modal)
	const is_dark_theme = useUIStore(state => state.is_dark_theme)
	const fetch_profile = useUserStore(state => state.fetch_profile)
	const login = useUserStore(state => state.login)
	const [login_method, set_login_method] = useState<LOGIN_METHOD>(LOGIN_METHOD.GITHUB)

	const handle_github_login = () => {
		go_github_login()
			.then(() => {
				login()
				fetch_profile()
				close_login_modal()
			})
			.catch(() => {
				Toast.error({
					content: '登录失败'
				})
			})
	}

	const handle_wechat_login = () => {
		Toast.warning({ content: '施工中...' })
	}

	const handle_login = () => {
		switch (login_method) {
			case LOGIN_METHOD.GITHUB:
				handle_github_login()
				break

			case LOGIN_METHOD.WECHAT:
				handle_wechat_login()
				break

			default:
				break
		}
	}

	return (
		<Overlay
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
						<div className="w-100% grid grid-cols-[repeat(2,1fr)] gap-24px mb-24px">
							<LoginCard
								title="Github登录"
								icon={<GrGithub className="text-40px" />}
								active={login_method === LOGIN_METHOD.GITHUB}
								onClick={() => set_login_method(LOGIN_METHOD.GITHUB)}
							/>
							<LoginCard
								title="微信登录"
								icon={<RiWechatFill className="text-40px color-#55B837" />}
								active={login_method === LOGIN_METHOD.WECHAT}
								onClick={() => set_login_method(LOGIN_METHOD.WECHAT)}
							/>
						</div>

						<Button className="w-100%!" size="large" primary onClick={handle_login}>
							立即授权
						</Button>

						<div className="color-text-3 text-12px mt-16px">
							点击上方按钮
							{/* 点击上方按钮，代表你同意
							<a className="ml-2px color-primary underline cursor-pointer">服务条款</a> */}
						</div>
					</div>
				</Card>
			</Motion.Zoom>
		</Overlay>
	)
}
