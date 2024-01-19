import { Feed } from '@/apis/feed'
import useFeedPraise from '@/hooks/use-feed-praise'
import { is_dark_theme_getter, useUIStore } from '@/stores'
import { useBoolean } from '@youknown/react-hook/src'
import { Avatar, Button, Dialog, Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { useTranslation } from 'react-i18next'
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa6'
import { TbDots } from 'react-icons/tb'

interface PraiseDetailProps {
	feed: Feed
}
export default function PraiseDetail(props: PraiseDetailProps) {
	const { feed } = props

	const { t } = useTranslation()
	const is_dark_theme = useUIStore(is_dark_theme_getter)
	const is_mobile = useUIStore(state => state.is_mobile)
	const { praise_list, praise_count, toggle_praise, praised } = useFeedPraise(feed)
	const [open, { setTrue: show, setFalse: hide }] = useBoolean(false)

	const praise_list_modal = (
		<Dialog
			open={open}
			onCancel={hide}
			header={null}
			footer={null}
			closeIcon={null}
			overlayClassName={cls(
				'backdrop-blur-xl',
				is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]'
			)}
		>
			<div className="flex flex-wrap p-16px">
				{praise_list.map(user => (
					<Tooltip
						key={user.user_id}
						trigger={is_mobile ? 'click' : 'hover'}
						placement="bottom"
						title={user.nickname}
					>
						<Avatar className="m-4px" round src={user.avatar} />
					</Tooltip>
				))}
			</div>
		</Dialog>
	)

	return (
		<>
			<div className="group flex flex-col items-center w-max p-8px m-[0_auto] select-none">
				<Button
					className="sm:group-hover-animate-shake-y b-primary!"
					size="large"
					circle
					onClick={toggle_praise}
				>
					{praised ? (
						<FaThumbsUp className="text-20px color-primary" />
					) : (
						<FaRegThumbsUp className="text-20px color-primary" />
					)}
				</Button>
				<div className="color-text-3 mt-8px">{`${praise_count} ${t('praise.people_num')}`}</div>
			</div>

			{praise_list.length > 0 && (
				<>
					<div className="flex items-center w-max m-[0_auto] mt-16px">
						<Avatar.Group size={36}>
							{praise_list.slice(0, 10).map(user => (
								<Tooltip
									key={user.user_id}
									trigger={is_mobile ? 'click' : 'hover'}
									title={user.nickname}
								>
									<Avatar round src={user.avatar} />
								</Tooltip>
							))}
						</Avatar.Group>
						<Button className="p-0! ml-4px" circle onClick={show}>
							<TbDots className="text-16px" />
						</Button>
					</div>
					{praise_list_modal}
				</>
			)}

			<div className="h-200px"></div>
		</>
	)
}
