import type { ComponentType } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
// FIXME: https://github.com/bvaughn/react-window/issues/654
import type { FixedSizeListProps, ListChildComponentProps } from 'react-window'
import { FixedSizeList as _FixedSizeList } from 'react-window'

const FixedSizeList = _FixedSizeList as unknown as ComponentType<FixedSizeListProps>

export default () => {
  const data = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`)

  const renderRow = ({ index, style }: ListChildComponentProps) => {
    const row = data[index]
    return (
      <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
        {row}
      </div>
    )
  }

  return (
    <div className="h-600px">
      <AutoSizer>
        {({ height, width }) => {
          return (
            <FixedSizeList width={width} height={height} itemCount={data.length} itemSize={35}>
              {renderRow}
            </FixedSizeList>
          )
        }}
      </AutoSizer>
    </div>
  )
}
