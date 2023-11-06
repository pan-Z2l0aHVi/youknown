import { useState } from 'react'
import { TbSearch } from 'react-icons/tb'

import Header from '@/app/components/header'
import { useUIStore } from '@/stores'
import { useBoolean } from '@youknown/react-hook/src'
import { Input, Modal, Tabs } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import FeedList, { FEED_TAB } from './components/feed-list'
import Searcher from './components/searcher'

export default function Browse() {
	const is_dark_theme = useUIStore(state => state.is_dark_theme)
	const [search_modal_open, { setTrue: show_search_modal, setFalse: hide_search_modal }] = useBoolean(false)
	const [feed_tab, set_feed_tab] = useState<1 | 2>(1)

	return (
		<>
			<Header heading="浏览">
				<Tabs
					type="segment"
					value={feed_tab}
					onChange={set_feed_tab}
					tabList={[
						{ key: FEED_TAB.LATEST, name: '最新' },
						{ key: FEED_TAB.MINE, name: '我的' }
					]}
				/>

				<Input
					prefix={<TbSearch className="color-text-3" />}
					placeholder="搜一搜"
					outline={false}
					onFocus={show_search_modal}
				/>
			</Header>

			<Modal
				className={cls(
					'backdrop-blur-xl',
					is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]'
				)}
				alignCenter={false}
				open={search_modal_open}
				onCancel={hide_search_modal}
				unmountOnExit
			>
				<Searcher />
			</Modal>

			<div className="flex justify-center p-32px">
				<FeedList feed_tab={feed_tab} />
			</div>
		</>
	)
}
