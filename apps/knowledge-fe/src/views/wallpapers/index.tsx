import { useRef, useState } from 'react'
import Header from '@/app/components/header'
import { Loading, Toast } from '@youknown/react-ui/src'
import WallpaperFilter, { WallpaperQuery } from './components/wallpaper-filter'
import { useFetchPageList } from '@youknown/react-hook/src'
import { search_wallpapers } from '@/apis/wallpaper'
import { cls } from '@youknown/utils/src'
import WallpaperCard from './components/wallpaper-card'
import { useAppContentEl } from '@/hooks'

export default function Wallpapers() {
	const [params, set_params] = useState<WallpaperQuery>()
	const app_content_el = useAppContentEl()
	const loading_ref = useRef<HTMLDivElement>(null)
	const wrapper_ref = useRef<HTMLDivElement>(null)

	const wallpaper_fetcher = async () => {
		const { keywords, ai_art_filter, atleast, ratios, sorting, topRange, order, categories, purity } = params!
		const search_params: Parameters<typeof search_wallpapers>['0'] = {
			q: keywords,
			ai_art_filter,
			categories,
			purity,
			atleast,
			ratios,
			sorting,
			topRange,
			order,
			page
		}
		const data = await search_wallpapers(search_params)
		return {
			list: data,
			total: Infinity
		}
	}
	const {
		page,
		list: wallpapers,
		isEnd: is_pull_end,
		resetListData: reset_wallpapers,
		updateListData: do_search
	} = useFetchPageList(wallpaper_fetcher, {
		initialPageSize: 48,
		ready: !!params,
		loadingRef: loading_ref,
		observerInit: {
			root: app_content_el,
			rootMargin: '0px 0px 280px 0px'
		},
		onError() {
			Toast.show({ title: '服务异常，请稍后再试' })
		}
	})

	const wallpaper_list = (
		<div
			ref={wrapper_ref}
			className={cls('grid gap-16px items-center justify-center', 'grid-cols-[repeat(auto-fill,240px)]')}
		>
			{wallpapers.map(wallpaper => (
				<WallpaperCard
					key={wallpaper.id}
					thumb_url={wallpaper.thumbs.original}
					detail_url={wallpaper.path}
					ratio={1 / Number(wallpaper.ratio)}
					resolution_x={wallpaper.dimension_x}
					resolution_y={wallpaper.dimension_y}
				/>
			))}
		</div>
	)

	return (
		<>
			<Header heading="壁纸" bordered></Header>

			<div className="p-[32px_16px_0]">
				<WallpaperFilter
					on_query_change={set_params}
					search={() => {
						reset_wallpapers()
						setTimeout(() => {
							do_search()
						})
					}}
					reset={reset_wallpapers}
				/>
			</div>
			<div className="p-[0_32px]">
				<div className="m-t-32px min-h-20vh">{wallpaper_list}</div>

				{is_pull_end ? (
					<div
						className={cls(
							'relative flex justify-center items-center h-80px',
							'after:absolute after:content-empty after:w-240px after:b-b-1 after:b-b-solid after:b-bd-line'
						)}
					>
						<div className="z-1 p-l-8px p-r-8px bg-bg-0 color-text-2">没有更多内容了</div>
					</div>
				) : (
					<div ref={loading_ref} className="flex justify-center items-center h-80px">
						<Loading spinning className="m-r-8px" />
						<span className="color-text-2">加载中...</span>
					</div>
				)}
			</div>
		</>
	)
}
