import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbSearch } from 'react-icons/tb'

import Header from '@/app/components/header'
import { useUIStore, useUserStore } from '@/stores'
import { useBoolean } from '@youknown/react-hook/src'
import { Input, Overlay, Tabs } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import FeedList, { FEED_TAB } from './components/feed-list'
import Searcher from './components/searcher'

export default function Browse() {
	const { t } = useTranslation()
	const has_login = useUserStore(state => state.has_login)
	const is_dark_theme = useUIStore(state => state.is_dark_theme)
	const [search_modal_open, { setTrue: show_search_modal, setFalse: hide_search_modal }] = useBoolean(false)
	const [feed_tab, set_feed_tab] = useState<FEED_TAB>(FEED_TAB.LATEST)

	return (
		<>
			<Header heading={<div className="w-152px">{t('page.title.browse')}</div>}>
				<Tabs
					className={cls(!has_login && 'display-none!')}
					type="segment"
					value={feed_tab}
					onChange={set_feed_tab}
					tabList={[
						{ key: FEED_TAB.LATEST, name: t('latest') },
						{ key: FEED_TAB.MINE, name: t('mine') }
					]}
				/>

				<Input
					className="w-200px!"
					prefix={<TbSearch className="color-text-3" />}
					placeholder={t('placeholder.search')}
					outline={false}
					onFocus={show_search_modal}
				/>
			</Header>

			<Overlay
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
			</Overlay>

			<div className="flex justify-center p-32px">
				<FeedList feed_tab={feed_tab} />
			</div>
		</>
	)
}
