import './aspect-ratio.scss'

import { cls } from '@youknown/utils/src'
import { cloneElement, type FC, type HTMLAttributes, isValidElement } from 'react'

import { UI_PREFIX } from '../../constants'

export interface AspectRatioProps extends HTMLAttributes<HTMLElement> {
  ratio: number | 'auto'
}

export const AspectRatio: FC<AspectRatioProps> = props => {
  const { className, ratio = 'auto', children, style, ...rest } = props
  const isAuto = ratio === 'auto'
  const prefixCls = `${UI_PREFIX}-aspect-ratio`

  return isAuto ? (
    isValidElement<HTMLAttributes<HTMLElement>>(children) ? (
      cloneElement(children, { className, style, ...rest })
    ) : (
      children
    )
  ) : (
    <div
      className={cls(className, prefixCls)}
      style={{ ...style, paddingBottom: `calc(${1 / ratio} * 100%)` }}
      {...rest}
    >
      <div className={`${prefixCls}-content`}>{children}</div>
    </div>
  )
}
AspectRatio.displayName = 'AspectRatio'
