import { useState } from 'react'
import { RiFilter3Fill } from 'react-icons/ri'
import { TbChevronDown, TbSearch } from 'react-icons/tb'

import { useBoolean, useCreation, useEvent, useMount, useUpdate } from '@youknown/react-hook/src'
import { Button, Form, Input, Motion, Select, Space } from '@youknown/react-ui/src'
import { cls, microDefer, storage } from '@youknown/utils/src'

export interface filterState {
	ai_art_filter: 0 | 1
	categories: (1 | 2 | 3)[]
	purity: (1 | 2)[]
	atleast: string
	ratios: string
	sorting: string
	topRange: string
	order: string
}

export type WallpaperQuery = Omit<filterState, 'categories' | 'purity'> & {
	keywords: string
	categories: string
	purity: string
}

interface WallpaperFilerProps {
	loading: boolean
	on_query_change: (query: WallpaperQuery) => void
	search: (query: WallpaperQuery) => void
	reset: () => void
}

const FILTER_STATE_KEY = 'wallpaper_filter_state'
const FILTER_KEYWORDS_KEY = 'wallpaper_filter_keywords'

export default function WallpaperFilter(props: WallpaperFilerProps) {
	const { loading, on_query_change, search, reset } = props
	const update = useUpdate()
	const [filter_open, { setReverse: toggle_filter }] = useBoolean(true)
	const session_keywords = useCreation(() => storage.session.get(FILTER_KEYWORDS_KEY))
	const [keywords, set_keywords] = useState(session_keywords ?? '')
	const session_filter_state = useCreation(() => storage.session.get<filterState>(FILTER_STATE_KEY))

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
			search(get_format_query())
		},
		onStateChange(org) {
			change_query()
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

	const get_format_query = (): WallpaperQuery => {
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
		return {
			...state,
			keywords,
			categories,
			purity
		}
	}

	const change_query = useEvent(() => {
		on_query_change(get_format_query())
	})

	useMount(() => {
		change_query()
	})

	const { sorting } = form.getState()
	const at_least_options = [
		{
			label: '分辨率不限',
			value: '0x0'
		},
		{
			label: '至少 1920x1080',
			value: '1920x1080'
		},
		{
			label: '至少 2560x1400',
			value: '2560x1400'
		},
		{
			label: '至少 3840x2160',
			value: '3840x2160'
		},
		{
			label: '至少 2560x1080',
			value: '2560x1080'
		},
		{
			label: '至少 3440x1440',
			value: '3440x1440'
		},
		{
			label: '至少 5120x2160',
			value: '5120x2160'
		},
		{
			label: '至少 1080x2340',
			value: '1080x2340'
		},
		{
			label: '至少 1284x2778',
			value: '1284x2778'
		},
		{
			label: '至少 1920x1440',
			value: '1920x1440'
		},
		{
			label: '至少 2560x1920',
			value: '2560x1920'
		},
		{
			label: '至少 3840x2880',
			value: '3840x2880'
		}
	]

	return (
		<>
			<div className="flex flex-row-reverse ml-16px mr-16px">
				<Space>
					<Input
						prefix={<TbSearch />}
						placeholder="关键词"
						allowClear
						value={keywords}
						onChange={val => {
							storage.session.set(FILTER_KEYWORDS_KEY, val)
							set_keywords(val)
							microDefer(() => {
								change_query()
							})
						}}
						onEnter={() => {
							search(get_format_query())
						}}
					/>
					<Button prefixIcon={<RiFilter3Fill className="text-16px" />} onClick={toggle_filter}>
						<div className="flex items-center">
							筛选器
							<TbChevronDown
								className={cls('ml-16px transition-transform', filter_open && 'rotate-180deg')}
							/>
						</div>
					</Button>
				</Space>
			</div>
			<Motion.Collapse in={filter_open}>
				<div className="m-16px p-32px b-1 b-solid b-bd-line b-rd-radius-m bg-bg-2 shadow-shadow-l">
					<Form form={form} layout="inline">
						<Form.Field label="ai_art_filter">
							<Select
								className="w-240px!"
								options={[
									{
										label: '含AI作品',
										value: 0
									},
									{
										label: '不含AI作品',
										value: 1
									}
								]}
							/>
						</Form.Field>

						<Form.Field label="categories">
							<Select
								className="w-240px!"
								multiple
								options={[
									{
										label: '寻常',
										value: 1
									},
									{
										label: '二次元',
										value: 2
									},
									{
										label: '人物',
										value: 3
									}
								]}
							/>
						</Form.Field>

						<Form.Field label="purity">
							<Select
								className="w-240px!"
								multiple
								options={[
									{
										label: 'SFW',
										value: 1
									},
									{
										label: 'NSFW',
										value: 2
									}
								]}
							/>
						</Form.Field>

						<div className="w-100%"></div>

						<Form.Field label="ratios">
							<Select
								className="w-240px!"
								options={[
									{
										label: '宽高比不限',
										value: 'landscape'
									},
									{
										label: '16:9',
										value: '16x9'
									},
									{
										label: '21:9',
										value: '21x9'
									},
									{
										label: '9:19',
										value: '9x19'
									},
									{
										label: '4:3',
										value: '4x3'
									}
								]}
							/>
						</Form.Field>

						<Form.Field label="atleast">
							<Select className="w-240px!" options={at_least_options} />
						</Form.Field>

						<div className="w-100%"></div>

						<Form.Field label="sorting">
							<Select
								className="w-240px!"
								options={[
									{
										label: '排行',
										value: 'toplist'
									},
									{
										label: '访问量',
										value: 'views'
									},
									{
										label: '相关程度',
										value: 'relevance'
									},
									{
										label: '最新',
										value: 'date_added'
									},
									{
										label: '随机',
										value: 'random'
									}
								]}
							/>
						</Form.Field>

						<Form.Field label="order">
							<Select
								className="w-240px!"
								options={[
									{
										label: '降序',
										value: 'desc'
									},
									{
										label: '升序',
										value: 'asc'
									}
								]}
							/>
						</Form.Field>

						{sorting === 'toplist' && (
							<Form.Field label="topRange">
								<Select
									className="w-240px!"
									options={[
										{
											label: '昨天',
											value: '1d'
										},
										{
											label: '上周',
											value: '1w'
										},
										{
											label: '上个月',
											value: '1M'
										},
										{
											label: '近三个月',
											value: '3M'
										},
										{
											label: '近半年',
											value: '6M'
										},
										{
											label: '近一年',
											value: '1y'
										}
									]}
								/>
							</Form.Field>
						)}
					</Form>

					<Space size="large">
						<Button
							onClick={() => {
								form.reset()
								microDefer(() => {
									reset()
								})
							}}
						>
							全部重置
						</Button>
						<Button primary prefixIcon={<TbSearch />} loading={loading} onClick={form.submit}>
							筛选
						</Button>
					</Space>
				</div>
			</Motion.Collapse>
		</>
	)
}
