import Preferences from './preferences'
import { useBoolean } from '@youknown/react-hook/src'
import { Avatar, Card, Divider, Dropdown, Modal, Tooltip, XIcon } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React from 'react'
import { TbLogout, TbSettings2 } from 'react-icons/tb'

interface PersonalProps {
	expand: boolean
}

export default function Personal({ expand }: PersonalProps) {
	const [preferences_modal_open, { setTrue: show_preferences_modal, setFalse: hide_preferences_modal }] =
		useBoolean(false)

	const preferences_modal = (
		<Modal open={preferences_modal_open} onCancel={hide_preferences_modal}>
			<Card
				header={
					<div className="flex justify-between p-[24px_24px_0]">
						<span className="text-16px">偏好设置</span>
						<XIcon onClick={hide_preferences_modal} />
					</div>
				}
			>
				<Preferences />
			</Card>
		</Modal>
	)

	return (
		<>
			<Tooltip title={'未登录'} placement="right" spacing={20} disabled={expand}>
				<Dropdown
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
					>
						<Avatar round size={36} />

						{expand && <div className="flex-1 break-all ws-nowrap ml-8px">未登录</div>}
					</div>
				</Dropdown>
			</Tooltip>

			{preferences_modal}
		</>
	)
}
