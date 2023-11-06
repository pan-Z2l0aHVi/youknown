import { useEffect, useRef, useState } from 'react'

import { search_wallpapers } from '@/apis/wallpaper'
import Header from '@/app/components/header'
import { useCreation, useEvent, useInfinity, useUpdate } from '@youknown/react-hook/src'
import { Form, Loading } from '@youknown/react-ui/src'
import { cls, macroDefer, storage } from '@youknown/utils/src'

import WallpaperCard from './components/wallpaper-card'
import WallpaperFilter, { filterState, ImperativeHandle, WallpaperQuery } from './components/wallpaper-filter'

const FILTER_STATE_KEY = 'wallpaper_filter_state'
const FILTER_KEYWORDS_KEY = 'wallpaper_filter_keywords'

export default function Wallpapers() {
	const update = useUpdate()
	const loading_ref = useRef<HTMLDivElement>(null)
	const wrapper_ref = useRef<HTMLDivElement>(null)

	const session_keywords = useCreation(() => storage.session.get(FILTER_KEYWORDS_KEY))
	const [keywords, set_keywords] = useState(session_keywords ?? '')
	const session_filter_state = useCreation(() => storage.session.get<filterState>(FILTER_STATE_KEY))
	const keywords_filter_ref = useRef<ImperativeHandle>(null)

	const [params, set_params] = useState<WallpaperQuery>()

	const form = Form.useForm<filterState>({
		defaultState: session_filter_state ?? {
			ai_art_filter: 0,
			categories: [1, 2, 3],
			purity: [1],
			atleast: '0x0',
			ratios: 'landscape',
			sorting: 'toplist',
			topRange: '1M',
			order: 'desc'
		},
		onFulfilled(state) {
			storage.session.set(FILTER_STATE_KEY, state)
			reload_wallpapers()
		},
		onStateChange(org) {
			update_params()

			switch (org.label) {
				case 'sorting':
					update()
					break

				case 'ratios':
					update()
					break

				default:
					break
			}
		}
	})

	const update_params = useEvent(() => {
		const state = form.getState()
		let categories = '000'
		let purity = '000'
		if (state.categories.includes(1)) {
			categories = '1' + categories.slice(1)
		}
		if (state.categories.includes(2)) {
			categories = categories.slice(0, 1) + '1' + categories.slice(2)
		}
		if (state.categories.includes(3)) {
			categories = categories.slice(0, 2) + '1'
		}
		if (state.purity.includes(1)) {
			purity = '1' + purity.slice(1)
		}
		if (state.purity.includes(2)) {
			purity = purity.slice(0, 1) + '1' + purity.slice(2)
		}
		set_params({
			...state,
			keywords,
			categories,
			purity
		})
	})

	useEffect(() => {
		update_params()
	}, [update_params])

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
		return search_wallpapers(search_params)
	}
	const {
		page,
		data: wallpapers,
		loading,
		noMore: no_more,
		reload: reload_wallpapers
	} = useInfinity(wallpaper_fetcher, {
		initialPageSize: 48,
		ready: !!params,
		target: loading_ref,
		observerInit: {
			root: null,
			rootMargin: '0px 0px 280px 0px'
		}
	})

	const wallpaper_list = (
		<div
			ref={wrapper_ref}
			className={cls('grid gap-16px items-center justify-center', 'grid-cols-[repeat(auto-fill,320px)]')}
		>
			{wallpapers.map(wallpaper => (
				<WallpaperCard
					key={wallpaper.id}
					wallpaper={wallpaper}
					search_similar={() => {
						set_keywords(`like:${wallpaper.id}`)
						window.scrollTo({
							top: 0,
							left: 0,
							behavior: 'instant'
						})
						keywords_filter_ref.current?.focus_keywords_input()
						macroDefer(() => {
							update_params()
							macroDefer(() => {
								reload_wallpapers()
							})
						})
					}}
				/>
			))}
		</div>
	)

	return (
		<>
			<Header heading="壁纸"></Header>

			<div className="p-[16px_16px_0]">
				<WallpaperFilter
					ref={keywords_filter_ref}
					form={form}
					keywords={keywords}
					on_keywords_input={val => {
						storage.session.set(FILTER_KEYWORDS_KEY, val)
						set_keywords(val)
						macroDefer(() => {
							update_params()
						})
					}}
					loading={loading}
					on_search={reload_wallpapers}
					on_reset={reload_wallpapers}
				/>
			</div>
			<div className="p-[0_32px]">
				<div className="mt-32px min-h-20vh">{wallpaper_list}</div>

				{no_more ? (
					<div
						className={cls(
							'relative flex justify-center items-center h-80px',
							'after:absolute after:content-empty after:w-240px after:b-b-1 after:b-b-solid after:b-bd-line'
						)}
					>
						<div className="z-1 pl-8px pr-8px bg-bg-0 color-text-2">没有更多内容了</div>
					</div>
				) : (
					<div ref={loading_ref} className="flex justify-center items-center h-80px">
						<Loading spinning className="mr-8px" />
						<span className="color-text-2">加载中...</span>
					</div>
				)}
			</div>
		</>
	)
}
