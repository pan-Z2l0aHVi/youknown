import type { ComponentType } from 'react'
import { memo } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
// FIXME: https://github.com/bvaughn/react-window/issues/654
import type { FixedSizeListProps, ListChildComponentProps } from 'react-window'
import { FixedSizeList as _FixedSizeList } from 'react-window'

const FixedSizeList = _FixedSizeList as unknown as ComponentType<FixedSizeListProps>

import type { RecordValue } from '@/utils/idb'

import RecordItem from './record-item'

interface RecordListProps {
  list: RecordValue[]
}
function RecordList(props: RecordListProps) {
  const { list } = props
  const RECORD_ITEM_HEIGHT = 80

  const renderRow = ({ index, style }: ListChildComponentProps) => {
    const record = list[index]
    return (
      <div className="sm:p-[0_32px] sm:flex sm:justify-center" style={style}>
        <RecordItem record={record} />
      </div>
    )
  }

  return (
    <AutoSizer>
      {({ width, height }) => {
        return (
          <FixedSizeList
            style={{ paddingBottom: 40 }}
            width={width}
            height={height}
            itemCount={list.length}
            itemSize={RECORD_ITEM_HEIGHT}
          >
            {renderRow}
          </FixedSizeList>
        )
      }}
    </AutoSizer>
  )
}

export default memo(RecordList)
