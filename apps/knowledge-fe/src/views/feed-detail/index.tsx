import '@youknown/css/src/rte.scss'

import hljs from 'highlight.js/lib/core'
import parse, { Element } from 'html-react-parser'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LuHeart, LuHeartOff } from 'react-icons/lu'
import { TbPencil } from 'react-icons/tb'
import { useLocation, useSearchParams } from 'react-router-dom'

import { Feed, get_feed_detail } from '@/apis/feed'
import { cancel_collect_feed, collect_feed } from '@/apis/user'
import Header from '@/app/components/header'
import useTransitionNavigate from '@/hooks/use-transition-navigate'
import { useModalStore, useRecordStore, useUIStore, useUserStore } from '@/stores'
import { initHlsLangs } from '@/utils'
import { with_api } from '@/utils/request'
import { useFetch } from '@youknown/react-hook/src'
import { Button, Image, Loading, Toast } from '@youknown/react-ui/src'
import { QS } from '@youknown/utils/src'

export default function FeedDetail() {
	const { t } = useTranslation()
	const is_mobile = useUIStore(state => state.is_mobile)
	const recording = useRecordStore(state => state.recording)
	const profile = useUserStore(state => state.profile)
	const has_login = useUserStore(state => state.has_login)
	const open_login_modal = useModalStore(state => state.open_login_modal)
	const navigate = useTransitionNavigate()
	const [search_params] = useSearchParams()
	const feed_id = search_params.get('feed_id') ?? ''
	const { state: feed_state }: { state: Feed } = useLocation()

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
		initialData: feed_state,
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
		Toast.success(t('collect.success'))
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
		Toast.success(t('collect.cancel.success'))
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

	const doc_content = detail?.content ?? ''
	const rich_text_container_ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const dom = rich_text_container_ref.current
		if (dom && doc_content) {
			initHlsLangs().then(() => {
				hljs.highlightAll()
			})
		}
	}, [doc_content])

	const is_owner = detail?.author_id === profile?.user_id
	const action_btn = detail && (
		<>
			{is_owner ? (
				<>
					{is_mobile ? (
						<Button text square onClick={go_doc_editor}>
							<TbPencil className="color-primary text-18px" />
						</Button>
					) : (
						<Button prefixIcon={<TbPencil className="color-primary text-16px" />} onClick={go_doc_editor}>
							{t('edit.text')}
						</Button>
					)}
				</>
			) : (
				<>
					{detail.collected ? (
						<>
							{is_mobile ? (
								<Button
									text
									square
									loading={cancel_collect_loading}
									onClick={handle_cancel_collect_feed}
								>
									<LuHeartOff className="color-danger text-18px" />
								</Button>
							) : (
								<Button
									prefixIcon={<LuHeartOff className="color-danger" />}
									loading={cancel_collect_loading}
									onClick={handle_cancel_collect_feed}
								>
									<span className="color-danger">{t('collect.cancel.text')}</span>
								</Button>
							)}
						</>
					) : (
						<>
							{is_mobile ? (
								<Button text square loading={collect_loading} onClick={handle_collect_feed}>
									<LuHeart className="color-primary text-18px" />
								</Button>
							) : (
								<Button
									prefixIcon={<LuHeart className="color-primary" />}
									loading={collect_loading}
									onClick={handle_collect_feed}
								>
									{t('collect.text')}
								</Button>
							)}
						</>
					)}
				</>
			)}
		</>
	)

	return (
		<>
			<Header heading={detail?.title || t('detail')}>{action_btn}</Header>

			{!feed_state && loading ? (
				<div className="flex justify-center items-center w-100% mt-40%">
					<Loading spinning size="large" />
				</div>
			) : (
				<div className="flex sm:p-24px <sm:p-16px">
					<div className="sm:w-720px sm:m-auto <sm:w-100%">
						{detail?.cover && (
							<Image
								className="w-100% max-h-30vh min-h-40px rd-radius-m mb-16px"
								src={detail.cover}
								canPreview
								alt="Cover"
							/>
						)}
						<div ref={rich_text_container_ref} className="rich-text-container">
							{parse(doc_content, {
								replace(domNode) {
									// console.log('domNode: ', domNode)
									if (domNode instanceof Element && domNode.name === 'img') {
										return <Image src={domNode.attribs.src} canPreview />
									}
								}
							})}
						</div>
					</div>
				</div>
			)}
		</>
	)
}
