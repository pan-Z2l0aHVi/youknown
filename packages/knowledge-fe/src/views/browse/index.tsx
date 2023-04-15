import BackTop from '@/app/components/back-top'
import Header from '@/app/components/header'
import { useBoolean } from '@youknown/react-hook/src'
import { Card, Input, List, Modal, Tabs } from '@youknown/react-ui/src'
import React, { useState } from 'react'
import { TbSearch } from 'react-icons/tb'
import FeedList from './components/feed-list'

export default function Browse() {
	const [search_modal_open, { setTrue: show_search_modal, setFalse: hide_search_modal }] = useBoolean(false)
	const [feed_tab, set_feed_tab] = useState<string>('0')
	const result = []

	return (
		<>
			<Header heading="浏览" sticky bordered>
				<Tabs
					type="segment"
					value={feed_tab}
					onChange={set_feed_tab}
					tabList={[
						{ key: '0', name: '最新' },
						{ key: '1', name: '关注' }
					]}
				/>

				<Input
					className="w-240px!"
					prefix={<TbSearch />}
					placeholder="搜动态"
					outline={false}
					onFocus={show_search_modal}
				/>
			</Header>

			<BackTop />

			<Modal open={search_modal_open} onCancel={hide_search_modal} unmountOnExit alignCenter={false}>
				<Card className="p-0 bg-bg-2! w-560px! m-t-160px" shadow>
					<Input
						className="w-100%! text-16px"
						autoFocus
						size="large"
						placeholder="搜一搜"
						prefix={<TbSearch className="text-16px mr-4px ml-4px" />}
						allowClear
					/>

					{result.length > 0 ? (
						<List size="large" className="overflow-y-auto overflow-y-overlay max-h-400px mt-24px">
							<List.Item>11111</List.Item>
							<List.Item>11111</List.Item>
							<List.Item>11111</List.Item>
						</List>
					) : null}
				</Card>
			</Modal>

			<div className="flex justify-center p-32px">
				<FeedList feed_tab={Number(feed_tab)} />
			</div>
		</>
	)
}
