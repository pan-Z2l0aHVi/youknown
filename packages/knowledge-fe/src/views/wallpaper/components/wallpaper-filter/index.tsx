import { useBoolean, useUpdate } from '@youknown/react-hook/src'
import { Button, Form, Input, Motion, Select, Space } from '@youknown/react-ui/src'
import React, { useCallback, useEffect, useState } from 'react'
import { RiFilter3Fill } from 'react-icons/ri'
import { TbChevronDown, TbSearch } from 'react-icons/tb'
import { cls, storage } from '@youknown/utils/src'

export interface filterParams {
	ai_art_filter: number
	categories: number[]
	purity: number[]
	atleast: string
	ratios: string
	sorting: string
	topRange: string
	order: string
}

export type WallpaperQuery = filterParams & { keywords: string }

interface WallpaperFilerProps {
	on_query_change: (query: WallpaperQuery) => void
	search: (query: WallpaperQuery) => void
}

export default function WallpaperFilter(props: WallpaperFilerProps) {
	const { search, on_query_change } = props
	const update = useUpdate()
	const [filter_open, { setReverse: toggle_filter }] = useBoolean(false)
	const [keywords, set_keywords] = useState('')

	const form = Form.useForm<filterParams>({
		defaultState: {
			ai_art_filter: 0,
			categories: [100, 101, 111],
			purity: [100],
			atleast: '0x0',
			ratios: 'landscape',
			sorting: 'toplist',
			topRange: '1M',
			order: 'desc'
		},
		onFulfilled(state) {
			console.log('state: ', state)
			search(getQuery())
		},
		onStateChange(org) {
			console.log('org.label: ', org.label, form.getState()[org.label])
			on_query_change(getQuery())
			switch (org.label) {
				case 'sorting':
					update()
					break

				case 'ratios':
					form.setState({ atleast: '0x0' })
					update()
					break

				default:
					break
			}
			storage.session.set('wallpaper_filter_params', getQuery())
		}
	})

	const getQuery = useCallback((): WallpaperQuery => {
		return {
			keywords,
			...form.getState()
		}
	}, [form, keywords])

	useEffect(() => {
		const local_filter_params = storage.session.get<WallpaperQuery>('wallpaper_filter_params')
		if (local_filter_params) {
			form.setState(local_filter_params)
		} else {
			on_query_change(getQuery())
		}
	}, [form, getQuery, on_query_change])

	const { sorting, ratios } = form.getState()
	const at_least_options = [
		{
			label: '分辨率不限',
			value: '0x0'
		}
	]
	switch (ratios) {
		case '16x9':
			at_least_options.push(
				{
					label: '不低于1920x1080',
					value: '1920x1080'
				},
				{
					label: '不低于2560x1400',
					value: '2560x1400'
				},
				{
					label: '不低于3840x2160',
					value: '3840x2160'
				}
			)
			break

		case '21x9':
			at_least_options.push(
				{
					label: '不低于2560x1080',
					value: '2560x1080'
				},
				{
					label: '不低于3440x1440',
					value: '3440x1440'
				},
				{
					label: '不低于5120x2160',
					value: '5120x2160'
				}
			)
			break

		case '9x19':
			at_least_options.push(
				{
					label: '不低于1080x2340',
					value: '1080x2340'
				},
				{
					label: '不低于1284x2778',
					value: '1284x2778'
				}
			)
			break

		case '4x3':
			at_least_options.push(
				{
					label: '不低于1920x1440',
					value: '1920x1440'
				},
				{
					label: '不低于2560x1920',
					value: '2560x1920'
				},
				{
					label: '不低于3840x2880',
					value: '3840x2880'
				}
			)
			break

		default:
			break
	}

	return (
		<>
			<div className="flex flex-row-reverse m-l-16px m-r-16px">
				<Space>
					<Input
						prefix={<TbSearch />}
						placeholder="搜索"
						allowClear
						value={keywords}
						onChange={val => set_keywords(val as string)}
					/>
					<Button icon={<RiFilter3Fill className="text-16px" />} onClick={toggle_filter}>
						<div className="flex items-center">
							筛选器
							<TbChevronDown
								className={cls('m-l-16px transition-transform', filter_open && 'rotate-180deg')}
							/>
						</div>
					</Button>
				</Space>
			</div>
			<Motion.Collapse in={filter_open}>
				<div className="m-16px p-32px b-1 b-bd-line b-rd-radius-m bg-bg-2 shadow-shadow-l">
					<Form form={form} layout="inline">
						<Form.Field label="ai_art_filter">
							<Select
								className="w-240px!"
								options={[
									{
										label: '不含AI作品',
										value: 0
									},
									{
										label: '含AI作品',
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
										value: 100
									},
									{
										label: '二次元',
										value: 101
									},
									{
										label: '人物',
										value: 111
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
										value: 100
									},
									{
										label: 'NSFW',
										value: 110
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
										label: '榜单',
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
						<Button onClick={form.reset}>全部重置</Button>
						<Button primary icon={<TbSearch />} onClick={form.submit}>
							筛选
						</Button>
					</Space>
				</div>
			</Motion.Collapse>
		</>
	)
}
