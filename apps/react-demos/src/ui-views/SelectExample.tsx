import { useState } from 'react'

import { Divider, Select, Space } from '@youknown/react-ui/src'

export default () => {
	const [selection, setSelection] = useState<any>(0)
	const [multipleSelection, setMultipleSelection] = useState<any>([0])
	return (
		<div className="p-24px">
			<h1>Select</h1>
			<Divider />
			<Select
				className="w-140px"
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
				className="w-280px"
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
					className="w-140px"
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
					className="w-280px"
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
				className="w-140px"
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
					className="w-160px"
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
					className="w-320px"
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
