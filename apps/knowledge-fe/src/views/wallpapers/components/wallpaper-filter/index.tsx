import { forwardRef, Ref, useImperativeHandle, useRef } from 'react'
import { RiFilter3Fill } from 'react-icons/ri'
import { TbChevronDown, TbSearch } from 'react-icons/tb'

import { FormInstance, useBoolean } from '@youknown/react-hook/src'
import { Button, Form, Input, Motion, Select, Space } from '@youknown/react-ui/src'
import { cls, macroDefer, storage } from '@youknown/utils/src'

export const enum SWITCH {
	ON = 1,
	OFF = 0
}
export const enum CATE {
	GENERAL = 1,
	ANIME = 2,
	PEOPLE = 3
}
export const enum PURITY {
	SFW = 1,
	SKETCHY = 2,
	NSFW = 3
}
export const enum ORDER {
	DESC = 'desc',
	ASC = 'asc'
}
export interface filterState {
	ai_art_filter: SWITCH
	categories: CATE[]
	purity: PURITY[]
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
	form: FormInstance<filterState>
	loading: boolean
	keywords: string
	on_keywords_input: (keywords: string) => void
	on_search: (keywords: string) => void
	on_reset: () => void
}
export interface ImperativeHandle {
	focus_keywords_input: () => void
}

function WallpaperFilter(props: WallpaperFilerProps, ref: Ref<ImperativeHandle>) {
	const { form, keywords, on_keywords_input, loading, on_search, on_reset } = props
	const [filter_open, { setReverse: toggle_filter }] = useBoolean(true)
	const keywords_input_ref = useRef<HTMLInputElement>(null)
	useImperativeHandle(ref, () => ({
		focus_keywords_input() {
			keywords_input_ref.current?.focus()
		}
	}))

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
			label: '至少 2560x1440',
			value: '2560x1440'
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

	const purity_options = [
		{
			label: 'SFW',
			value: PURITY.SFW
		},
		{
			label: 'SKETCHY',
			value: PURITY.SKETCHY
		}
	]
	if (storage.local.get('nsfw')) {
		purity_options.push({
			label: 'NSFW',
			value: PURITY.NSFW
		})
	}

	return (
		<>
			<div className="flex flex-row-reverse ml-16px mr-16px">
				<Space>
					<Input
						ref={keywords_input_ref}
						prefix={<TbSearch className="color-text-3" />}
						placeholder="关键词"
						allowClear
						value={keywords}
						onChange={on_keywords_input}
						onEnter={on_search}
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
				<div className="m-16px p-32px b-1 b-solid b-bd-line rd-radius-m bg-bg-2 shadow-shadow-l">
					<Form form={form} layout="inline">
						<Form.Field label="ai_art_filter">
							<Select
								className="w-240px!"
								options={[
									{
										label: '含AI作品',
										value: SWITCH.OFF
									},
									{
										label: '不含AI作品',
										value: SWITCH.ON
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
										value: CATE.GENERAL
									},
									{
										label: '二次元',
										value: CATE.ANIME
									},
									{
										label: '人物',
										value: CATE.PEOPLE
									}
								]}
							/>
						</Form.Field>

						<Form.Field label="purity">
							<Select className="w-240px!" multiple options={purity_options} />
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
										label: '排行榜',
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

						{sorting === 'toplist' ? (
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
						) : (
							<Form.Field label="order">
								<Select
									className="w-240px!"
									options={[
										{
											label: '降序',
											value: ORDER.DESC
										},
										{
											label: '升序',
											value: ORDER.ASC
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
								on_keywords_input('')
								macroDefer(() => {
									on_reset()
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

export default forwardRef(WallpaperFilter)
