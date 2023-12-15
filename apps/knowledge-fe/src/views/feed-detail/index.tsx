import parse from 'html-react-parser'
import { useEffect, useRef, useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { LuHeart, LuHeartOff } from 'react-icons/lu'
import { useSearchParams } from 'react-router-dom'

import { Feed, get_feed_detail } from '@/apis/feed'
import { cancel_collect_feed, collect_feed } from '@/apis/user'
import Header from '@/app/components/header'
import useTransitionNavigate from '@/hooks/use-transition-navigate'
import { useModalStore, useRecordStore, useUserStore } from '@/stores'
import { with_api } from '@/utils/request'
import { useFetch } from '@youknown/react-hook/src'
import { Button, Image, Loading, Toast } from '@youknown/react-ui/src'
import { QS } from '@youknown/utils/src'

export default function FeedDetail() {
	const recording = useRecordStore(state => state.recording)
	const profile = useUserStore(state => state.profile)
	const has_login = useUserStore(state => state.has_login)
	const open_login_modal = useModalStore(state => state.open_login_modal)
	const navigate = useTransitionNavigate()
	const [search_params] = useSearchParams()
	const feed_id = search_params.get('feed_id') ?? ''

	const record_read_feed = (feed_info: Feed) => {
		recording({
			action: '阅读',
			target: feed_info.author_info.nickname,
			target_id: feed_info.author_id,
			obj_type: '公开文档',
			obj: feed_info.title,
			obj_id: feed_info.feed_id
		})
	}

	const {
		data: detail,
		loading,
		mutate: set_detail
	} = useFetch(get_feed_detail, {
		params: [
			{
				feed_id
			}
		],
		ready: !!feed_id,
		refreshDeps: [feed_id],
		onSuccess(data) {
			record_read_feed(data)
		}
	})

	const [collect_loading, set_collect_loading] = useState(false)
	const [cancel_collect_loading, set_cancel_collect_loading] = useState(false)
	const handle_collect_feed = async () => {
		if (!has_login) {
			open_login_modal()
			return
		}
		set_collect_loading(true)
		const [err] = await with_api(collect_feed)({
			feed_id
		})
		set_collect_loading(false)
		if (err) {
			return
		}
		Toast.success({ content: '收藏成功' })
		set_detail(p => (p ? { ...p, collected: true } : p))
	}
	const handle_cancel_collect_feed = async () => {
		if (!has_login) {
			open_login_modal()
			return
		}
		set_cancel_collect_loading(true)
		const [err] = await with_api(cancel_collect_feed)({
			feed_id
		})
		set_cancel_collect_loading(false)
		if (err) {
			return
		}
		Toast.success({ content: '取消收藏成功' })
		set_detail(p => (p ? { ...p, collected: false } : p))
	}

	const go_doc_editor = () => {
		if (!detail) {
			return
		}
		navigate(
			QS.stringify({
				base: `/library/${detail.space_id}/editor`,
				query: {
					doc_id: detail.feed_id
				}
			})
		)
	}

	const rich_text_container_ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const dom = rich_text_container_ref.current
		console.log('dom: ', dom)
		// if (dom) hljs.highlightAll()
	}, [])

	const is_owner = detail?.author_id === profile?.user_id
	const action_btn = detail && (
		<>
			{is_owner ? (
				<Button prefixIcon={<FiEdit3 />} onClick={go_doc_editor}>
					编辑
				</Button>
			) : (
				<>
					{detail.collected ? (
						<Button
							prefixIcon={<LuHeartOff className="color-danger" />}
							loading={cancel_collect_loading}
							onClick={handle_cancel_collect_feed}
						>
							<span className="color-danger">取消收藏</span>
						</Button>
					) : (
						<Button prefixIcon={<LuHeart />} loading={collect_loading} onClick={handle_collect_feed}>
							收藏
						</Button>
					)}
				</>
			)}
		</>
	)
	const doc_content = detail?.content ?? ''

	return (
		<>
			<Header heading={detail?.title || '详情'}>{action_btn}</Header>

			{loading ? (
				<div className="flex justify-center items-center w-100% mt-40%">
					<Loading spinning size="large" />
				</div>
			) : (
				<div className="flex p-24px">
					<div className="w-720px m-auto">
						{detail?.cover && (
							<Image
								className="w-100% max-h-30vh min-h-40px  rd-radius-m"
								src={detail.cover}
								canPreview
							/>
						)}
						<div ref={rich_text_container_ref} className="rich-text-container">
							{parse(doc_content, {})}
						</div>
					</div>
				</div>
			)}
		</>
	)
}
