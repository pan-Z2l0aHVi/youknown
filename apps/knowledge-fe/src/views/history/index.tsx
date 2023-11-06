import { startTransition, useEffect, useState } from 'react'
import { RiHistoryFill } from 'react-icons/ri'
import { TbSearch } from 'react-icons/tb'

import Header from '@/app/components/header'
import More from '@/components/more'
import TransitionLink from '@/components/transition-link'
import { useRecordStore } from '@/stores'
import { format_time } from '@/utils'
import { Button, Dialog, Dropdown, Input, Space } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

export default function History() {
	const record_list = useRecordStore(state => state.record_list)
	const init_records = useRecordStore(state => state.init_records)
	const clear_records = useRecordStore(state => state.clear_records)
	const delete_record = useRecordStore(state => state.delete_record)

	const [search_input, set_search_input] = useState('')
	const [records_result, set_records_result] = useState<typeof record_list>([])

	useEffect(() => {
		init_records()
	}, [init_records])

	useEffect(() => {
		if (!search_input.trim()) {
			set_records_result(record_list)
		} else {
			startTransition(() => {
				const next_record_list = record_list.filter(record => {
					if (record.target.includes(search_input)) {
						return true
					}
					if (record.obj.includes(search_input)) {
						return true
					}
					return false
				})
				set_records_result(next_record_list)
			})
		}
	}, [record_list, search_input])

	const handle_clear_history = () => {
		Dialog.confirm({
			title: '要清除历史记录吗？',
			content: '一旦执行该操作，你的所有历史记录将从当前设备中清除。',
			onOk() {
				clear_records()
			},
			okDanger: true,
			okText: '清除',
			cancelText: '取消',
			closeIcon: null
		})
	}

	return (
		<>
			<Header heading="历史记录">
				<Space>
					<Input
						prefix={<TbSearch className="color-text-3" />}
						allowClear
						placeholder="搜索历史记录"
						value={search_input}
						onChange={set_search_input}
					/>
					<Button onClick={handle_clear_history}>清除历史记录</Button>
				</Space>
			</Header>

			<div className="flex justify-center p-[0_32px_32px_32px]">
				<div className="flex-1 max-w-960px">
					{records_result.map(record => {
						const timing_desc = format_time(record.creation_time.getTime())
						return (
							<div key={record.id} className="group flex hover-bg-hover rd-radius-l p-[0_16px]">
								<div className="flex items-center justify-end w-160px text-12px color-text-3 group-hover-text-text-2">
									<RiHistoryFill className="mr-4px text-14px" />
									{timing_desc}
								</div>
								<div className="group relative flex-1 flex items-center pl-32px ml-32px min-h-80px b-l-2 b-l-solid b-l-bd-line">
									<div
										className={cls(
											'absolute left--8px w-14px h-14px bg-primary rd-full b-4 b-solid b-[rgba(255,255,255,0.8)]'
										)}
									></div>
									<div className="flex-1 flex items-center text-text-2 whitespace-nowrap group-hover-text-text-1 transition-colors">
										你<span className="color-orange">{record.action}</span>了
										{record.target && (
											<>
												<TransitionLink
													className="inline-block max-w-200px truncate color-purple! hover-underline!"
													to=""
												>
													{record.target}
												</TransitionLink>
												的
											</>
										)}
										{record.obj && (
											<>
												{record.obj_type}
												<TransitionLink
													className="inline-block max-w-200px truncate color-blue! hover-underline!"
													to=""
												>
													{record.obj}
												</TransitionLink>
											</>
										)}
										。
									</div>
									<Dropdown
										trigger="click"
										placement="bottom-end"
										content={
											<Dropdown.Menu closeAfterItemClick>
												<Dropdown.Item
													onClick={() => {
														delete_record(record.id)
													}}
												>
													从历史记录中删除
												</Dropdown.Item>
											</Dropdown.Menu>
										}
									>
										<More className="ml-24px" />
									</Dropdown>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}
