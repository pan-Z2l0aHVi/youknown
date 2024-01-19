import { useEffect, useState } from 'react'

import { Feed, praise_feed } from '@/apis/feed'
import { useModalStore, useRecordStore, useUserStore } from '@/stores'
import { useFetch } from '@youknown/react-hook/src'

export default function useFeedPraise(feed: Feed) {
	const { id, likes } = feed
	const has_login = useUserStore(state => state.has_login)
	const profile = useUserStore(state => state.profile)
	const recording = useRecordStore(state => state.recording)
	const open_login_modal = useModalStore(state => state.open_login_modal)

	const [praised, set_praised] = useState(false)
	useEffect(() => {
		if (profile) {
			const is_liked = likes.some(like => like.user_id === profile.user_id)
			set_praised(is_liked)
		} else {
			set_praised(false)
		}
	}, [likes, profile])

	const [praise_list, set_praise_list] = useState(likes)
	useEffect(() => {
		set_praise_list(likes)
	}, [likes])

	const record_praise_feed = (action: string) => {
		recording({
			action,
			target: feed.creator.nickname,
			target_id: feed.creator_id,
			obj_type: '公开文档',
			obj: feed.subject.title,
			obj_id: id
		})
	}

	const increase_praise = () => {
		if (!profile) {
			return
		}
		set_praised(true)
		set_praise_list(p => [
			{
				user_id: profile.user_id,
				nickname: profile.nickname,
				avatar: profile.avatar,
				creation_time: new Date().toISOString()
			},
			...p
		])
	}

	const reduce_praise = () => {
		if (!profile) {
			return
		}
		set_praised(false)
		set_praise_list(p => p.filter(item => item.user_id !== profile.user_id))
	}

	const { run: do_praise } = useFetch(praise_feed, {
		manual: true,
		params: [
			{
				event: praised ? 'unlike' : 'like',
				feed_id: id
			}
		],
		async onBefore([{ event }]) {
			if (event === 'like') {
				increase_praise()
			} else if (event === 'unlike') {
				reduce_praise()
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
				reduce_praise()
			} else if (event === 'unlike') {
				increase_praise()
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

	return {
		praise_list,
		praise_count: praise_list.length,
		praised,
		toggle_praise
	}
}
