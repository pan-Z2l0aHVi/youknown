import { useEffect, useRef, useState } from 'react'

import { Divider, Radio, Space } from '@youknown/react-ui/src'

export default () => {
	const [val, setVal] = useState(false)
	const defaultGroupVal = 2
	const [groupVal, setGroupVal] = useState<string | number>(defaultGroupVal)
	const radioRef = useRef<HTMLInputElement>(null)
	const defaultHorizontalVal = 1
	const [horizontalVal, setHorizontalVal] = useState<string | number>(defaultHorizontalVal)
	const defaultVerticalVal = 0
	const [verticalVal, setVerticalVal] = useState<string | number>(defaultVerticalVal)
	const defaultDisabledVal = 2
	const [disabledGroupVal, setDisabledGroupVal] = useState<string | number>(defaultDisabledVal)
	const defaultJsxGroupVal = 2
	const [jsxGroupVal, setJsxGroupVal] = useState<string | number>(defaultJsxGroupVal)
	useEffect(() => {
		setTimeout(() => {
			console.log('radioRef.current.checked', radioRef.current?.checked)
		}, 1000)
	}, [])
	return (
		<div className="p-24px">
			<h1>Radio</h1>
			<Divider />
			<Space>
				<Radio defaultValue={true}>Basic</Radio>
				<Radio
					value={val}
					onChange={value => {
						if (typeof value === 'boolean') {
							setVal(value)
						}
					}}
				>
					Controlled
				</Radio>
			</Space>
			<Divider />
			<Space>
				<Radio size="small" defaultValue={true}>
					Small
				</Radio>
				<Radio size="medium" defaultValue={true}>
					Medium
				</Radio>
				<Radio size="large" defaultValue={true}>
					Large
				</Radio>
			</Space>
			<Divider />
			<Radio.Group
				options={[
					{
						label: 0,
						child: 'Cherry'
					},
					{
						label: 1,
						child: 'Apple'
					},
					{
						label: 2,
						child: 'Pear'
					},
					{
						label: 3,
						child: 'Orange',
						disabled: true
					}
				]}
				value={groupVal}
				onChange={value => {
					setGroupVal(value)
				}}
			/>
			<Divider />
			<Space direction="vertical">
				<Radio.Group
					direction="horizontal"
					options={[
						{ label: 0, child: 'Horizontal A' },
						{ label: 1, child: 'Horizontal B' },
						{ label: 2, child: 'Horizontal C' }
					]}
					value={horizontalVal}
					onChange={value => {
						setHorizontalVal(value)
					}}
				/>
				<Radio.Group
					direction="vertical"
					options={[
						{ label: 0, child: 'Vertical A' },
						{ label: 1, child: 'Vertical B' },
						{ label: 2, child: 'Vertical C' }
					]}
					value={verticalVal}
					onChange={value => {
						setVerticalVal(value)
					}}
				/>
			</Space>
			<Divider />
			<Radio ref={radioRef} defaultValue={true}>
				Forward ref
			</Radio>
			<Divider />
			<Space direction="vertical">
				<Radio disabled defaultValue={true}>
					Disabled
				</Radio>
				<Radio.Group
					disabled
					options={[
						{ label: 0, child: 'A' },
						{ label: 1, child: 'B' },
						{ label: 2, child: 'C' }
					]}
					value={disabledGroupVal}
					onChange={value => {
						setDisabledGroupVal(value)
					}}
				/>
			</Space>
			<Divider />
			<Radio.Group
				direction="horizontal"
				options={[
					{ label: 0, child: 'Options A' },
					{ label: 1, child: 'Options B' },
					{ label: 2, child: 'Options C' }
				]}
				value={jsxGroupVal}
				onChange={value => {
					setJsxGroupVal(value)
				}}
			>
				<Radio label={3}>JSX A</Radio>
				<Radio label={4}>JSX B</Radio>
				<Radio label={5}>JSX c</Radio>
			</Radio.Group>
		</div>
	)
}
