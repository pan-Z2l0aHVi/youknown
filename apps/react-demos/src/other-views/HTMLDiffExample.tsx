import './html-diff.scss'

import diff from 'html-diff-ts'
import { useMemo, useState } from 'react'

import { Divider, Input, Space } from '@youknown/react-ui/src'
import { storage } from '@youknown/utils/src'

export default () => {
	const [preVal, setPreVal] = useState(storage.session.get('pre-html') ?? '')
	const [nextVal, setNextVal] = useState(storage.session.get('next-html') ?? '')
	const diffVal = useMemo(() => diff(preVal, nextVal), [nextVal, preVal])
	return (
		<>
			<Space className="grid grid-cols-2">
				<Input.Textarea
					className="w-100%! h-320px"
					placeholder="previous html"
					value={preVal}
					onChange={val => {
						storage.session.set('pre-html', val)
						setPreVal(val)
					}}
				/>
				<Input.Textarea
					className="w-100%! h-320px"
					placeholder="next html"
					value={nextVal}
					onChange={val => {
						storage.session.set('next-html', val)
						setNextVal(val)
					}}
				/>
			</Space>
			<Divider />
			<div
				dangerouslySetInnerHTML={{
					__html: diffVal
				}}
			></div>
		</>
	)
}
