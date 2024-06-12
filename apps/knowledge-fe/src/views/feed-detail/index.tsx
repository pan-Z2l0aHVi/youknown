import { useFetch } from '@youknown/react-hook/src'
import { Anchor, Image, Loading } from '@youknown/react-ui/src'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Location } from 'react-router-dom'
import { useLocation, useSearchParams } from 'react-router-dom'

import type { Feed } from '@/apis/feed'
import { get_feed_info } from '@/apis/feed'
import Header from '@/app/components/header'
import RichTextArea from '@/components/rich-text-area'
import { useRecordStore, useUIStore } from '@/stores'
import { HeadingLeaf, prase_heading_tree } from '@/utils'

import ActionBtn from './components/action-btn'
import CommentArea from './components/comment-area'
import DescArea from './components/desc-area'
import LikeArea from './components/like-area'
import RelatedArea from './components/related-area'

export default function FeedDetail() {
  const { t } = useTranslation()
  const is_mobile = useUIStore(state => state.is_mobile)
  const recording = useRecordStore(state => state.recording)
  const [search_params] = useSearchParams()
  const feed_id = search_params.get('feed_id') ?? ''
  const location: Location<Feed> = useLocation()
  const { pathname, state: feed_state } = location
  const last_pathname = useRef('')

  const record_read_feed = (feed_info: Feed) => {
    recording({
      action: 'record.read',
      target: feed_info.creator.nickname,
      target_id: feed_info.creator_id,
      obj_type: 'record.public_doc',
      obj: feed_info.subject.title,
      obj_id: feed_info.id
    })
  }

  const {
    data: detail,
    loading,
    mutate: set_detail
  } = useFetch(get_feed_info, {
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
  useEffect(() => {
    if (feed_state && pathname === last_pathname.current) {
      set_detail(feed_state)
    }
    last_pathname.current = pathname
  }, [feed_state, pathname, set_detail])

  const doc_content = detail?.subject.content ?? ''
  const rich_text_container_ref = useRef<HTMLDivElement>(null)
  const [anchor_items, set_anchor_items] = useState<HeadingLeaf[]>([])

  useEffect(() => {
    const tree = prase_heading_tree(doc_content)
    console.log('anchor tree: ', tree)
    set_anchor_items(tree)
  }, [doc_content])

  const feed_content = (
    <div className="flex-1 sm:w-720px <sm:w-0">
      {detail?.subject.cover && (
        <Image
          className="w-100% max-h-30vh min-h-80px b-1 b-solid b-divider rd-radius-m mb-16px"
          src={detail.subject.cover}
          previewSrc={detail.subject.cover}
          canPreview
          alt="Cover"
        />
      )}
      <RichTextArea ref={rich_text_container_ref} className="text-16px" html={doc_content} />
      {detail && (
        <>
          <DescArea feed={detail} />
          <LikeArea feed={detail} />
          <RelatedArea feed={detail} />
          <CommentArea feed={detail} />
        </>
      )}
    </div>
  )

  return (
    <>
      <Header heading={detail?.subject.title || t('detail')}>
        {detail && <ActionBtn feed={detail} set_feed={set_detail} />}
      </Header>

      {!feed_state && loading ? (
        <div className="flex justify-center items-center w-100% mt-40%">
          <Loading spinning size="large" />
        </div>
      ) : (
        <div className="flex sm:p-24px <sm:p-16px sm:m-auto <sm:w-100%">
          {feed_content}
          {is_mobile || (
            <Anchor
              className="sticky top-80px ml-40px w-200px max-h-70vh h-max overflow-y-auto"
              offsetY={56}
              items={anchor_items}
            />
          )}
        </div>
      )}
    </>
  )
}
