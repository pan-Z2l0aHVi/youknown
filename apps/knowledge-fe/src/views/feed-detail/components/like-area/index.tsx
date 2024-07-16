import { useBoolean } from '@youknown/react-hook/src'
import { Avatar, Button, Dialog, Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { useTranslation } from 'react-i18next'
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa6'

import type { Feed } from '@/apis/feed'
import { useFeedLike } from '@/hooks/use-feed-like'
import { is_dark_theme_getter, useUIStore } from '@/stores'
import { transform_img_cdn } from '@/utils/cloudflare'

interface LikeAreaProps {
  feed: Feed
}
export default function LikeArea(props: LikeAreaProps) {
  const { feed } = props

  const { t } = useTranslation()
  const is_dark_theme = useUIStore(is_dark_theme_getter)
  const is_mobile = useUIStore(state => state.is_mobile)
  const { like_list, like_count, toggle_like, liked } = useFeedLike(feed)
  const [liked_members_open, { setTrue: show_liked_members, setFalse: hide_liked_members }] = useBoolean(false)

  const liked_members_modal = (
    <Dialog
      open={liked_members_open}
      onCancel={hide_liked_members}
      header={null}
      footer={null}
      closeIcon={null}
      overlayClassName={cls(
        'backdrop-blur-xl',
        is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]'
      )}
    >
      <div className="flex flex-wrap p-16px select-none">
        {like_list.map(user => (
          <Tooltip key={user.user_id} trigger={is_mobile ? 'click' : 'hover'} placement="bottom" title={user.nickname}>
            <Avatar
              className="m-4px"
              round
              src={transform_img_cdn(user.avatar, { w: 40, h: 40, fit: 'cover' })}
              previewSrc={user.avatar}
            />
          </Tooltip>
        ))}
      </div>
    </Dialog>
  )

  const like_action_btn = (
    <Button aria-label={liked ? t('like.ok') : t('like.text')} size="large" circle primary onClick={toggle_like}>
      {liked ? <FaThumbsUp className="text-20px" /> : <FaRegThumbsUp className="text-20px" />}
    </Button>
  )

  return (
    <>
      <div className="flex flex-col items-center w-max p-8px m-[0_auto] select-none">
        {like_action_btn}
        <div className="color-text-3 mt-8px">{`${like_count} ${t('like.people_num')}`}</div>
      </div>

      {like_list.length > 0 && (
        <>
          <div className="flex items-center w-max m-[0_auto]">
            <Avatar.Group
              max={10}
              items={like_list.map(like_item => ({
                ...like_item,
                name: like_item.user_id,
                src: like_item.avatar
              }))}
              renderAvatar={item => (
                <Tooltip key={item.name} trigger={is_mobile ? 'click' : 'hover'} title={item.nickname}>
                  <Avatar
                    round
                    src={transform_img_cdn(item.src, { w: 40, h: 40, fit: 'cover' })}
                    previewSrc={item.src}
                  />
                </Tooltip>
              )}
              renderRest={rest_items => (
                <div
                  className="relative flex items-center justify-center w-40px h-40px rd-full bg-#999 color-#fff b-2 b-solid b-#fff cursor-pointer"
                  onClick={show_liked_members}
                >
                  +{rest_items.length}
                </div>
              )}
            />
          </div>
          {liked_members_modal}
        </>
      )}
    </>
  )
}
