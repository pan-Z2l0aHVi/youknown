import { useState } from 'react'
import { Avatar, Divider, List, Tabs } from '@youknown/react-ui/src'

export default () => {
	const [size, setSize] = useState<'small' | 'medium' | 'large'>('small')
	return (
		<div className="p-24px">
			<h1>List</h1>
			<Divider />
			<List>
				<List.Item>List item 1</List.Item>
				<List.Item>List item 2</List.Item>
				<List.Item>List item 2</List.Item>
			</List>
			<Divider />
			<Tabs
				className="mb-8px"
				type="segment"
				value={size}
				onChange={value => {
					setSize(value as typeof size)
				}}
				tabList={[
					{ key: 'small', name: 'Small' },
					{ key: 'medium', name: 'Medium' },
					{ key: 'large', name: 'Large' }
				]}
			/>
			<List size={size}>
				<List.Item>List item 1</List.Item>
				<List.Item>List item 2</List.Item>
				<List.Item>List item 2</List.Item>
			</List>
			<Divider />
			<List bordered={false}>
				<List.Item>Rimless list item 1</List.Item>
				<List.Item>Rimless list item 2</List.Item>
				<List.Item>Rimless list item 2</List.Item>
			</List>
			<Divider />
			<List>
				<List.Item prefix={<Avatar />}>Prefix list item 1</List.Item>
				<List.Item prefix={<Avatar />}>Prefix list item 2</List.Item>
				<List.Item prefix={<Avatar />}>Prefix list item 2</List.Item>
			</List>
			<Divider />
			<List>
				<List.Item suffix={<Avatar />}>Suffix list item 1</List.Item>
				<List.Item suffix={<Avatar />}>Suffix list item 2</List.Item>
				<List.Item suffix={<Avatar />}>Suffix list item 2</List.Item>
			</List>
		</div>
	)
}
