import './avatar-group.scss'

import { cls } from '@youknown/utils/src'
import type { HTMLAttributes, ReactNode } from 'react'

import { UI_PREFIX } from '../../constants'
import { AvatarCtx } from './avatarCtx'

interface AvatarOption {
  name: string | number
}
export interface AvatarGroupProps<T> extends HTMLAttributes<HTMLElement> {
  size?: 'small' | 'medium' | 'large' | number
  round?: boolean
  bordered?: boolean
  max?: number
  offset?: number
  items?: T[]
  renderAvatar?: (item: T) => ReactNode
  renderRest?: (items: T[]) => ReactNode
}

export const AvatarGroup = <T extends AvatarOption>(props: AvatarGroupProps<T>) => {
  const {
    className,
    size,
    round = true,
    bordered = false,
    max = Infinity,
    offset = 12,
    items = [],
    renderAvatar,
    renderRest,
    style,
    ...rest
  } = props
  const avatarItems = max === Infinity ? items : items.slice(0, max)
  const resetItems = max === Infinity ? [] : items.slice(max)

  const prefixCls = `${UI_PREFIX}-avatar-group`
  return (
    <AvatarCtx.Provider value={{ size, round, bordered }}>
      <div className={cls(className, prefixCls)} style={{ ...style, paddingLeft: offset }} {...rest}>
        {avatarItems.map(item => (
          <div key={item.name} style={{ marginLeft: -offset }}>
            {renderAvatar?.(item)}
          </div>
        ))}
        {resetItems.length > 0 && <div style={{ marginLeft: -offset }}>{renderRest?.(resetItems)}</div>}
      </div>
    </AvatarCtx.Provider>
  )
}
AvatarGroup.displayName = 'AvatarGroup'
