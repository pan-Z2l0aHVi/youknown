import { useBoolean } from '@youknown/react-hook/src'
import type { PopoverProps } from '@youknown/react-ui/src'
import { Button, Popover, Space, Toast } from '@youknown/react-ui/src'
import { shakePage } from '@youknown/utils/src'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbUserCheck, TbUserEdit, TbX } from 'react-icons/tb'
import { useBlocker } from 'react-router-dom'

import type { Profile } from '@/apis/user'
import { update_profile } from '@/apis/user'
import { useUIStore } from '@/stores'
import { with_api } from '@/utils/request'

interface ProfileSaveBtnProps {
  nickname: string
  avatar: string
  is_editing: boolean
  set_profile: (profile: Profile) => void
  start_edit: () => void
  stop_edit: () => void
}

export default function ProfileSaveBtn(props: ProfileSaveBtnProps) {
  const { nickname, avatar, is_editing, set_profile, start_edit, stop_edit } = props
  const { t } = useTranslation()
  const is_mobile = useUIStore(state => state.is_mobile)
  const [saving, set_saving] = useState(false)
  const [leaving_tip_visible, { setTrue: show_leaving_tip, setFalse: hide_leaving_tip }] = useBoolean(false)

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => currentLocation.pathname !== nextLocation.pathname && is_editing
  )
  const is_blocked = blocker.state === 'blocked'

  useEffect(() => {
    // 不能使用 is_blocked，必须将 blocker 加入依赖数组使其多次触发
    if (blocker.state === 'blocked') {
      shakePage()
    }
  }, [blocker])

  useEffect(() => {
    if (is_blocked) {
      show_leaving_tip()
    }
  }, [is_blocked, show_leaving_tip])

  const stop_edit_profile = () => {
    stop_edit()
    hide_leaving_tip()
    if (is_blocked) {
      blocker.proceed()
    }
  }

  const handle_save_profile = async () => {
    set_saving(true)
    const [err, new_profile] = await with_api(update_profile)({
      nickname,
      avatar
    })
    set_saving(false)
    if (err) {
      return
    }
    Toast.success(t('profile.update'))
    set_profile(new_profile)
    stop_edit_profile()
  }

  const leaving_tip_props: PopoverProps = {
    open: leaving_tip_visible,
    trigger: 'manual',
    placement: 'bottom-end',
    content: <div className="pl-8px pr-8px font-600 color-orange">{t('leaving_prompt')}</div>
  }

  return is_editing ? (
    <Space>
      {is_mobile ? (
        <>
          <Button text square onClick={stop_edit_profile}>
            <TbX className="text-18px color-primary" />
          </Button>
          <Popover {...leaving_tip_props}>
            <Button text square loading={saving} onClick={handle_save_profile}>
              <TbUserCheck className="text-18px color-primary" />
            </Button>
          </Popover>
        </>
      ) : (
        <>
          <Button onClick={stop_edit_profile}>{is_blocked ? t('change.give_up') : t('cancel.text')}</Button>
          <Popover {...leaving_tip_props}>
            <Button
              primary
              prefixIcon={<TbUserCheck className="text-16px" />}
              loading={saving}
              onClick={handle_save_profile}
            >
              {t('save.text')}
            </Button>
          </Popover>
        </>
      )}
    </Space>
  ) : (
    <>
      {is_mobile ? (
        <Button text square onClick={start_edit}>
          <TbUserEdit className="color-primary text-18px" />
        </Button>
      ) : (
        <Button prefixIcon={<TbUserEdit className="text-16px color-primary" />} onClick={start_edit}>
          {t('profile.edit')}
        </Button>
      )}
    </>
  )
}
