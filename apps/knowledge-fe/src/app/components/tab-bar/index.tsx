import { useTranslation } from 'react-i18next'
import { TbAlbum, TbInnerShadowBottom, TbPhotoSquareRounded, TbSmartHome } from 'react-icons/tb'
import { useMatches } from 'react-router-dom'

import TransitionNavLink from '@/components/transition-nav-link'
import { useUIStore } from '@/stores'
import { cls } from '@youknown/utils/src'

export default function TabBar() {
	const { t } = useTranslation()
	const is_dark_theme = useUIStore(state => state.is_dark_theme)
	const matches = useMatches()

	const tab_list = [
		{
			Icon: TbSmartHome,
			title: t('tab.browse'),
			path: '/browse'
		},
		{
			Icon: TbAlbum,
			title: t('tab.library'),
			path: '/library'
		},
		{
			Icon: TbPhotoSquareRounded,
			title: t('tab.wallpaper'),
			path: '/wallpapers'
		},
		{
			Icon: TbInnerShadowBottom,
			title: t('tab.mine'),
			path: '/user-center'
		}
	]
	return (
		<>
			<div className="h-56px"></div>
			<div
				className={cls(
					'z-20 fixed bottom-0 w-100% h-56px flex items-center justify-around',
					is_dark_theme ? 'bg-[rgba(40,40,40,0.7)]' : '!bg-[rgba(240,240,240,0.7)]',
					'backdrop-blur-lg'
				)}
			>
				{tab_list.map(tab => {
					const is_active = matches.some(match => match.pathname === tab.path)
					return (
						<TransitionNavLink
							key={tab.path}
							to={tab.path}
							className={cls(
								'flex flex-col items-center decoration-none select-none',
								is_dark_theme ? 'color-#fff' : 'color-#555',
								{
									'color-primary': is_active
								}
							)}
						>
							<tab.Icon
								className={cls(
									is_active ? 'color-#fff bg-primary rd-full p-2px text-24px' : 'text-24px'
								)}
							/>
							<div className="text-12px scale-80">{tab.title}</div>
						</TransitionNavLink>
					)
				})}
			</div>
		</>
	)
}
