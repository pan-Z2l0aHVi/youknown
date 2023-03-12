import React, { useEffect, useRef, useState } from 'react'
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
	const defaultJsxTabGroupVal = 1
	const [jsxTabGroupVal, setJsxTabGroupVal] = useState<string | number>(defaultJsxTabGroupVal)
	const defaultOptionsTabGroupVal = 0
	const [optionsTabGroupVal, setOptionsTabGroupVal] = useState<string | number>(defaultOptionsTabGroupVal)
	useEffect(() => {
		setTimeout(() => {
			console.log('radioRef.current.checked', radioRef.current?.checked)
		}, 1000)
	}, [])
	return (
		<div style={{ padding: 24 }}>
			<h1>Radio</h1>
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
						{ label: 0, child: 'Horizontal a' },
						{ label: 1, child: 'Horizontal b' },
						{ label: 2, child: 'Horizontal c' }
					]}
					value={horizontalVal}
					onChange={value => {
						setHorizontalVal(value)
					}}
				/>
				<Radio.Group
					direction="vertical"
					options={[
						{ label: 0, child: 'Vertical a' },
						{ label: 1, child: 'Vertical b' },
						{ label: 2, child: 'Vertical c' }
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
					{ label: 0, child: 'Options a' },
					{ label: 1, child: 'Options b' },
					{ label: 2, child: 'Options c' }
				]}
				value={jsxGroupVal}
				onChange={value => {
					setJsxGroupVal(value)
				}}
			>
				<Radio label={3}>JSX a</Radio>
				<Radio label={4}>JSX b</Radio>
				<Radio label={5}>JSX c</Radio>
			</Radio.Group>
			<Divider />
			<Radio.Group
				type="tab"
				value={jsxTabGroupVal}
				onChange={value => {
					setJsxTabGroupVal(value)
				}}
			>
				<Radio label={0}>JSX tab a</Radio>
				<Radio label={1}>JSX tab b</Radio>
				<Radio label={2}>JSX tab c</Radio>
			</Radio.Group>
			<Divider />
			<Radio.Group
				type="tab"
				options={[
					{ label: 0, child: 'Options tab a' },
					{ label: 1, child: 'Options tab b' },
					{ label: 2, child: 'Options tab c' }
				]}
				value={optionsTabGroupVal}
				onChange={value => {
					setOptionsTabGroupVal(value)
				}}
			/>
			<Divider />
			<Radio.Group type="tab" disabled defaultValue={1}>
				<Radio label={0}>Disabled tab a</Radio>
				<Radio label={1}>Disabled tab b</Radio>
				<Radio label={2}>Disabled tab c</Radio>
			</Radio.Group>
		</div>
	)
}
