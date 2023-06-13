import { useState } from 'react'
import { Select, Divider, Space } from '@youknown/react-ui/src'

export default () => {
	const [selection, setSelection] = useState<any>(0)
	const [multipleSelection, setMultipleSelection] = useState<any>([0])
	return (
		<div style={{ padding: 24 }}>
			<h1>Select</h1>
			<Divider />
			<Select
				style={{ width: 140 }}
				defaultValue={1}
				options={[
					{
						value: 0,
						label: 'Apple'
					},
					{
						value: 1,
						label: 'Watermelon'
					},
					{
						value: 2,
						label: 'Banana',
						disabled: true
					},
					{
						value: 3,
						label: 'Cherry'
					}
				]}
			></Select>
			<Divider />
			<Select
				multiple
				style={{ width: 280 }}
				defaultValue={[2]}
				options={[
					{
						value: 0,
						label: 'Apple'
					},
					{
						value: 1,
						label: 'Watermelon'
					},
					{
						value: 2,
						label: 'Banana'
					}
				]}
			></Select>
			<Divider />
			<Space>
				<Select
					style={{ width: 140 }}
					value={selection}
					onChange={val => {
						setSelection(val)
					}}
					options={[
						{
							value: 0,
							label: 'Apple'
						},
						{
							value: 1,
							label: 'Watermelon'
						},
						{
							value: 2,
							label: 'Banana'
						}
					]}
				></Select>
				<Select
					multiple
					style={{ width: 280 }}
					value={multipleSelection}
					onChange={val => {
						setMultipleSelection(val)
					}}
					options={[
						{
							value: 0,
							label: 'Apple'
						},
						{
							value: 1,
							label: 'Watermelon'
						},
						{
							value: 2,
							label: 'Banana'
						}
					]}
				></Select>
			</Space>
			<Divider />
			<Select
				disabled
				style={{ width: 140 }}
				defaultValue={1}
				options={[
					{
						value: 0,
						label: 'Apple'
					},
					{
						value: 1,
						label: 'Watermelon'
					},
					{
						value: 2,
						label: 'Banana'
					}
				]}
			></Select>
			<Divider />
			<Space>
				<Select
					filter
					allowClear
					style={{ width: 160 }}
					defaultValue={1}
					options={[
						{
							value: 0,
							label: 'Apple'
						},
						{
							value: 1,
							label: 'Watermelon'
						},
						{
							value: 2,
							label: 'Banana'
						}
					]}
				></Select>
				<Select
					filter
					multiple
					style={{ width: 320 }}
					defaultValue={[0]}
					options={[
						{
							value: 0,
							label: 'Apple'
						},
						{
							value: 1,
							label: 'Watermelon'
						},
						{
							value: 2,
							label: 'Banana'
						}
					]}
				></Select>
			</Space>
		</div>
	)
}
