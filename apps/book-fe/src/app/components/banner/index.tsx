import { cls, storage } from '@youknown/utils/src'
import { useCallback, useEffect } from 'react'
import { TbX } from 'react-icons/tb'

import { useUIStore } from '@/stores'

const CLOSED_KEY = 'banner-closed'

export default function Banner() {
  const text = 'Hello~'
  const banner_visible = useUIStore(state => state.banner_visible)
  const set_banner_visible = useUIStore(state => state.set_banner_visible)

  const update_visible_status = useCallback(() => {
    const closed = storage.local.get(CLOSED_KEY)
    set_banner_visible(!closed)
  }, [set_banner_visible])

  useEffect(() => {
    update_visible_status()
    const storage_handler = (event: StorageEvent) => {
      if (event.key === CLOSED_KEY) {
        update_visible_status()
      }
    }
    window.addEventListener('storage', storage_handler)
    return () => {
      window.removeEventListener('storage', storage_handler)
    }
  }, [update_visible_status])

  const hide = useCallback(() => {
    storage.local.set(CLOSED_KEY, 1, 7 * 24 * 60 * 60 * 1000)
    set_banner_visible(false)
  }, [set_banner_visible])

  if (!banner_visible) {
    return null
  }

  return (
    <div
      className={cls(
        'relative flex justify-center items-center flex-wrap break-all p-[4px_40px] min-h-40px color-primary bg-bg-0',
        'before:content-empty before:absolute before:left-0 before-top-0 before:w-100% before:h-100% before:opacity-30 before:bg-primary'
      )}
    >
      {text}
      <div
        className="absolute right-8px flex items-center justify-center w-24px h-24px cursor-pointer [@media(hover:hover)]-hover-color-primary-hover"
        onClick={hide}
      >
        <TbX className="text-16px" />
      </div>
    </div>
  )
}
