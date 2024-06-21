import { useBoolean, useEvent } from '@youknown/react-hook/src'
import { useRef } from 'react'

export function useAutoHideTip(duration = 1000): [boolean, () => void] {
  const [visible, { setTrue: show, setFalse: hide }] = useBoolean(false)
  const delayTimerRef = useRef(0)

  const showTip = useEvent(() => {
    show()
    clearTimeout(delayTimerRef.current)
    delayTimerRef.current = window.setTimeout(() => {
      hide()
    }, duration)
  })

  return [visible, showTip]
}
