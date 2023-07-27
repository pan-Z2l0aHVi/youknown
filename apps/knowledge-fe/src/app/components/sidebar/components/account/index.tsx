import { useAppDispatch, useAppSelector } from '@/hooks'
import { Avatar, Divider, Dropdown, Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { TbLogout, TbSettings2 } from 'react-icons/tb'
import { open_preferences_modal, open_login_modal } from '@/store/modal'
import { useEffect } from 'react'
import { fetch_profile } from '@/store/user'

interface PersonalProps {
	expand: boolean
}

export default function Personal({ expand }: PersonalProps) {
	const dispatch = useAppDispatch()
	const is_login = useAppSelector(state => state.user.is_login)
	const profile = useAppSelector(state => state.user.profile)
	const show_preferences_modal = () => {
		dispatch(open_preferences_modal())
	}
	useEffect(() => {
		dispatch(fetch_profile())
	}, [dispatch])

	return (
		<>
			<Tooltip title={profile.nickname} placement="right" spacing={20} disabled={expand}>
				<Dropdown
					disabled={!is_login}
					placement="top-start"
					trigger="click"
					content={
						<Dropdown.Menu className="w-208px">
							<Dropdown.Item
								closeAfterItemClick
								prefix={<TbSettings2 className="text-18px" />}
								onClick={() => {
									show_preferences_modal()
								}}
							>
								设置
							</Dropdown.Item>
							<Divider size="small" />
							<Dropdown.Item closeAfterItemClick prefix={<TbLogout className="text-18px color-danger" />}>
								<span className="color-danger">退出登录</span>
							</Dropdown.Item>
						</Dropdown.Menu>
					}
				>
					<div
						className={cls(
							'border-0 bg-transparent w-100% h-44px flex items-center p-4px b-rd-radius-m cursor-pointer select-none',
							'active-bg-active hover-not-active-bg-hover'
						)}
						onClick={() => {
							if (is_login) return
							dispatch(open_login_modal())
						}}
					>
						{is_login ? (
							<Avatar round size={36} src={profile.avatar} />
						) : (
							<div className="flex justify-center items-center w-36px min-w-36px h-36px rd-round bg-primary color-#fff text-13px font-500">
								登录
							</div>
						)}

						{expand && (
							<div className="flex-1 break-all ws-nowrap ml-8px">
								{is_login ? profile.nickname : '立即登录'}
							</div>
						)}
					</div>
				</Dropdown>
			</Tooltip>
		</>
	)
}
