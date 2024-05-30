import { memo } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import type { ListChildComponentProps } from 'react-window'
import { FixedSizeList } from 'react-window'

import { useUIStore } from '@/stores'
import type { RecordValue } from '@/utils/idb'

import RecordItem from './record-item'

interface RecordListProps {
  list: RecordValue[]
}
function RecordList(props: RecordListProps) {
  const { list } = props
  const banner_visible = useUIStore(state => state.banner_visible)
  const BANNER_HEIGHT = 40
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
            height={banner_visible ? height - BANNER_HEIGHT : height}
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
