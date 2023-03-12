import { Button, Divider, Input, Space } from '@youknown/react-ui/src'
import React, { useRef, useState } from 'react'
import { TbEyeOff, TbSearch } from 'react-icons/tb'

export default () => {
	const [inputVal, setInputVal] = useState('controlled input')
	const [textareaVal, setTextareaVal] = useState('controlled textarea')
	const inputRef = useRef<HTMLInputElement>(null)
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	return (
		<div style={{ padding: 24 }}>
			<h1>Input</h1>
			<Space>
				<Input defaultValue="hi" placeholder="Basic" />
				<Input
					placeholder="Controlled"
					value={inputVal}
					onChange={value => {
						if (typeof value === 'string') setInputVal(value)
					}}
				/>
			</Space>
			<Divider />
			<Space>
				<Input size="small" placeholder="Small" />
				<Input size="medium" placeholder="Medium" />
				<Input size="large" placeholder="Large" />
			</Space>
			<Divider />
			<Space>
				<Input placeholder="Prefix" prefix={<TbSearch style={{ margin: '0 4px' }} />} />
				<Input placeholder="Suffix" suffix={<TbEyeOff style={{ margin: '0 4px' }} />} />
			</Space>
			<Divider />
			<Space>
				<Input placeholder="Allow clear" allowClear defaultValue="allow clear" />
			</Space>
			<Divider />
			<Space direction="vertical">
				<Input placeholder="Round" round />
				<Input
					placeholder="Round with prefix and suffix"
					round
					prefix={<TbSearch style={{ margin: '0 4px' }} />}
					suffix={<TbEyeOff style={{ margin: '0 4px' }} />}
				/>
			</Space>
			<Divider />
			<Space>
				<Input placeholder="Enabled" />
				<Input placeholder="Disabled" disabled />
			</Space>
			<Divider />
			<Space>
				<Input placeholder="Forward ref" ref={inputRef} />
				<Button
					primary
					onClick={() => {
						inputRef.current?.focus()
					}}
				>
					Focus
				</Button>
				<Button
					primary
					onClick={() => {
						inputRef.current?.blur()
					}}
				>
					Blur
				</Button>
			</Space>
			<Divider />
			<Input.Textarea defaultValue="hi" placeholder="Basic textarea" />
			<Divider />
			<Input.Textarea
				placeholder="Controlled textarea"
				value={textareaVal}
				onChange={value => {
					if (typeof value === 'string') setTextareaVal(value)
				}}
			/>
			<Divider />
			<Input.Textarea autosize placeholder="Autosize textarea" />
			<Divider />
			<Space>
				<Input.Textarea disabled placeholder="Disabled textarea" />
				<Input.Textarea disabled autosize placeholder="Disabled autosize textarea" />
			</Space>
			<Divider />
			<Space>
				<Input.Textarea ref={textareaRef} placeholder="Ref textarea" />
				<Button
					primary
					onClick={() => {
						textareaRef.current?.focus()
					}}
				>
					Focus
				</Button>
				<Button
					primary
					onClick={() => {
						textareaRef.current?.blur()
					}}
				>
					Blur
				</Button>
			</Space>
			<Divider />
			<Input bordered={false} placeholder="Border less" />
		</div>
	)
}
