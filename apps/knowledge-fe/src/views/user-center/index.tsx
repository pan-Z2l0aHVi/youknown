import { useBoolean, useFetch } from '@youknown/react-hook/src'
import { AspectRatio, Avatar, Divider, Image, Input, Loading, Toast, Upload } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { get_user_info } from '@/apis/user'
import Header from '@/app/components/header'
import TabBar from '@/app/components/tab-bar'
import { GENERAL_IMAGE_ACCEPT } from '@/consts'
import { useModalStore, useUIStore, useUserStore } from '@/stores'
import { format_time } from '@/utils'
import { upload_cloudflare_r2 } from '@/utils/cloudflare-r2'
import { compress_image } from '@/utils/compress'

import Entires from './components/entries'
import FollowBtn from './components/follow-btn'
import MyOptions from './components/my-options'
import ProfileSaveBtn from './components/profile-save-btn'

export default function UserCenter() {
  const { t } = useTranslation()
  const is_mobile = useUIStore(state => state.is_mobile)
  const profile = useUserStore(state => state.profile)
  const set_profile = useUserStore(state => state.set_profile)
  const has_login = useUserStore(state => state.has_login)
  const open_login_modal = useModalStore(state => state.open_login_modal)
  const [search_params] = useSearchParams()
  const target_user_id = search_params.get('target_user_id') ?? ''
  const is_self = !target_user_id || target_user_id === profile?.user_id
  const { data: target_user_info, mutate: set_user_info } = useFetch(get_user_info, {
    ready: !!target_user_id,
    params: [{ user_id: target_user_id }]
  })
  const user_info = is_self ? { ...(profile ?? {}), collected: false } : target_user_info
  const [is_editing, { setTrue: start_edit, setFalse: stop_edit }] = useBoolean(false)
  const [updating_avatar, set_updating_avatar] = useState('')
  const [nickname_val, set_nickname_val] = useState('')

  const upload_avatar = (file: File) =>
    new Promise<string>((resolve, reject) => {
      Image.crop({
        file,
        title: t('heading.set_avatar'),
        cropShape: 'round',
        initialAspectRatio: 1,
        aspectRatioFixed: true,
        onCancel: reject,
        async onCrop(result) {
          try {
            const compressed_file = await compress_image(result, 520, 520)
            upload_cloudflare_r2(compressed_file, {
              complete(url) {
                resolve(url)
                set_updating_avatar(url)
              },
              error(err) {
                Toast.error(t('upload.img.fail'))
                reject(err)
              }
            })
          } catch (err) {
            Toast.error(t('upload.img.fail'))
            reject(err)
          }
        }
      })
    })

  const { nickname = '', avatar = '' } = user_info ?? {}
  useEffect(() => {
    if (is_editing) {
      set_nickname_val(nickname ?? '')
      set_updating_avatar(avatar ?? '')
    }
  }, [avatar, is_editing, nickname])

  const header = (
    <Header heading={t('page.title.personal')}>
      {has_login && is_self && (
        <ProfileSaveBtn
          is_editing={is_editing}
          nickname={nickname_val}
          avatar={updating_avatar}
          start_edit={start_edit}
          stop_edit={stop_edit}
          set_profile={set_profile}
        />
      )}
    </Header>
  )

  const banner = (
    <Loading className="w-100%!" spinning={!user_info}>
      <AspectRatio ratio={is_mobile ? 0.4 : 0.2}>
        <div
          className={cls(
            'relative w-100% h-100%',
            'after:content-empty after:absolute after:top-0 after:left-0 after:w-100% after:h-100%',
            'after:backdrop-blur-2xl'
          )}
        >
          {(!is_self || (is_self && has_login)) && (
            <Image className="w-100% h-100%" src={user_info?.avatar ?? ''} alt="Banner" />
          )}
        </div>
      </AspectRatio>
    </Loading>
  )

  const follow_btn = !is_self && user_info?.user_id && (
    <FollowBtn user_info={user_info as Required<typeof user_info>} set_user_info={set_user_info} />
  )

  const user_info_ele = (
    <>
      {is_self && !has_login ? (
        <div
          className={cls(
            'absolute top--45px <sm:left-16px w-90px h-90px flex justify-center items-center',
            'rd-full bg-primary color-#fff text-16px font-500 shadow-shadow-l cursor-pointer'
          )}
          onClick={open_login_modal}
        >
          {t('login.go')}
        </div>
      ) : (
        <>
          {is_editing ? (
            <Upload
              className="absolute! top--45px <sm:left-16px"
              circle
              accept={GENERAL_IMAGE_ACCEPT}
              action={upload_avatar}
            />
          ) : (
            <Avatar
              className="absolute! top--45px <sm:left-16px shadow-shadow-l"
              size={90}
              round
              bordered
              canPreview
              src={user_info?.avatar}
            />
          )}
        </>
      )}

      {is_editing ? (
        <Input className="<sm:ml-16px mt-24px" value={nickname_val} onChange={set_nickname_val} />
      ) : (
        <div className="<sm:ml-16px text-22px line-height-32px font-600 mt-24px break-all line-clamp-2">
          {user_info?.nickname ?? '--'}
        </div>
      )}

      <div className="text-12px color-text-3 mt-8px <sm:p-[0_16px_16px_16px]">
        {t('time.join')}
        {format_time(user_info?.creation_time ?? '--')}
      </div>
    </>
  )

  return (
    <>
      {header}
      {banner}

      <div className="relative sm:p-32px <sm:p-[32px_0] sm:w-720px sm:m-[0_auto]">
        {follow_btn}

        {user_info_ele}
        {is_mobile || <Divider />}

        {is_mobile && is_self && (
          <div className="p-16px bg-bg-2">
            <Entires />
            <MyOptions />
          </div>
        )}
      </div>

      {is_mobile && <TabBar />}
    </>
  )
}
