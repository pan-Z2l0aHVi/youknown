import { LuSettings2 } from 'react-icons/lu'
import { TbLogin, TbLogout } from 'react-icons/tb'

import { useModalStore, useUserStore } from '@/stores'
import { Avatar, Divider, Dropdown, Motion, Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

interface PersonalProps {
	expand: boolean
}

export default function Personal({ expand }: PersonalProps) {
	const has_login = useUserStore(state => state.has_login)
	const profile = useUserStore(state => state.profile)
	const do_logout = useUserStore(state => state.do_logout)
	const open_preferences_modal = useModalStore(state => state.open_preferences_modal)
	const open_login_modal = useModalStore(state => state.open_login_modal)

	return (
		<>
			<Tooltip
				title={has_login ? profile?.nickname : '立即登录'}
				placement="right"
				spacing={20}
				disabled={expand}
			>
				<Dropdown
					placement="top-start"
					trigger="click"
					content={
						<Dropdown.Menu className="w-208px">
							<Dropdown.Item
								closeAfterItemClick
								prefix={<LuSettings2 className="text-18px" />}
								onClick={open_preferences_modal}
							>
								设置
							</Dropdown.Item>
							<Divider size="small" />
							{has_login ? (
								<Dropdown.Item
									closeAfterItemClick
									prefix={<TbLogout className="text-18px color-danger" />}
									onClick={do_logout}
								>
									<span className="color-danger">退出登录</span>
								</Dropdown.Item>
							) : (
								<Dropdown.Item
									closeAfterItemClick
									prefix={<TbLogin className="text-18px color-primary" />}
									onClick={open_login_modal}
								>
									<span className="color-primary">去登录</span>
								</Dropdown.Item>
							)}
						</Dropdown.Menu>
					}
				>
					<div
						className={cls(
							'border-0 bg-transparent w-100% h-44px flex items-center p-4px rd-radius-m cursor-pointer select-none',
							'active-bg-secondary-active hover-not-active-bg-secondary-hover'
						)}
					>
						{has_login ? (
							<Avatar round size={36} src={profile?.avatar} />
						) : (
							<div className="flex justify-center items-center w-36px min-w-36px h-36px rd-full bg-primary color-#fff text-13px font-500">
								登录
							</div>
						)}
						<Motion.Fade in={expand} unmountOnExit>
							<div className="flex-1 break-all ws-nowrap ml-8px">
								{has_login ? profile?.nickname : '立即登录'}
							</div>
						</Motion.Fade>
					</div>
				</Dropdown>
			</Tooltip>
		</>
	)
}
