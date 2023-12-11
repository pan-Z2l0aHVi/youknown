import { useState } from 'react'
import { RiHistoryFill } from 'react-icons/ri'

import More from '@/components/more'
import TransitionLink from '@/components/transition-link'
import { useRecordStore } from '@/stores'
import { format_time } from '@/utils'
import { RecordValue } from '@/utils/idb'
import { ContextMenu, Dropdown } from '@youknown/react-ui/src'
import { cls, QS } from '@youknown/utils/src'

interface RecordItemProps {
	record: RecordValue
}
export default function RecordItem(props: RecordItemProps) {
	const { record } = props
	const delete_record = useRecordStore(state => state.delete_record)
	const [more_open, set_more_open] = useState(false)
	const timing_desc = format_time(record.creation_time.getTime())
	const target_user_center_url = QS.stringify({
		base: '/user-center',
		query: {
			target_user_id: record.target_id
		}
	})
	const feed_url = QS.stringify({
		base: '/browse/feed-detail',
		query: {
			feed_id: record.obj_id
		}
	})

	const ctx_menu = ContextMenu.useContextMenu()
	const get_dropdown_menu = (is_context_menu = false) => {
		return (
			<Dropdown.Menu closeAfterItemClick closeDropdown={is_context_menu ? ctx_menu.closeContextMenu : undefined}>
				<Dropdown.Item
					onClick={() => {
						delete_record(record.id)
					}}
				>
					从历史记录中删除
				</Dropdown.Item>
			</Dropdown.Menu>
		)
	}

	return (
		<>
			<div
				key={record.id}
				className="group flex [@media(hover:hover)]-hover-bg-hover rd-radius-l p-[0_16px]"
				onContextMenu={ctx_menu.onContextMenu}
			>
				<div className="flex items-center justify-end w-160px text-12px color-text-3 [@media(hover:hover)]-group-hover-text-text-2">
					<RiHistoryFill className="mr-4px text-14px" />
					{timing_desc}
				</div>
				<div className="group relative flex-1 flex items-center pl-32px ml-32px min-h-80px b-l-2 b-l-solid b-l-bd-line">
					<div
						className={cls(
							'absolute left--8px w-14px h-14px bg-primary rd-full b-4 b-solid b-[rgba(255,255,255,0.8)]'
						)}
					></div>
					<div className="flex-1 flex items-center text-text-2 whitespace-nowrap [@media(hover:hover)]-group-hover-text-text-1 transition-colors">
						你<span className="color-orange">{record.action}</span>了
						{record.target && (
							<>
								<TransitionLink
									className="inline-block max-w-200px truncate color-purple! [@media(hover:hover)]-hover-underline!"
									to={target_user_center_url}
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
									className="inline-block max-w-200px truncate color-blue! [@media(hover:hover)]-hover-underline!"
									to={feed_url}
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
						content={get_dropdown_menu()}
						onOpenChange={set_more_open}
					>
						<More className="ml-24px" active={more_open} />
					</Dropdown>
				</div>
			</div>

			<ContextMenu {...ctx_menu.contextMenuProps}>{get_dropdown_menu(true)}</ContextMenu>
		</>
	)
}
