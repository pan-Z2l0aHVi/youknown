import { useState } from 'react'
import { BiBookmarkAlt } from 'react-icons/bi'
import { FcFolder } from 'react-icons/fc'
import { LuSettings2 } from 'react-icons/lu'
import { PiTrashSimpleBold } from 'react-icons/pi'

import { DocSpace } from '@/apis/space'
import More from '@/components/more'
import useTransitionNavigate from '@/hooks/use-transition-navigate'
import { useSpaceStore, useUIStore } from '@/stores'
import { Dialog, Dropdown } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

interface SpaceCardProps {
	info: DocSpace
	on_edit: () => void
}
export default function SpaceCard(props: SpaceCardProps) {
	const { info, on_edit } = props
	const is_dark_theme = useUIStore(state => state.is_dark_theme)
	const delete_spaces = useSpaceStore(state => state.delete_spaces)
	const navigate = useTransitionNavigate()
	const [more_open, set_more_open] = useState(false)

	const go_space_docs = () => {
		navigate(`${info.space_id}`)
	}
	const handle_show_desc = () => {
		Dialog.confirm({
			content: info.desc,
			footer: null,
			header: null,
			closeIcon: null,
			overlayClassName: cls(
				'backdrop-blur-xl',
				is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]'
			)
		})
	}
	const show_delete_dialog = () => {
		Dialog.confirm({
			title: '删除空间',
			content: `是否删除空间「${info.name}」`,
			overlayClassName: cls(
				'backdrop-blur-xl',
				is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]'
			),
			okDanger: true,
			okText: '删除',
			cancelText: '取消',
			async onOk() {
				await delete_spaces(info.space_id)
			}
		})
	}
	return (
		<div
			className={cls(
				'flex items-center p-16px b-solid b-1 b-bd-line rd-radius-m cursor-pointer',
				'hover-b-primary hover-shadow-[var(--ui-shadow-l),0_0_0_1px_var(--ui-color-primary)]'
			)}
			onClick={go_space_docs}
		>
			<FcFolder className="text-36px" />
			<div className="flex-1 w-0 ml-16px mr-16px">
				<div className="line-clamp-1">{info.name}</div>
			</div>
			<Dropdown
				trigger="click"
				placement="bottom-start"
				content={
					<Dropdown.Menu className="w-120px" closeAfterItemClick onClick={e => e.stopPropagation()}>
						<Dropdown.Item prefix={<BiBookmarkAlt className="text-16px" />} onClick={handle_show_desc}>
							查看简介
						</Dropdown.Item>
						<Dropdown.Item prefix={<LuSettings2 className="text-16px" />} onClick={on_edit}>
							管理空间
						</Dropdown.Item>
						<Dropdown.Item
							prefix={<PiTrashSimpleBold className="color-danger text-16px" />}
							onClick={show_delete_dialog}
						>
							<span className="color-danger">删除</span>
						</Dropdown.Item>
					</Dropdown.Menu>
				}
				onOpenChange={set_more_open}
			>
				<More active={more_open} onClick={e => e.stopPropagation()} />
			</Dropdown>
		</div>
	)
}
