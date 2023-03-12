import Preferences from './preferences'
import { useBoolean } from '@youknown/react-hook/src'
import { Avatar, Card, Dropdown, Modal, Tooltip, XIcon } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React from 'react'

interface PersonalProps {
	expand: boolean
}

export default function Personal({ expand }: PersonalProps) {
	const [personal_popup_open, { setTrue: show_personal_popup, setFalse: hide_personal_popup }] = useBoolean(false)
	const [preferences_modal_open, { setTrue: show_preferences_modal, setFalse: hide_preferences_modal }] =
		useBoolean(false)

	const preferences_modal = (
		<Modal open={preferences_modal_open} onCancel={hide_preferences_modal}>
			<Card
				header={
					<div className="flex items-center justify-between p-[24px_24px_0]">
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
					trigger="manual"
					open={personal_popup_open}
					onClickOutside={hide_personal_popup}
					content={
						<Dropdown.Menu className="w-208px">
							<Dropdown.Item
								onClick={() => {
									hide_personal_popup()
									show_preferences_modal()
								}}
							>
								设置
							</Dropdown.Item>
						</Dropdown.Menu>
					}
				>
					<div
						className={cls(
							'border-0 bg-transparent w-100% h-44px flex items-center p-4px b-rd-radius-m cursor-pointer select-none',
							'active-bg-active hover-not-active-bg-hover'
						)}
						onClick={show_personal_popup}
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
