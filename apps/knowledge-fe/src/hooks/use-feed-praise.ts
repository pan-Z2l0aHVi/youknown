import { useEffect, useState } from 'react'

import { Feed, praise_feed } from '@/apis/feed'
import { useModalStore, useRecordStore, useUserStore } from '@/stores'
import { useFetch } from '@youknown/react-hook/src'

export default function useFeedPraise(feed: Feed) {
	const { feed_id, likes, likes_count } = feed
	const has_login = useUserStore(state => state.has_login)
	const profile = useUserStore(state => state.profile)
	const recording = useRecordStore(state => state.recording)
	const open_login_modal = useModalStore(state => state.open_login_modal)

	const [praised, set_praised] = useState(false)
	useEffect(() => {
		if (profile) {
			if (likes.some(like => like.user_id === profile.user_id)) {
				set_praised(true)
			}
		}
	}, [likes, profile])
	const [praise_count, set_praise_count] = useState(likes_count)
	useEffect(() => {
		set_praise_count(likes_count)
	}, [likes_count])

	const record_praise_feed = (action: string) => {
		recording({
			action,
			target: '',
			target_id: '',
			obj_type: '公开文档',
			obj: feed.title,
			obj_id: feed_id
		})
	}
	const { run: do_praise } = useFetch(praise_feed, {
		manual: true,
		params: [
			{
				event: praised ? 'unlike' : 'like',
				feed_id
			}
		],
		onBefore([{ event }]) {
			if (event === 'like') {
				set_praised(true)
				set_praise_count(p => p + 1)
			} else if (event === 'unlike') {
				set_praised(false)
				set_praise_count(p => p - 1)
			}
		},
		onSuccess(_, [{ event }]) {
			if (event === 'like') {
				record_praise_feed('点赞')
			} else if (event === 'unlike') {
				record_praise_feed('取消点赞')
			}
		},
		onError(error, [{ event }]) {
			console.error('error: ', error)
			if (event === 'like') {
				set_praised(false)
				set_praise_count(p => p - 1)
			} else if (event === 'unlike') {
				set_praised(true)
				set_praise_count(p => p + 1)
			}
		}
	})

	const toggle_praise = () => {
		if (!has_login) {
			open_login_modal()
			return
		}
		do_praise()
	}

	return { praise_count, praised, toggle_praise }
}
