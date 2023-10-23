import { useEffect } from 'react'
import { TbSearch } from 'react-icons/tb'

import Header from '@/app/components/header'
import TransitionLink from '@/components/transition-link'
import { useRecordStore } from '@/stores'
import { format_time } from '@/utils'
import { Button, Input, Space } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { RiHistoryFill } from 'react-icons/ri'

export default function History() {
	const record_list = useRecordStore(state => state.record_list)
	const init_records = useRecordStore(state => state.init_records)
	const clear_records = useRecordStore(state => state.clear_records)

	useEffect(() => {
		init_records()
	}, [init_records])

	return (
		<>
			<Header heading="历史记录">
				<Space>
					<Input prefix={<TbSearch />} placeholder="搜记录" />
					<Button onClick={clear_records}>清空历史</Button>
				</Space>
			</Header>

			<div className="flex justify-center p-32px">
				<div className="flex-1 max-w-960px">
					{record_list.map(record => {
						const timing_desc = format_time(record.timing)
						return (
							<div key={record.id} className="group flex hover-bg-hover rd-radius-l p-[0_16px]">
								<div className="flex items-center w-80px mt--4px text-12px color-text-3 group-hover-text-text-2">
									<RiHistoryFill className="mr-4px text-14px" />
									{timing_desc}
								</div>
								<div className="group relative flex pl-32px ml-32px h-80px b-l-2 b-l-solid b-l-bd-line group-last:b-l-transparent">
									<div
										className={cls(
											'absolute left--8px w-14px h-14px bg-primary rd-full b-4 b-solid b-[rgba(255,255,255,0.8)]',
											'group-hover-scale-150 transition-duration-250ms'
										)}
									></div>
									<div className="mt--4px flex-1 text-text-2 group-hover-text-text-1">
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
