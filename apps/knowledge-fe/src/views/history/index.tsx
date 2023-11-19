import { useCallback, useEffect, useState, useTransition } from 'react'
import { TbSearch } from 'react-icons/tb'

import Header from '@/app/components/header'
import { useRecordStore, useUIStore } from '@/stores'
import { useEvent } from '@youknown/react-hook/src'
import { Button, Dialog, Input, Space } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import RecordItem from './components/record-item'

export default function History() {
	const is_dark_theme = useUIStore(state => state.is_dark_theme)
	const record_list = useRecordStore(state => state.record_list)
	const clear_records = useRecordStore(state => state.clear_records)
	const [search_input, set_search_input] = useState('')
	const [records_result, set_records_result] = useState<typeof record_list>([])
	const [, start_transition] = useTransition()

	const reset_records_result = useCallback(() => {
		start_transition(() => {
			set_records_result(record_list)
		})
	}, [record_list])

	const filter_records_result = useCallback(() => {
		const next_record_list = record_list.filter(record => {
			if (record.target.includes(search_input)) {
				return true
			}
			if (record.obj.includes(search_input)) {
				return true
			}
			return false
		})
		start_transition(() => {
			set_records_result(next_record_list)
		})
	}, [record_list, search_input])

	const keywords = search_input.trim()
	useEffect(() => {
		if (keywords) {
			filter_records_result()
		} else {
			reset_records_result()
		}
	}, [filter_records_result, reset_records_result, keywords])

	const handle_search_input = useEvent((keywords: string) => {
		set_search_input(keywords)
		window.scrollTo({
			top: 0,
			behavior: 'instant'
		})
	})

	const handle_clear_history = () => {
		Dialog.confirm({
			title: '要清除历史记录吗？',
			content: '一旦执行该操作，你的所有历史记录将从当前设备中清除。',
			overlayClassName: cls(
				'backdrop-blur-xl',
				is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]'
			),
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
						placeholder="搜历史记录"
						value={search_input}
						onChange={handle_search_input}
					/>
					<Button onClick={handle_clear_history}>清除历史记录</Button>
				</Space>
			</Header>

			<div className="flex justify-center p-[0_32px_32px_32px]">
				<div className="flex-1 max-w-960px">
					{records_result.map(record => (
						<RecordItem key={record.id} record={record} />
					))}
				</div>
			</div>
		</>
	)
}
