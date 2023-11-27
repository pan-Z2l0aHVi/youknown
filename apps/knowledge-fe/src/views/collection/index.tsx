import Header from '@/app/components/header'
import { Button, Collapse } from '@youknown/react-ui/src'
import WallpaperCard from '../wallpapers/components/wallpaper-card'
import FeedCard from './components/feed-card'
import { useUserStore } from '@/stores'
import UserCard from './components/user-card'
import { useInfinity } from '@youknown/react-hook/src'
import { get_collected_feed_list, get_followed_users, get_collected_wallpaper_list, Profile } from '@/apis/user'

const enum COLLECTION_TYPE {
	FEED = 1,
	USER = 2,
	WALLPAPER = 3
}

export function FeedCollapsePanel() {
	const { data: feed_list, loading } = useInfinity(async () => {
		const { list } = await get_collected_feed_list()
		return list
	})
	return (
		<>
			{feed_list.map(feed => (
				<FeedCard key={feed.feed_id} className="mr-16px mb-16px" feed={feed} />
			))}
			<Button className="m-[0_auto]" loading={loading}>
				查看更多
			</Button>
		</>
	)
}
export function UserCollapsePanel() {
	const { data: user_list, mutate: set_user_list } = useInfinity(async () => {
		const { list } = await get_followed_users()
		return list
	})
	return (
		<>
			{user_list.map(user => (
				<UserCard
					key={user.user_id}
					className="mr-16px mb-16px"
					user_info={user}
					on_removed={() => {
						set_user_list(p => p.filter(item => item.user_id !== user.user_id))
					}}
				/>
			))}
			<Button className="m-[0_auto]" loading>
				查看更多
			</Button>
		</>
	)
}
export function WallpaperCollapsePanel() {
	const { data: wallpaper_list, mutate: set_wallpaper_list } = useInfinity(async () => {
		const { list } = await get_collected_wallpaper_list()
		return list
	})
	return (
		<>
			{wallpaper_list.map(wallpaper => {
				return (
					<WallpaperCard
						key={wallpaper.id}
						className="mr-16px mb-16px"
						wallpaper={wallpaper}
						can_collected
						is_collected
						on_removed={() => {
							set_wallpaper_list(p => p.filter(item => item.id !== wallpaper.id))
						}}
					/>
				)
			})}
			<Button className="m-[0_auto]" loading>
				查看更多
			</Button>
		</>
	)
}

export default function Collection() {
	const has_login = useUserStore(state => state.has_login)

	return (
		<>
			<Header heading="收藏夹"></Header>

			<div className="p-32px">
				<Collapse accordion defaultActives={[COLLECTION_TYPE.FEED]}>
					<Collapse.Panel
						className="bg-bg-2 rd-radius-m"
						itemKey={COLLECTION_TYPE.FEED}
						title={<span className="color-text-2 font-600">收藏的文档</span>}
						bordered={false}
					>
						<div className="flex flex-wrap p-[16px_0]">
							<FeedCollapsePanel />
						</div>
					</Collapse.Panel>
					<Collapse.Panel
						className="bg-bg-2 rd-radius-m"
						itemKey={COLLECTION_TYPE.USER}
						title={<span className="color-text-2 font-600">我关注的用户</span>}
						bordered={false}
					>
						<div className="flex flex-wrap p-[16px_0]">
							<UserCollapsePanel />
						</div>
					</Collapse.Panel>
					<Collapse.Panel
						className="bg-bg-2 rd-radius-m"
						itemKey={COLLECTION_TYPE.WALLPAPER}
						title={<span className=" color-text-2 font-600">收藏的壁纸</span>}
						bordered={false}
					>
						<div className="flex flex-wrap p-[16px_0]">
							<WallpaperCollapsePanel />
						</div>
					</Collapse.Panel>
				</Collapse>
			</div>
		</>
	)
}
