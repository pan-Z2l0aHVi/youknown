import React, { useState } from 'react'
import { Avatar, Divider, List, Radio } from '@youknown/react-ui/src'

export default () => {
	const [size, setSize] = useState<'small' | 'medium' | 'large'>('small')
	return (
		<div style={{ padding: 24 }}>
			<h1>List</h1>
			<List>
				<List.Item>List item 1</List.Item>
				<List.Item>List item 2</List.Item>
				<List.Item>List item 2</List.Item>
			</List>
			<Divider />
			<Radio.Group
				style={{ marginBottom: 8 }}
				type="tab"
				value={size}
				onChange={value => {
					setSize(value as any)
				}}
			>
				<Radio label="small">Small</Radio>
				<Radio label="medium">Medium</Radio>
				<Radio label="large">Large</Radio>
			</Radio.Group>
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
