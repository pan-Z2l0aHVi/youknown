import { Fragment, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { search_wallpapers, SearchWallpapersParams, Wallpaper } from '@/apis/wallpaper'
import Header from '@/app/components/header'
import TabBar from '@/app/components/tab-bar'
import MoreLoading from '@/components/more-loading'
import NoMore from '@/components/no-more'
import { useUIStore } from '@/stores'
import { useCreation, useEvent, useInfinity, useMount, useUnmount, useUpdate } from '@youknown/react-hook/src'
import { Divider, Form } from '@youknown/react-ui/src'
import { macroDefer, storage } from '@youknown/utils/src'

import WallpaperCard from './components/wallpaper-card'
import WallpaperFilter, {
	CATE,
	filterState,
	ImperativeHandle,
	ORDER,
	PURITY,
	SWITCH,
	WallpaperQuery
} from './components/wallpaper-filter'

const FILTER_STATE_KEY = 'wallpaper_filter_state'
const FILTER_KEYWORDS_KEY = 'wallpaper_filter_keywords'
const WALLPAPERS_KEY = 'wallpapers'
const WALLPAPER_PAGE_KEY = 'wallpaper_page'
const WALLPAPER_SCROLL_Y_KEY = 'wallpaper_scroll_y'
const PAGE_SIZE = 48

export default function Wallpapers() {
	const { t } = useTranslation()
	const [search_params] = useSearchParams()
	const is_mobile = useUIStore(state => state.is_mobile)
	const update = useUpdate()
	const loading_ref = useRef<HTMLDivElement>(null)
	const wrapper_ref = useRef<HTMLDivElement>(null)

	const default_keywords = useCreation(
		() => search_params.get('keywords') ?? storage.session.get(FILTER_KEYWORDS_KEY) ?? ''
	)
	const [keywords, set_keywords] = useState(default_keywords)
	const session_filter_state = useCreation(() => storage.session.get<filterState>(FILTER_STATE_KEY))
	const keywords_filter_ref = useRef<ImperativeHandle>(null)
	const [params, set_params] = useState<WallpaperQuery>()

	const form = Form.useForm<filterState>({
		defaultState: {
			ai_art_filter: SWITCH.OFF,
			categories: [CATE.GENERAL, CATE.ANIME, CATE.PEOPLE],
			purity: [PURITY.SFW],
			atleast: '0x0',
			ratios: '',
			sorting: 'views',
			topRange: '1M',
			order: ORDER.DESC
		},
		onFulfilled() {
			reload_wallpapers()
		},
		onStateChange(org) {
			storage.session.set(FILTER_STATE_KEY, form.getState())
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
	useEffect(() => {
		if (session_filter_state) {
			form.setState(session_filter_state)
		}
	}, [form, session_filter_state])

	const update_params = useEvent(() => {
		const state = form.getState()
		const categories_arr = Array(3).fill(SWITCH.OFF)
		const purity_arr = Array(3).fill(SWITCH.OFF)
		if (state.categories.includes(CATE.GENERAL)) {
			categories_arr[0] = SWITCH.ON
		}
		if (state.categories.includes(CATE.ANIME)) {
			categories_arr[1] = SWITCH.ON
		}
		if (state.categories.includes(CATE.PEOPLE)) {
			categories_arr[2] = SWITCH.ON
		}
		if (state.purity.includes(PURITY.SFW)) {
			purity_arr[0] = SWITCH.ON
		}
		if (state.purity.includes(PURITY.SKETCHY)) {
			purity_arr[1] = SWITCH.ON
		}
		if (state.purity.includes(PURITY.NSFW)) {
			purity_arr[2] = SWITCH.ON
		}
		set_params({
			...state,
			keywords,
			categories: categories_arr.join(''),
			purity: purity_arr.join('')
		})
	})

	useEffect(() => {
		update_params()
	}, [update_params])

	const wallpapers_cache = useCreation(() => storage.session.get<Wallpaper[]>(WALLPAPERS_KEY) ?? [])
	const wallpaper_page_cache = useCreation(() => storage.session.get<number>(WALLPAPER_PAGE_KEY) ?? 1)

	const check_form_valid = async () => {
		const explains_map = await form.validate()
		return !Object.values(explains_map).flat().length
	}

	const wallpaper_fetcher = async () => {
		const { keywords, ai_art_filter, atleast, ratios, sorting, topRange, order, categories, purity } = params!
		const search_params: SearchWallpapersParams = {
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
		if (keywords) {
			search_params.q = keywords
		}
		return search_wallpapers(search_params)
	}
	const {
		page,
		data: wallpapers,
		loading,
		noMore: no_more,
		reload,
		changePage: change_page
	} = useInfinity(wallpaper_fetcher, {
		initialData: wallpapers_cache,
		initialPage: wallpaper_page_cache,
		initialPageSize: PAGE_SIZE,
		ready: !!params,
		target: loading_ref,
		observerInit: {
			root: null,
			rootMargin: '0px 0px 280px 0px'
		},
		async onBefore() {
			const is_valid = await check_form_valid()
			return !is_valid
		}
	})

	const reload_wallpapers = useEvent(async () => {
		const is_valid = await check_form_valid()
		if (is_valid) {
			change_page(0)
			macroDefer(reload)
		}
	})

	useEffect(() => {
		reload_wallpapers()
	}, [reload_wallpapers])

	// 从缓存中恢复之前的浏览状态
	// 包括：页码、壁纸数据、滚动条位置
	const restore_scroll_y = () => {
		const scroll_y_cache = storage.session.get<number>(WALLPAPER_SCROLL_Y_KEY)
		if (scroll_y_cache) {
			storage.session.remove(WALLPAPER_SCROLL_Y_KEY)
			window.scrollTo({
				top: scroll_y_cache,
				behavior: 'instant'
			})
		}
	}
	useMount(() => {
		if (search_params.get('keywords')) {
			return
		}
		restore_scroll_y()
	})
	useUnmount(() => {
		storage.session.set(WALLPAPER_SCROLL_Y_KEY, window.scrollY)
	})
	useEffect(() => {
		storage.session.set(WALLPAPER_PAGE_KEY, page)
	}, [page])
	useEffect(() => {
		storage.session.set(WALLPAPERS_KEY, wallpapers)
	}, [wallpapers])

	const wallpaper_list = (
		<div ref={wrapper_ref} className="m--8px text-center">
			{wallpapers.map((wallpaper, index) => (
				<Fragment key={wallpaper.id}>
					<WallpaperCard wallpaper={wallpaper} />
					{(index + 1) % PAGE_SIZE === 0 && <Divider />}
				</Fragment>
			))}
		</div>
	)

	return (
		<>
			<Header heading={t('page.title.wallpapers')}></Header>

			<div className="sm:p-[16px_16px_0] <sm:p-[16px_0_0]">
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
			<div className="sm:p-[0_32px] <sm:p-[0_16px]">
				<div className="mt-32px min-h-20vh">{wallpaper_list}</div>

				{no_more ? <NoMore /> : <MoreLoading ref={loading_ref} />}
			</div>

			{is_mobile && <TabBar />}
		</>
	)
}
