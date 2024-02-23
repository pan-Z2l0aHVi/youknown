import { memo } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList, ListChildComponentProps } from 'react-window'

import { RecordValue } from '@/utils/idb'

import RecordItem from './record-item'

interface RecordListProps {
	list: RecordValue[]
}
function RecordList(props: RecordListProps) {
	const { list } = props

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
					<FixedSizeList width={width} height={height} itemCount={list.length} itemSize={80}>
						{renderRow}
					</FixedSizeList>
				)
			}}
		</AutoSizer>
	)
}

export default memo(RecordList)
