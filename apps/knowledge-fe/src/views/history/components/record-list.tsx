import { memo } from 'react'

import { RecordValue } from '@/utils/idb'

import RecordItem from './record-item'

interface RecordListProps {
	list: RecordValue[]
}
function RecordList(props: RecordListProps) {
	const { list } = props
	return (
		<div className="flex-1 max-w-960px">
			{list.map(record => (
				<RecordItem key={record.id} record={record} />
			))}
		</div>
	)
}

export default memo(RecordList)
