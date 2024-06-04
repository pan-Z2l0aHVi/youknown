import { Button, Toast } from '@youknown/react-ui/src'
import { QS } from '@youknown/utils/src'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LuHeart, LuHeartOff } from 'react-icons/lu'
import { TbPencil } from 'react-icons/tb'

import type { Feed } from '@/apis/feed'
import { cancel_collect_feed, collect_feed } from '@/apis/user'
import { useTransitionNavigate } from '@/hooks/use-transition-navigate'
import { useModalStore, useRecordStore, useUIStore, useUserStore } from '@/stores'
import { with_api } from '@/utils/request'

interface ActionBtnProps {
  feed: Feed
  set_feed: Dispatch<SetStateAction<Feed | undefined>>
}

export default function ActionBtn(props: ActionBtnProps) {
  const { feed, set_feed } = props

  const { t } = useTranslation()
  const is_mobile = useUIStore(state => state.is_mobile)
  const recording = useRecordStore(state => state.recording)
  const profile = useUserStore(state => state.profile)
  const has_login = useUserStore(state => state.has_login)
  const open_login_modal = useModalStore(state => state.open_login_modal)
  const navigate = useTransitionNavigate()

  const [collect_loading, set_collect_loading] = useState(false)
  const [cancel_collect_loading, set_cancel_collect_loading] = useState(false)

  const record_collect_feed = (action: string, feed_info?: Feed) => {
    if (!feed_info) {
      return
    }
    recording({
      action,
      target: feed_info.creator.nickname,
      target_id: feed_info.creator_id,
      obj_type: 'record.public_doc',
      obj: feed_info.subject.title,
      obj_id: feed_info.id
    })
  }

  const handle_collect_feed = async () => {
    if (!has_login) {
      open_login_modal()
      return
    }
    set_collect_loading(true)
    const [err] = await with_api(collect_feed)({
      feed_id: feed.id
    })
    set_collect_loading(false)
    if (err) {
      return
    }
    record_collect_feed('record.collect', feed)
    Toast.success(t('collect.success'))
    set_feed(p => (p ? { ...p, collected: true } : p))
  }

  const handle_cancel_collect_feed = async () => {
    if (!has_login) {
      open_login_modal()
      return
    }
    set_cancel_collect_loading(true)
    const [err] = await with_api(cancel_collect_feed)({
      feed_id: feed.id
    })
    set_cancel_collect_loading(false)
    if (err) {
      return
    }
    record_collect_feed('record.cancel_collect', feed)
    Toast.success(t('collect.cancel.success'))
    set_feed(p => (p ? { ...p, collected: false } : p))
  }

  const go_doc_editor = () => {
    if (!feed) {
      return
    }
    const doc_editor_url = QS.stringify({
      base: `/library/${feed.subject.space_id}/editor`,
      query: {
        doc_id: feed.subject.doc_id
      }
    })
    navigate(doc_editor_url, {
      state: feed.subject
    })
  }

  const is_owner = feed?.creator_id === profile?.user_id

  return (
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
          {feed.collected ? (
            <>
              {is_mobile ? (
                <Button text square loading={cancel_collect_loading} onClick={handle_cancel_collect_feed}>
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
}
