import { Button, Toast } from '@youknown/react-ui/src'
import { Dispatch, SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RiUserFollowLine, RiUserUnfollowLine } from 'react-icons/ri'

import { follow_user, Profile, unfollow_user } from '@/apis/user'
import { useModalStore, useRecordStore, useUIStore, useUserStore } from '@/stores'
import { with_api } from '@/utils/request'

interface UserInfo extends Profile {
  collected: boolean
}
interface FollowBtnProps {
  user_info: UserInfo
  set_user_info: Dispatch<SetStateAction<UserInfo | undefined>>
}

export default function FollowBtn(props: FollowBtnProps) {
  const { user_info, set_user_info } = props
  const { t } = useTranslation()
  const is_mobile = useUIStore(state => state.is_mobile)
  const has_login = useUserStore(state => state.has_login)
  const recording = useRecordStore(state => state.recording)
  const open_login_modal = useModalStore(state => state.open_login_modal)
  const [saving, set_saving] = useState(false)

  const record_follow_user = (action: string) => {
    recording({
      action,
      target: '',
      target_id: '',
      obj_type: 'record.user',
      obj: user_info.nickname,
      obj_id: user_info.user_id
    })
  }

  const handle_follow_user = async () => {
    if (!has_login) {
      open_login_modal()
      return
    }
    const target_user_id = user_info.user_id
    if (!target_user_id) {
      return
    }
    set_saving(true)
    const [err] = await with_api(follow_user)({
      user_id: target_user_id
    })
    set_saving(false)
    if (err) {
      return
    }
    record_follow_user('record.follow')
    Toast.success(t('follow.ok.success'))
    set_user_info(p => (p ? { ...p, collected: true } : p))
  }

  const handle_unfollow_user = async () => {
    if (!has_login) {
      open_login_modal()
      return
    }
    const target_user_id = user_info.user_id
    if (!target_user_id) {
      return
    }
    set_saving(true)
    const [err] = await with_api(unfollow_user)({
      user_id: target_user_id
    })
    set_saving(false)
    if (err) {
      return
    }
    record_follow_user('record.unfollow')
    Toast.success(t('follow.cancel.success'))
    set_user_info(p => (p ? { ...p, collected: false } : p))
  }

  return (
    <>
      {user_info.collected ? (
        <Button
          className="z-22 absolute! top--45px right-32px"
          prefixIcon={<RiUserUnfollowLine className="text-14px" />}
          round={is_mobile}
          loading={saving}
          onClick={handle_unfollow_user}
        >
          {t('follow.cancel.text')}
        </Button>
      ) : (
        <Button
          className="z-22 absolute! top--45px right-32px"
          prefixIcon={<RiUserFollowLine className="text-14px" />}
          round={is_mobile}
          loading={saving}
          primary
          onClick={handle_follow_user}
        >
          {t('follow.text')}
        </Button>
      )}
    </>
  )
}
