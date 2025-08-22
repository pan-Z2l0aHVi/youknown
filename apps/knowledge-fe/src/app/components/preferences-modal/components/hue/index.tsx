import { Space } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

export const hue_options = ['#007aff', '#af52de', '#e55b9d', '#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#8e8e93']

interface HueProps {
  value?: string
  onChange?: (value: string) => void
}
export default function Hue(props: HueProps) {
  const { value, onChange } = props
  if (value == null) return null

  return (
    <Space className="flex-wrap!">
      {hue_options.map(color => {
        const handleSelect = () => {
          onChange?.(color)
        }
        return (
          <div
            key={color}
            className={cls(
              'relative w-24px h-24px rd-full b-1 b-solid b-[rgb(0,0,0,0.1)] cursor-pointer',
              'mb-4px mt-4px',
              'before:absolute before:top-6px before:left-6px before:w-10px before:h-10px before:rd-full before:content-empty',
              value === color && 'before:bg-#fff before:shadow-shadow-s'
            )}
            style={{ backgroundColor: color }}
            onClick={handleSelect}
          ></div>
        )
      })}
    </Space>
  )
}
