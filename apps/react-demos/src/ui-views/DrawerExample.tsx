import { useState } from 'react'
import { Button, Divider, Drawer, Tabs } from '@youknown/react-ui/src'

export default () => {
	const [placement, setPlacement] = useState<'left' | 'top' | 'right' | 'bottom'>('left')
	const [open, setOpen] = useState(false)
	const [open1, setOpen1] = useState(false)
	return (
		<div className="p-24px">
			<h1>Drawer</h1>
			<Divider />
			<Tabs
				type="segment"
				value={placement}
				onChange={value => {
					setPlacement(value as typeof placement)
				}}
				tabList={[
					{ key: 'left', name: 'Left' },
					{ key: 'top', name: 'Top' },
					{ key: 'right', name: 'Right' },
					{ key: 'bottom', name: 'Bottom' }
				]}
			/>
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
