import { Space } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { useTranslation } from 'react-i18next'

const enum RADIUS_ID {
  RIGHT_ANGLE = 1,
  CORNERS = 2,
  LARGE_CORNERS = 3
}
export interface RadiusStyleItem {
  id: RADIUS_ID
  radius: [number, number, number]
}

export const style_options: RadiusStyleItem[] = [
  {
    id: RADIUS_ID.RIGHT_ANGLE,
    radius: [0, 0, 0]
  },
  {
    id: RADIUS_ID.CORNERS,
    radius: [2, 4, 6]
  },
  {
    id: RADIUS_ID.LARGE_CORNERS,
    radius: [4, 8, 12]
  }
]

interface RadiusStyleProps {
  value?: RadiusStyleItem
  onChange?: (value: RadiusStyleItem) => void
}
export default function RadiusStyle(props: RadiusStyleProps) {
  const { value, onChange } = props
  const { t } = useTranslation()
  if (value == null) return null

  const format_desc = (id: RADIUS_ID) => {
    return {
      [RADIUS_ID.RIGHT_ANGLE]: t('setting.right_angle'),
      [RADIUS_ID.CORNERS]: t('setting.corners'),
      [RADIUS_ID.LARGE_CORNERS]: t('setting.large_corners')
    }[id]
  }
  return (
    <Space>
      {style_options.map(style => {
        const handleSelect = () => {
          onChange?.(style)
        }
        return (
          <div key={style.id} className="select-none cursor-pointer" onClick={handleSelect}>
            <div
              className={cls(
                'relative w-64px h-64px rd-radius-m overflow-hidden bg-bg-3',
                'before:absolute before:right--42% before:bottom--36% before:w-100% before:h-100% before:content-empty',
                'before:b-t-1 before:b-l-1 before:b-divider before:b-solid before:shadow-shadow-m before:bg-bg-1',
                style.id === 1 && 'before:rd-3px',
                style.id === 2 && 'before:rd-6px',
                style.id === 3 && 'before:rd-9px',
                value.id === style.id
                  ? 'b-1 b-solid b-primary shadow-[0_0_0_1px_var(--ui-color-primary)]'
                  : 'b-1 b-solid b-divider'
              )}
            ></div>
            <div className="color-text-2 mt-4px text-center max-w-64px">{format_desc(style.id)}</div>
          </div>
        )
      })}
    </Space>
  )
}
