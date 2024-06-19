import './slider.scss'

import { useBoolean, useComposeRef, useControllable, useEvent, useLatestRef } from '@youknown/react-hook/src'
import { checkTouchable, cls, omit } from '@youknown/utils/src'
import type { ForwardedRef, HTMLAttributes, KeyboardEventHandler, MouseEventHandler } from 'react'
import { forwardRef, useLayoutEffect, useRef, useState } from 'react'

import { UI_PREFIX } from '../../constants'
import { Tooltip } from '../tooltip'

const toPercent = (num: number) => {
  return `${Math.round(num * 100)}%`
}

export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  disabled?: boolean
  vertical?: boolean
  tooltipFormatter?: (value: number) => string
  min?: number
  max?: number
  step?: number
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
}

const _Slider = (props: SliderProps, propRef: ForwardedRef<HTMLDivElement>) => {
  const {
    className,
    vertical = false,
    disabled = false,
    tooltipFormatter = (x: number) => String(Math.round(x)),
    min = 0,
    max = 100,
    step = 5,
    onClick,
    ...rest
  } = omit(props, 'value', 'defaultValue', 'onChange')

  const [value, setValue] = useControllable(props, {
    defaultValue: min
  })
  const defaultPercent = toPercent(value / (max - min))
  const [left, setLeft] = useState(defaultPercent)
  const [bottom, setBottom] = useState(defaultPercent)
  const trackRef = useRef<HTMLDivElement>(null)
  const ref = useComposeRef(trackRef, propRef)
  const handleRef = useRef<HTMLButtonElement>(null)
  // 触控事件时 hover 失效，tooltip 手动控制
  const canTouch = checkTouchable()
  const [sliding, { setTrue: startSliding, setFalse: stopSliding }] = useBoolean(false)
  const slidingRef = useLatestRef(sliding)

  const timerRef = useRef(0)
  const flashTooltip = () => {
    startSliding()
    clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      stopSliding()
    }, 500)
  }

  const focusHandle = () => {
    handleRef.current?.focus()
  }

  const handleMousedown = useEvent(() => {
    if (disabled) {
      return
    }
    const handleMousemove = (event: MouseEvent) => {
      if (!slidingRef.current) return
      if (vertical) {
        updateBottomByClientY(event.clientY)
      } else {
        updateLeftByClientX(event.clientX)
      }
    }
    const onMouseEvents = () => {
      document.addEventListener('mousemove', handleMousemove)
      document.addEventListener('mouseup', handleMouseup, { once: true })
    }
    const offMouseEvents = () => {
      document.removeEventListener('mousemove', handleMousemove)
      document.removeEventListener('mouseup', handleMouseup)
    }
    const handleMouseup = () => {
      stopSliding()
      offMouseEvents()
    }
    focusHandle()
    startSliding()
    onMouseEvents()
  })

  const handleTouchStart = useEvent((event: React.TouchEvent) => {
    if (disabled) return
    if (event.touches.length !== 1) return

    const handleTouchmove = (event: TouchEvent) => {
      if (!slidingRef.current) return
      if (event.touches.length !== 1) return
      const [touch] = event.touches
      if (vertical) {
        updateBottomByClientY(touch.clientY)
      } else {
        updateLeftByClientX(touch.clientX)
      }
    }
    const onTouchEvents = () => {
      document.addEventListener('touchmove', handleTouchmove)
      document.addEventListener('touchend', handleTouchStop, { once: true })
      document.addEventListener('touchcancel', handleTouchStop, { once: true })
    }
    const offTouchEvents = () => {
      document.removeEventListener('touchmove', handleTouchmove)
      document.removeEventListener('touchend', handleTouchStop)
      document.removeEventListener('touchcancel', handleTouchStop)
    }
    const handleTouchStop = () => {
      stopSliding()
      offTouchEvents()
    }
    focusHandle()
    startSliding()
    onTouchEvents()
  })

  const updateLeft = useEvent((percent: number) => {
    if (percent < 0) {
      setValue(min)
      setLeft('0%')
      return
    }
    if (percent > 1) {
      setValue(max)
      setLeft('100%')
      return
    }
    const range = max - min
    const nextValue = percent * range + min
    setValue(nextValue)
    setLeft(toPercent(percent))
  })

  const updateBottom = useEvent((percent: number) => {
    if (percent < 0) {
      setValue(min)
      setBottom('0%')
      return
    }
    if (percent > 1) {
      setValue(max)
      setBottom('100%')
      return
    }
    const range = max - min
    const nextValue = percent * range + min
    setValue(nextValue)
    setBottom(toPercent(percent))
  })

  const updateLeftByClientX = (clientX: number) => {
    if (!trackRef.current) return
    const { width, x } = trackRef.current.getBoundingClientRect()
    const offsetX = clientX - x

    updateLeft(offsetX / width)
  }

  const updateBottomByClientY = (clientY: number) => {
    if (!trackRef.current) return
    const { height, y } = trackRef.current.getBoundingClientRect()
    const offsetY = clientY - y

    updateBottom(1 - offsetY / height)
  }

  const handleOffsetClick: MouseEventHandler<HTMLDivElement> = event => {
    if (disabled) {
      return
    }
    onClick?.(event)
    focusHandle()
    if (vertical) {
      updateBottomByClientY(event.clientY)
    } else {
      updateLeftByClientX(event.clientX)
    }
    flashTooltip()
  }

  const handleKeydown: KeyboardEventHandler<HTMLButtonElement> = event => {
    if (disabled) {
      return
    }
    if (!trackRef.current) {
      return
    }
    flashTooltip()
    const percent = (value - min) / (max - min)
    if (vertical) {
      switch (event.code) {
        case 'ArrowUp':
          updateBottom(percent + step / 100)
          break
        case 'ArrowDown':
          updateBottom(percent - step / 100)
          break
        default:
          break
      }
    } else {
      switch (event.code) {
        case 'ArrowLeft':
          updateLeft(percent - step / 100)
          break
        case 'ArrowRight':
          updateLeft(percent + step / 100)
          break
        default:
          break
      }
    }
  }

  useLayoutEffect(() => {
    updateLeft((value - min) / (max - min))
    updateBottom((value - min) / (max - min))
  }, [max, min, updateBottom, updateLeft, value])

  let offsetStyle = {}
  if (vertical) {
    offsetStyle = { height: bottom }
  } else {
    offsetStyle = { width: left }
  }
  let handleStyle = {}
  if (vertical) {
    handleStyle = { bottom }
  } else {
    handleStyle = { left }
  }

  const tooltipProps = canTouch ? { open: sliding } : {}
  const prefixCls = `${UI_PREFIX}-slider`

  return (
    <div
      ref={ref}
      className={cls(className, prefixCls, {
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-vertical`]: vertical
      })}
      onClick={handleOffsetClick}
      {...rest}
    >
      <div className={cls(`${prefixCls}-offset`)} style={offsetStyle}></div>
      <Tooltip
        ref={handleRef}
        trigger={canTouch ? 'manual' : 'hover'}
        placement={vertical ? 'right' : 'top'}
        title={tooltipFormatter(value)}
        {...tooltipProps}
      >
        <button
          type="button"
          className={cls(`${prefixCls}-handle`)}
          style={handleStyle}
          onMouseDown={handleMousedown}
          onTouchStart={handleTouchStart}
          onTouchEnd={stopSliding}
          onKeyDown={handleKeydown}
        ></button>
      </Tooltip>
    </div>
  )
}

_Slider.displayName = 'Slider'

export const Slider = forwardRef(_Slider)
