import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { comment, Feed } from '@/apis/feed'
import { with_api } from '@/utils/request'
import { Toast } from '@youknown/react-ui/src'

import { CommentContext } from '../../comment-context'
import CommentEditor from '../comment-editor'

interface CommentCreateProps {
	feed: Feed
}

export default function CommentCreate(props: CommentCreateProps) {
	const { feed } = props
	const { id: feed_id } = feed

	const { t } = useTranslation()
	const [send_loading, set_send_loading] = useState(false)
	const [comment_text, set_comment_text] = useState('')
	const ctx = useContext(CommentContext)

	const send_comment = async () => {
		const [err, new_comment] = await with_api(comment)({
			feed_id,
			content: comment_text
		})
		if (err) {
			return
		}
		Toast.success(t('comment.success'))
		ctx.on_comment_created?.(new_comment)
	}

	const handle_reply_comment = async () => {
		if (send_loading) return
		set_send_loading(true)
		await send_comment()
		set_send_loading(false)
	}

	return (
		<CommentEditor
			avatar_visible
			placeholder={t('placeholder.comment')}
			btnText={t('comment.send')}
			send_loading={send_loading}
			value={comment_text}
			on_change={set_comment_text}
			on_send={handle_reply_comment}
		/>
	)
}
