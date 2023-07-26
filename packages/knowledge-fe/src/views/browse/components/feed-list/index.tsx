import { get_feed_list } from '@/apis'
import TransitionLink from '@/components/transition-link'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { open_login_modal } from '@/store/modal/slice'
import { record } from '@/store/record/slice'
import { useFetch } from '@youknown/react-hook/src'
import { Avatar, Button, Image, Tooltip } from '@youknown/react-ui/src'
import { cls, QS } from '@youknown/utils/src'
import dayjs from 'dayjs'
import { FiThumbsUp } from 'react-icons/fi'

interface FeedProps {
	feed_tab: number
}

export default function FeedList(props: FeedProps) {
	const { feed_tab } = props
	const dispatch = useAppDispatch()
	const is_login = useAppSelector(state => state.user.is_login)
	const { data: feed_list } = useFetch(get_feed_list, {
		initialData: [],
		params: [
			{
				feed_tab: feed_tab
			}
		],
		refreshDeps: [feed_tab]
	})
	const handle_record_ready = () => {
		dispatch(
			record({
				action: '阅读',
				target: '月光下再见',
				target_id: 'qwrewerwe',
				obj_type: '文章',
				obj: '《如何看待近期大火的Chat GPT》',
				obj_id: '1232',
				timing: dayjs().valueOf()
			})
		)
	}

	const handle_praise = () => {
		if (!is_login) {
			dispatch(open_login_modal())
			return
		}
		dispatch(
			record({
				action: '点赞',
				target: '月光下再见',
				target_id: 'qwrewerwe',
				obj_type: '文章',
				obj: '《如何看待近期大火的Chat GPT》',
				obj_id: '1232',
				timing: dayjs().valueOf()
			})
		)
	}

	return (
		<div className="max-w-960px">
			{feed_list.map(feed => {
				const doc_detail_url = QS.stringify({
					base: '/browse/doc-detail',
					query: {
						doc_id: feed.id
					}
				})

				return (
					<div key={feed.id} className="b-b-bd-line b-b b-b-solid mb-32px">
						<div className="flex items-center mb-16px">
							<Avatar size="small" round src={feed.user.avatar} />

							<div className="flex items-center">
								<div className="ml-12px">{feed.user.nickname}</div>
								<div className="ml-8px color-text-3 text-12px">{feed.last_modify_at}</div>
							</div>
						</div>

						<div className="flex-1 flex pl-36px mb-8px">
							<div className="flex-1">
								<TransitionLink
									to={doc_detail_url}
									className="group block w-[fit-content] mb-12px"
									onClick={handle_record_ready}
								>
									<div
										className={cls(
											'inline text-16px font-600 cursor-pointer',
											'transition-property-[background-size] transition-duration-300ms ease-out',
											'bg-gradient-to-tr from-primary to-primary bg-no-repeat bg-right-bottom bg-[length:0%_2px]',
											'group-hover-bg-left-bottom group-hover-bg-[length:100%_2px]'
										)}
									>
										{feed.heading}
									</div>
								</TransitionLink>

								<div className="" dangerouslySetInnerHTML={{ __html: feed.content.html }}></div>
							</div>

							<Image
								className="w-160px h-108px b-bd-line b-1 b-solid b-rd-radius-m object-cover ml-48px"
								src={feed.cover}
								loading="lazy"
							/>
						</div>

						<div className="flex items-center pl-28px mb-16px">
							<Tooltip title="顶" placement="bottom">
								<Button className="" text circle onClick={handle_praise}>
									<FiThumbsUp className="text-14px" />
								</Button>
							</Tooltip>
							{feed.likes_count && <span className="color-text-2">{feed.likes_count}</span>}
						</div>
					</div>
				)
			})}
		</div>
	)
}
