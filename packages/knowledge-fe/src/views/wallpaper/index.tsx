import React, { useEffect, useMemo, useRef, useState } from 'react'
import Header from '@/app/components/header'
import { Loading, Toast } from '@youknown/react-ui/src'
import WallpaperFilter, { WallpaperQuery } from './components/wallpaper-filter'
import { useFetch, useIntersection } from '@youknown/react-hook/src'
import { search_wallpapers, Wallpaper } from '@/api'
import { cls } from '@youknown/utils/src'
import WallpaperCard from './components/wallpaper-card'

const PAGE_SIZE = 24

export default function Wallpaper() {
	const [params, set_params] = useState<WallpaperQuery>()
	const [page, set_page] = useState(1)

	const search_params = useMemo(() => {
		if (!params || !page) {
			return
		}
		return {
			q: params.keywords,
			ai_art_filter: params.ai_art_filter,
			categories: '010',
			purity: '010',
			atleast: params.atleast,
			ratios: params.ratios,
			sorting: params.sorting,
			topRange: params.topRange,
			order: params.order,
			page: page
		}
	}, [page, params])

	const [is_pull_end, set_pull_end] = useState(false)
	const [wallpapers, set_wallpapers] = useState<Wallpaper[]>([])
	const { run: do_search } = useFetch(search_wallpapers, {
		initialData: [],
		manual: true,
		ready: !!search_params,
		params: [search_params!],
		onSuccess(res) {
			if (res.length < PAGE_SIZE) set_pull_end(true)
			set_page(p => p + 1)
			set_wallpapers(p => [...p, ...res])
		},
		onError(err) {
			console.error('err: ', err.stack)
			Toast.show({ title: '服务异常，请稍后再试' })
		}
	})

	const reset_wallpapers = () => {
		set_wallpapers([])
		set_page(1)
		set_pull_end(false)
	}

	const loading_ref = useRef<HTMLDivElement>(null)
	const is_intersecting = useIntersection(loading_ref)
	useEffect(() => {
		if (is_intersecting && !is_pull_end) {
			do_search()
		}
	}, [do_search, is_intersecting, is_pull_end])

	const wallpaper_list = (
		<div className={cls('grid gap-16px items-center justify-center', 'grid-cols-[repeat(auto-fill,240px)]')}>
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
					search={() => {
						reset_wallpapers()
						do_search()
					}}
					on_query_change={set_params}
				/>
			</div>
			<div className="p-[0_32px]">
				<div className="m-t-32px min-h-20vh">{wallpaper_list}</div>

				{is_pull_end ? (
					<div
						className={cls(
							'relative flex justify-center items-center h-80px',
							'after:absolute after:content-none after:w-240px after:b-b-1 after:b-bd-line'
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
