import { useEffect } from 'react'
import Header from '@/app/components/header'
import { Button, Input, Space } from '@youknown/react-ui/src'
import { TbSearch } from 'react-icons/tb'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { clear_records, init_records } from '@/store/record'
import { cls } from '@youknown/utils/src'
import dayjs from 'dayjs'
import TransitionLink from '@/components/transition-link'

export default function History() {
	const record_list = useAppSelector(state => state.record.record_list)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(init_records())
	}, [dispatch])

	const handle_delete_records = () => {
		dispatch(clear_records())
	}

	return (
		<>
			<Header heading="足迹">
				<Space>
					<Input prefix={<TbSearch />} placeholder="搜记录" />
					<Button onClick={handle_delete_records}>清空历史</Button>
				</Space>
			</Header>

			<div className="flex justify-center p-32px">
				<div className="flex-1 max-w-960px">
					{record_list.map(record => {
						let timing_desc: string
						const dayDiff = dayjs(record.timing).diff(dayjs(), 'day')
						const yearDiff = dayjs(record.timing).diff(dayjs(), 'year')
						if (dayDiff < 1) {
							timing_desc = '今天'
						} else if (dayDiff >= 1 && dayDiff < 2) {
							timing_desc = '昨天'
						} else if (dayDiff >= 2 && dayDiff < 3) {
							timing_desc = '前天'
						} else if (yearDiff > 1) {
							timing_desc = dayjs(record.timing).format('YYYY-MM-DD')
						} else {
							timing_desc = dayjs(record.timing).format('MM-DD')
						}
						return (
							<div className="group flex">
								<div className="w-80px m-t--4px text-text-3 group-hover-text-text-2">{timing_desc}</div>
								<div className="group relative flex p-l-32px m-l-32px h-80px b-l-2 b-l-solid b-l-bd-line group-last:b-l-transparent">
									<div
										className={cls(
											'absolute left--8px w-14px h-14px bg-primary b-rd-round b-4 b-solid b-[rgba(255,255,255,0.8)]',
											'group-hover-scale-150 transition-duration-250ms'
										)}
									></div>
									<div className="m-t--4px flex-1 text-text-2 group-hover-text-text-1">
										你{record.action}了
										{record.target && (
											<>
												<TransitionLink className="color-#40a9ff! hover-underline!" to="">
													{record.target}
												</TransitionLink>
												的
											</>
										)}
										{record.obj && (
											<>
												{record.obj_type}
												<TransitionLink className="color-#d83931! hover-underline!" to="">
													{record.obj}
												</TransitionLink>
											</>
										)}
										。
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}
