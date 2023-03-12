import React, { useState } from 'react'
import { Button, Divider, Drawer, Radio } from '@youknown/react-ui/src'

export default () => {
	const [placement, setPlacement] = useState<'left' | 'top' | 'right' | 'bottom'>('left')
	const [open, setOpen] = useState(false)
	const [open1, setOpen1] = useState(false)
	return (
		<div style={{ padding: 24 }}>
			<h1>Drawer</h1>
			<Radio.Group
				type="tab"
				value={placement}
				onChange={value => {
					setPlacement(value as any)
				}}
			>
				<Radio label="left">Left</Radio>
				<Radio label="top">Top</Radio>
				<Radio label="right">Right</Radio>
				<Radio label="bottom">Bottom</Radio>
			</Radio.Group>
			<Divider />
			<Button onClick={() => setOpen(true)}>Show drawer</Button>
			<Drawer open={open} placement={placement} onCancel={() => setOpen(false)}>
				<h1>Title</h1>
			</Drawer>
			<Divider />
			<Button onClick={() => setOpen1(true)}>Closable</Button>
			<Drawer closable maskClosable={false} width={300} open={open1} onCancel={() => setOpen1(false)}>
				<h1>Title</h1>
			</Drawer>
		</div>
	)
}
