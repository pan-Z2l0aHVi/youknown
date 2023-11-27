import { Profile, unfollow_user } from '@/apis/user'
import useTransitionNavigate from '@/hooks/use-transition-navigate'
import { useUserStore } from '@/stores'
import { with_api } from '@/utils/request'
import { useHover } from '@youknown/react-hook/src'
import { Avatar, Button, Toast } from '@youknown/react-ui/src'
import { QS, cls } from '@youknown/utils/src'
import { useState } from 'react'

interface UserCardProps {
	className?: string
	user_info: Profile
	on_removed?: () => void
}
export default function UserCard(props: UserCardProps) {
	const { className, user_info, on_removed } = props
	const navigate = useTransitionNavigate()
	const set_profile = useUserStore(state => state.set_profile)
	const [unfollow_loading, set_unfollow_loading] = useState(false)

	const handle_unfollow_user = async () => {
		const target_user_id = user_info?.user_id
		if (!target_user_id) {
			return
		}
		set_unfollow_loading(true)
		const [err, new_profile] = await with_api(unfollow_user)({
			user_id: target_user_id
		})
		set_unfollow_loading(false)
		if (err) {
			return
		}
		Toast.success({ content: '取消关注成功' })
		set_profile(new_profile)
		on_removed?.()
	}

	const go_user_center = () => {
		navigate(
			QS.stringify({
				base: '/user-center',
				query: {
					target_user_id: user_info.user_id
				}
			})
		)
	}

	const [follow_btn] = useHover(hovering =>
		hovering ? (
			<Button
				size="small"
				round
				danger
				loading={unfollow_loading}
				onClick={e => {
					e.stopPropagation()
					handle_unfollow_user()
				}}
			>
				<span className="text-12px">取消关注</span>
			</Button>
		) : (
			<Button size="small" round>
				<span className="text-12px">已关注</span>
			</Button>
		)
	)
	return (
		<div
			className={cls(
				'relative w-144px',
				'b-solid b-1 b-bd-line rd-radius-m cursor-pointer select-none overflow-hidden',
				'hover-b-primary hover-shadow-[var(--ui-shadow-l),0_0_0_1px_var(--ui-color-primary)]',
				'bg-no-repeat bg-cover',
				'before:content-empty before:absolute before:top-0 before:left-0 before:w-100% before:h-100% before:backdrop-blur-xl',
				className
			)}
			style={{
				backgroundImage: `url("${user_info.avatar}")`
			}}
			onClick={go_user_center}
		>
			<div className="relative flex flex-col items-center p-[16px_8px]">
				<Avatar className="shadow-shadow-m" size="large" round src={user_info.avatar} />
				<div className="color-text-1 font-600 truncate mb-12px">{user_info.nickname}</div>
				{follow_btn}
			</div>
		</div>
	)
}
